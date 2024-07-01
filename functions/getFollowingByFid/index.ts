import { Env } from '../common';
import { FollowingByFidResponseSchema } from '../shared/farquest-types';
import sendPosthogEvent from '../shared/posthog';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { fid: number; limit: number; cursor?: string };
  const { fid, limit, cursor } = js;

  const farquestApiKey = context.env.FARQUEST_API_KEY;

  const paginationParam = cursor ? `&cursor=${cursor}` : '';
  const endpoint = `https://build.far.quest/farcaster/v2/following?fid=${fid}&limit=${limit}${paginationParam}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'API-KEY': `${farquestApiKey}`,
      accept: 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  await sendPosthogEvent(context.env, 'getFollowingByFid', 'not tracking by fid');

  const followingResponse = (await res.json()) as FollowingByFidResponseSchema;
  return new Response(JSON.stringify(followingResponse));
};
