import { Env } from '../common';
import { FeedObject } from '../shared/feed-types';
import { sendPosthogFid } from '../shared/posthog';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { fid: number; pageSize: number; pageToken?: string };
  const { fid, pageSize, pageToken } = js;

  const neynarApiKey = context.env.NEYNAR_API_KEY;

  const paginationParam = pageToken ? `&cursor=${pageToken}` : '';
  const endpoint = `https://api.neynar.com/v2/farcaster/feed/following?with_recasts=true&fid=${fid}&viewer_fid=${fid}&limit=${pageSize}${paginationParam}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      api_key: `${neynarApiKey}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  await sendPosthogFid(context.env, 'getCastsByFollowing', fid);

  const followingCronFeedResponse = (await res.json()) as FeedObject;
  return new Response(JSON.stringify(followingCronFeedResponse));
};
