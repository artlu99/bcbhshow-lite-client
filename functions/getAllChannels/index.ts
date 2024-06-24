import { Env } from '../common';
import { AllChannelsResponseObject } from '../shared/warpcast-types';

export const onRequestPost: PagesFunction<Env> = async () => {
  // not paginated, no parameters
  const endpoint = `https://api.warpcast.com/v2/all-channels`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  const channelsResponse = (await res.json()) as AllChannelsResponseObject;
  return new Response(JSON.stringify(channelsResponse));
};
