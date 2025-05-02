import type { Env } from '../common';
import type { FeedObject } from '../shared/feed-types';
import { sendPosthogChannelId } from '../shared/posthog';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as {
    channelId: string;
    pageSize: number;
    pageToken?: string;
  };
  const { channelId, pageSize, pageToken } = js;

  const neynarApiKey = context.env.NEYNAR_API_KEY;

  const paginationParam = pageToken ? `&cursor=${pageToken}` : '';
  const endpoint = `https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=channel_id&channel_id=${channelId}&limit=${pageSize}${paginationParam}`;

  console.log('Making request to:', endpoint);

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api_key': neynarApiKey,
    },
  });

  if (!res.ok) {
    console.error(endpoint, res.status, JSON.stringify(res));
    throw new Error('Failed to fetch data');
  }

  await sendPosthogChannelId(context.env, 'getCronFeed', channelId);

  const cronFeedResponse = (await res.json()) as FeedObject;
  return new Response(JSON.stringify(cronFeedResponse));
};
