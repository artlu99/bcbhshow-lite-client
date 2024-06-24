import { ReactionsByFidRequest } from '@farcaster/hub-nodejs';
import { Env } from '../common';
import { HubReactionsResponse } from '../shared/hubble-http-types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as ReactionsByFidRequest;
  const { fid, reactionType, pageSize, pageToken } = js;

  const airstackApiKey = context.env.AIRSTACK_API_KEY;

  const paginationParam = pageToken ? `&pageToken=${pageToken}` : '';
  const endpoint = `https://hubs.airstack.xyz/v1/reactionsByFid?fid=${fid}&reaction_type=${reactionType}&reverse=1&pageSize=${pageSize}${paginationParam}`;

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'x-airstack-hubs': `${airstackApiKey}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  const reactionsResponse = (await res.json()) as HubReactionsResponse;
  return new Response(JSON.stringify(reactionsResponse));
};
