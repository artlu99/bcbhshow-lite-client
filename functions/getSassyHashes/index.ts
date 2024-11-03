import { PrivyClient } from '@privy-io/server-auth';
import { Client, fetchExchange, gql } from '@urql/core';
import { importSPKI, jwtVerify } from 'jose';

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

const getFid = async (privyAuthToken: string, env: Env): Promise<number> => {
  const privy = new PrivyClient(env.REACT_APP_PRIVY_APP_ID, env.PRIVY_APP_SECRET);

  try {
    // one-time bootstrap to see if we can extract the FID from the token
    const privyVerificationKey = await privy.getVerificationKey();
    const verificationKey = await importSPKI(privyVerificationKey, 'ES256');
    console.log('privyVerificationKey:', privyVerificationKey);
    console.log('verificationKey:', verificationKey);

    try {
      const payload = await jwtVerify(privyAuthToken, verificationKey, {
        issuer: 'privy.io',
        audience: env.REACT_APP_PRIVY_APP_ID || 'insert-your-privy-app-id',
      });
      console.log(payload);
    } catch (error) {
      console.error(error);
    }

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
  console.log('js:', js);

  const fid = await getFid(privyAuthToken, env);
  if (!fid) return new Response(JSON.stringify({ error: 'Failed to fetch Farcaster FID' }), { status: 500 });

  const sassyHashResponses = await fetchSassyHashExpensiveApi(fid, castHash, env);
  return new Response(JSON.stringify(sassyHashResponses));
};
