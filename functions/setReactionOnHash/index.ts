import { Env } from '../common';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const js = (await request.json()) as {
    signerId: string;
    hash: `0x${string}`;
    reactionType: 'like' | 'recast' | 'unlike' | 'unrecast';
  };
  const { signerId, hash, reactionType } = js;

  const url = 'https://api.neynar.com/v2/farcaster/reaction';
  const idem = JSON.stringify(js);
  const options = {
    method: reactionType === 'unlike' || reactionType === 'unrecast' ? 'DELETE' : 'POST',
    headers: {
      accept: 'application/json',
      api_key: context.env.NEYNAR_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      signer_uuid: signerId,
      reaction_type: reactionType,
      target: hash,
      idem,
    }),
  };

  try {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => {
        throw new Error(err);
      });
    return new Response(`${reactionType} set on ${hash}`);
  } catch (err) {
    if (false) {
    } else {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }
};
