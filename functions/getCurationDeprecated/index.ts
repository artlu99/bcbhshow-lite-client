import { Env } from '../common';

const CURATION_LOG = true;

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const prepare = context.env.D1.prepare(`
    SELECT votedFid, count(1) AS cnt, action
    FROM curation 
    GROUP BY votedFid, action
    ORDER BY cnt DESC, action DESC
    LIMIT 100`);
  const data = await prepare.all();
  return new Response(JSON.stringify({ results: data?.results }));
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { hashList: string[]; pageSize?: number };
  const { hashList, pageSize = 1000 } = js;

  const prepare = context.env.D1.prepare(`
    SELECT timestamp, voterFid, votedFid, hash, action 
    FROM curation 
    WHERE hash IN (${hashList.map((hash) => `'${hash}'`).join(',')})
    ORDER BY timestamp DESC 
    LIMIT ${pageSize}`);
  const data = await prepare.all();
  return new Response(JSON.stringify({ results: data?.results }));
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as {
    castFid: number;
    castHash: string;
    actionFid: number;
    action: 'upvote' | 'downvote';
  };
  const { castFid, castHash, actionFid, action } = js;

  try {
    const res = await context.env.D1.prepare(
      'INSERT INTO curation (timestamp, voterFid, votedFid, hash, action) VALUES (?, ?, ?, ?, ?)',
    )
      .bind(Date.now(), actionFid, castFid, castHash, action)
      .run();

    if (CURATION_LOG) console.log('res', res);
  } catch (e) {
    console.error(e);
  }
  return new Response(JSON.stringify({ message: `fid ${actionFid} voted ${action} on FID ${castFid}` }));
};
