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
  fid: string;
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
  const { fid, castHash } = js;

  const sassyHashResponses = await fetchSassyHashExpensiveApi(parseInt(fid), castHash, env);

  return new Response(JSON.stringify(sassyHashResponses));
};
