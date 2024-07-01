import { Env } from '../common';
import { FeedObject } from '../shared/feed-types';
import sendPosthogEvent from '../shared/posthog';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { fid: number; pageSize: number; pageToken?: string };
  const { fid, pageSize, pageToken } = js;

  const pinataJwt = context.env.PINATA_JWT;

  const paginationParam = pageToken ? `&pageToken=${pageToken}` : '';
  const endpoint = `https://api.pinata.cloud/v3/farcaster/casts?fid=${fid}&following=true&pageSize=${pageSize}${paginationParam}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pinataJwt}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  await sendPosthogEvent(context.env, 'getCastsByFollowing', 'not_tracking_by_fid');

  const followingCronFeedResponse = (await res.json()) as FeedObject;
  return new Response(JSON.stringify(followingCronFeedResponse));
};
