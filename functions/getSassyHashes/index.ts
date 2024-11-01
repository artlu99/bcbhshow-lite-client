import { Env } from '../common';

interface SassyHash {
  castHash: string;
  text: string;
  decryptedText?: string;
  isDecrypted?: boolean;
}
interface SassyHashResponse {
  data: { [label: string]: SassyHash };
}
interface SassyHashRequest {
  fid: number;
  hashes: string[];
}

const fetchSassyHashExpensiveApi = async (hashes: string[], endpoint_base: string) => {
  const endpoint = `${endpoint_base}?hashes=` + hashes.join(',');

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  const sassyHashResponse = (await res.json()) as SassyHashResponse;

  return sassyHashResponse;
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const js = (await request.json()) as SassyHashRequest;
  const { hashes } = js;

  const sassyHashResponses = await fetchSassyHashExpensiveApi(hashes, 'https://whistles.artlu.xyz/graphql');

  return new Response(JSON.stringify(sassyHashResponses));
};
