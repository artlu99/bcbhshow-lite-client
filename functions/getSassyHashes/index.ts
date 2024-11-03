import { PrivyClient } from '@privy-io/server-auth';
import { Client, fetchExchange, gql } from '@urql/core';

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

const getPrivyIdToken = async (cookies: string | undefined) => {
  if (!cookies) return null;
  const privyIdToken = cookies.match(/privy_id_token=(?<privyIdToken>.*)/)?.groups?.privyIdToken;
  if (!privyIdToken) return null;
  return privyIdToken;
};

const getFid = async (privyAuthToken: string, context): Promise<number> => {
  const { env, request } = context;
  const privy = new PrivyClient(env.REACT_APP_PRIVY_APP_ID, env.PRIVY_APP_SECRET);

  const cookies = request.headers.get('cookie');

  const privyIdToken = await getPrivyIdToken(cookies);
  console.log('privyIdToken:', privyIdToken);

  const user = await privy.getUser({ idToken: privyIdToken });
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

  const fid = await getFid(privyAuthToken, context);
  if (!fid) return new Response(JSON.stringify({ error: 'Failed to fetch Farcaster FID' }), { status: 500 });

  const sassyHashResponses = await fetchSassyHashExpensiveApi(fid, castHash, env);
  return new Response(JSON.stringify(sassyHashResponses));
};
