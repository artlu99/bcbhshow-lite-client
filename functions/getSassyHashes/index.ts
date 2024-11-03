import { PrivyClient } from '@privy-io/server-auth';
import { Client, fetchExchange, gql } from '@urql/core';
import { parse } from 'cookie';

import { Env } from '../common';

interface SassyHash {
  castHash: string;
  text: string;
  decodedText: string | null;
  isDecrypted: boolean;
}
interface SassyHashGraphQLResponse {
  getTextByCastHash: SassyHash;
}
interface SassyHashRequest {
  privyAuthToken: string;
  castHash: string;
}

const getFid = async (context, privyAuthToken: string): Promise<number> => {
  const { env, request } = context;
  const privy = new PrivyClient(env.REACT_APP_PRIVY_APP_ID, env.PRIVY_APP_SECRET);

  const cookie = parse(request.headers.get('Cookie') || '');
  const idToken = cookie['privy-id-token'] != null ? cookie['privy-id-token'] : undefined;

  const user = await privy.getUser({ idToken });
  console.log('privyIdToken:', idToken);
  console.log('user:', user);

  try {
    const verifiedClaims = await privy.verifyAuthToken(privyAuthToken);
    const user = await privy.getUser(verifiedClaims.userId);

    // const user2 = await privy.getUser({ idToken: IDTokenFromCookies(request) });
    return user?.farcaster?.fid;
  } catch (error) {
    console.error(`Token verification failed with error ${error}.`);
    throw new Error('Failed to fetch Farcaster FID');
  }
};

const fetchSassyHashExpensiveApi = async (viewerFid: number, castHash: string, env: Env) => {
  const client = new Client({
    url: env.SASSYHASH_API,
    exchanges: [fetchExchange],
    fetchOptions: { headers: { authorization: `Bearer ${env.WHISTLES_BEARER_TOKEN}` } },
  });

  try {
    const res = await client.query<SassyHashGraphQLResponse>(
      gql`
        query getTextByCastHash($castHash: String!, $viewerFid: Int!) {
          getTextByCastHash(castHash: $castHash, viewerFid: $viewerFid) {
            castHash
            decodedText
            isDecrypted
            text
          }
        }
      `,
      { castHash, viewerFid },
    );
    return { data: res.data.getTextByCastHash };
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch Whistles data');
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const js = (await request.json()) as SassyHashRequest;
  const { privyAuthToken, castHash } = js;

  const fid = await getFid(context, privyAuthToken);
  if (!fid) return new Response(JSON.stringify({ error: 'Failed to fetch Farcaster FID' }), { status: 500 });

  const sassyHashResponses = await fetchSassyHashExpensiveApi(fid, castHash, env);
  return new Response(JSON.stringify(sassyHashResponses));
};
