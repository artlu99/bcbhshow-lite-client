import { Env } from '../common';

export interface PowerBadgeUsersRequest {
  empty: undefined;
}

export const onRequestPost: PagesFunction<Env> = async () => {
  const endpoint = 'https://api.warpcast.com/v2/power-badge-users';
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  const pbResponse = (await res.json()) as {
    result: { fids: number[] };
  };
  return new Response(JSON.stringify(pbResponse));
};
