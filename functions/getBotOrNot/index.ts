import { Redis } from '@upstash/redis/cloudflare';
import { isObject, sift } from 'radash';
import { Env } from '../common';

const SAYANGEL_LOG = true;

interface BotOrNotRequest {
  fids: number[];
}
interface BotOrNotResponse {
  fid: number;
  result: { label?: string; summary?: string; farcaptcha?: boolean };
}
interface BotOrNotsResponse {
  fids: BotOrNotResponse[];
}

const fetchBotOrNotExpensiveApi = async (fids: number[], endpoint_base: string) => {
  const endpoint = `${endpoint_base}?fids=` + fids.join(',');
  if (SAYANGEL_LOG) console.log('fetchBotOrNotExpensiveApi', endpoint);

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  const bonResponse = (await res.json()) as BotOrNotsResponse;
  if (SAYANGEL_LOG) console.log(JSON.stringify(bonResponse));

  return bonResponse;
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const stmt = context.env.D1.prepare(
    `SELECT label, COUNT(1) AS cnt FROM bon
      GROUP BY label
      ORDER BY label`,
  );
  const res = await stmt.all();
  return new Response(JSON.stringify(res));
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const js = (await request.json()) as BotOrNotRequest;
  const { fids } = js;

  const redis = Redis.fromEnv(env);
  const u = fids.length > 0 ? ((await redis.mget(fids.map((f) => `bon:${f}`))) as string[]) : [];
  const bonResponses: BotOrNotResponse[] = u.map((u, idx) => (isObject(u) ? { fid: fids[idx], result: u } : null));

  const missingFidsFromCache = sift(bonResponses.map((f, i) => (f === null ? i : undefined)).map((i) => fids[i]));
  if (missingFidsFromCache.length > 0) {
    const bonResponse = await fetchBotOrNotExpensiveApi(missingFidsFromCache, env.BOT_OR_NOT_API);
    const validBoNResponses = bonResponse.fids.filter((f) => f?.fid !== null);
    await Promise.all(
      bonResponse.fids.map((br) =>
        redis.set(`bon:${br.fid}`, br?.fid ? JSON.stringify(br.result) : '{}', {
          ex: 2 * 24 * 60 * 60, // expire after 2 days
        }),
      ),
    );

    bonResponse.fids.map(async (br) => {
      const res = await context.env.D1.prepare(
        `INSERT INTO bon (fid, label, summary, farcaptcha)
          VALUES (?, ?, ?, ?)
          ON CONFLICT (fid) DO UPDATE SET
            label=EXCLUDED.label,
            summary=EXCLUDED.summary,
            farcaptcha=EXCLUDED.farcaptcha`,
      )
        .bind(br.fid, br.result.label ?? '', br.result.summary ?? '', br.result.farcaptcha?.toString() ?? 'undefined')
        .run();
      if (SAYANGEL_LOG) console.log('res', res);
    });

    return new Response(JSON.stringify({ fids: sift(bonResponses.concat(validBoNResponses)) }));
  } else {
    return new Response(JSON.stringify({ fids: bonResponses }));
  }
};
