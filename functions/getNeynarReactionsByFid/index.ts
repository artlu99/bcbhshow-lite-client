import { ReactionType, ReactionsCastResponse } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Env } from '../common';
import sendPosthogEvent from '../shared/posthog';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as {
    fid: number;
    type: ReactionType;
    limit: number;
    cursor?: string;
  };
  const { fid, type, limit, cursor } = js;

  const neynarApiKey = context.env.NEYNAR_API_KEY;

  const paginationParam = cursor ? `&cursor=${cursor}` : '';
  const endpoint = `https://api.neynar.com/v2/farcaster/reactions/user?fid=${fid}&viewer_fid=${fid}&type=${type}s&limit=${limit}${paginationParam}`;

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      api_key: `${neynarApiKey}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch data');

  await sendPosthogEvent(context.env, 'getNeynarReactionsByFid', 'not tracking by fid');

  const reactionsResponse = (await res.json()) as ReactionsCastResponse;
  return new Response(JSON.stringify(reactionsResponse));
};
