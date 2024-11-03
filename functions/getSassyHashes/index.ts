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
  castHash: string;
}

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
  const { castHash } = js;

  try {
    const privy = new PrivyClient(env.REACT_APP_PRIVY_APP_ID, env.PRIVY_APP_SECRET);

    const cookie = parse(request.headers.get('Cookie') || '');
    const idToken = cookie['privy-id-token'] != null ? cookie['privy-id-token'] : undefined;

    const user = await privy.getUser({ idToken });

    const fid = user?.farcaster?.fid;
    if (fid) {
      const sassyHashResponses = await fetchSassyHashExpensiveApi(fid, castHash, env);
      return new Response(JSON.stringify(sassyHashResponses));
    } else {
      console.log('Error 500: User:', JSON.stringify(user));
      return new Response(JSON.stringify({ error: 'Failed to fetch Farcaster FID' }), { status: 500 });
    }
  } catch (error) {
    console.error(`Token verification failed with error ${error}.`);
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
};
