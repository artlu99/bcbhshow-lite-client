import { Env } from '../common';
import { FeedObject } from '../shared/feed-types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { fid: number; limit: number; cursor?: string };
  const { fid, limit, cursor } = js;

  const neynarApiKey = context.env.NEYNAR_API_KEY;
  const provider = 'karma';

  const paginationParam = cursor ? `&cursor=${cursor}` : '';
  const endpoint = `https://api.neynar.com/v2/farcaster/feed/for_you?fid=${fid}&viewer_fid=${fid}&provider=${provider}&limit=${limit}${paginationParam}`;

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      api_key: `${neynarApiKey}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch data');

  const forYouFeedResponse = (await res.json()) as FeedObject;
  return new Response(JSON.stringify(forYouFeedResponse));
};
