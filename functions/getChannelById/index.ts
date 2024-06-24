import { Env } from '../common';
import { ChannelResponseObject } from '../shared/warpcast-types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { channelId: string };
  const { channelId } = js;

  const endpoint = `https://api.warpcast.com/v1/channel?channelId=${channelId}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  const channelResponse = (await res.json()) as ChannelResponseObject;
  return new Response(JSON.stringify(channelResponse));
};
