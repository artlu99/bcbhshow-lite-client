import { ReactionsByHashResponseSchema } from '@app/api/farquest-types';
import { httpApi } from '@app/api/http.api';
import { MAX_PAGESIZE } from '@app/constants/farQuestPagination';
import { backOff } from 'exponential-backoff';
import './mocks/mockornot';

interface ReactionsByHashRequest {
  type: 'likes' | 'recasters';
  hash: string;
  limit: number;
  cursor?: string;
}

const getReactionsByHashPaged = (
  reactionsByHashRequestPayload: ReactionsByHashRequest,
): Promise<ReactionsByHashResponseSchema> =>
  httpApi
    .post<ReactionsByHashResponseSchema>('getReactionsByHash', { ...reactionsByHashRequestPayload })
    .then(({ data }) => data);

export const getReactionsByHash = async ({ type, hash }: { type: 'likes' | 'recasters'; hash: string }) => {
  let cursor: string | undefined = undefined;
  let res: ReactionsByHashResponseSchema =
    type === 'likes' ? { result: { likes: [] }, source: 'v2' } : { result: { recasters: [] }, source: 'v2' };
  do {
    const paged = await backOff(() => getReactionsByHashPaged({ type, hash, limit: MAX_PAGESIZE, cursor }));
    cursor = paged.result.next;
    res =
      type === 'likes'
        ? { ...res, result: { likes: (res.result.likes ?? []).concat(paged?.result?.likes ?? []) } }
        : { ...res, result: { recasters: (res.result.recasters ?? []).concat(paged?.result?.recasters ?? []) } };
  } while (cursor);
  return res;
};
