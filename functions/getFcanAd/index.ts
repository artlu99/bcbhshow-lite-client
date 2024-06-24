import { Env } from '../common';

interface FCANResponse {
  id: string;
  head: string;
  text: string;
  rewardsMultiple?: number;
  displayUrl?: string;
  attribUrl?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { fid: number };
  const { fid } = js;

  const bearerToken = context.env.FCAN_TOKEN;

  const endpoint = `https://fcan.xyz/getadsfor?fid=${fid}&src=client-bcbhshow.artlu.xyz`;
  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${bearerToken}` },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  const fcanResponse = (await res.json()) as FCANResponse;
  return new Response(JSON.stringify(fcanResponse));
};
