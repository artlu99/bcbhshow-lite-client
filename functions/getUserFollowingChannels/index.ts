import { Env } from '../common';
import { UserFollowingChannelsObject } from '../shared/warpcast-types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { fid: number };
  const { fid } = js;

  // paginated, following is sorted by descending https://docs.farcaster.xyz/reference/warpcast/api#channel-apis
  const endpoint = `https://api.warpcast.com/v1/user-following-channels?fid=${fid}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  const channelsResponse = (await res.json()) as UserFollowingChannelsObject;
  return new Response(JSON.stringify(channelsResponse));
};
