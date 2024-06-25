import { Env } from '../common';
import { ReactionsByHashResponseSchema } from '../shared/farquest-types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { hash: string; type: 'likes' | 'recasters'; limit: number; cursor?: string };
  const { hash, type, limit, cursor } = js;

  if (type !== 'likes' && type !== 'recasters') throw new Error('Invalid type');

  const farquestApiKey = context.env.FARQUEST_API_KEY;

  const paginationParam = cursor ? `&cursor=${cursor}` : '';
  const endpoint = `https://build.far.quest/farcaster/v2/cast-${type}?castHash=${hash}&limit=${limit}${paginationParam}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'API-KEY': `${farquestApiKey}`,
      accept: 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  const reactionsResponse = (await res.json()) as ReactionsByHashResponseSchema;
  return new Response(JSON.stringify(reactionsResponse));
};
