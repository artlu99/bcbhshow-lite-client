import { Env } from '../common';
import { CastObject } from '../shared/feed-types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { hash: `0x${string}` };
  const { hash } = js;

  const pinataJwt = context.env.PINATA_JWT;

  const endpoint = `https://api.pinata.cloud/v3/farcaster/casts/${hash}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: { Authorization: `Bearer ${pinataJwt}` },
  });
  if (!res.ok) {
    console.error(endpoint, res.status, JSON.stringify(res));
    throw new Error('Failed to fetch data');
  }

  const castData = (await res.json()) as { cast: CastObject };
  return new Response(JSON.stringify(castData));
};
