import { Env } from '../common';
import { CastObject } from '../shared/feed-types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { hash: `0x${string}` };
  const { hash } = js;

  const neynarApiKey = context.env.NEYNAR_API_KEY;

  const endpoint = `https://api.neynar.com/v2/farcaster/cast?identifier=${hash}&type=hash`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: { accept: 'application/json', 'x-api_key': neynarApiKey },
  });
  if (!res.ok) {
    console.error(endpoint, res.status, JSON.stringify(res));
    throw new Error('Failed to fetch data');
  }

  const castData = (await res.json()) as { cast: CastObject };
  return new Response(JSON.stringify(castData));
};
