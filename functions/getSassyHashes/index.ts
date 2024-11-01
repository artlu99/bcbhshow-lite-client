import { GraphQLClient, gql } from 'graphql-request';
import { Env } from '../common';

interface SassyHash {
  castHash: string;
  text: string;
  decodedText: string | null;
  isDecrypted: boolean;
}
interface SassyHashGraphQLResponse {
  data: { getTextByCastHash: SassyHash };
}
interface SassyHashRequest {
  fid: number;
  castHash: string;
}

const fetchSassyHashExpensiveApi = async (fid: number, castHash: string, env: Env) => {
  const graphQLClient = new GraphQLClient(env.SASSYHASH_API, {
    headers: { authorization: `Bearer ${env.WHISTLES_BEARER_TOKEN}` },
  });

  try {
    const res = await graphQLClient.request<SassyHashGraphQLResponse>(
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
      { castHash, viewerFid: fid },
    );
    console.log('graphQLClient:', res);
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

  const sassyHashResponses = await fetchSassyHashExpensiveApi(fid, castHash, env);

  return new Response(JSON.stringify(sassyHashResponses));
};
