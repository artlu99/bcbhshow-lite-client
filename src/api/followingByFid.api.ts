import { FollowingByFidResponseSchema } from '@app/api/farquest-types';
import { httpApi } from '@app/api/http.api';
import { MAX_PAGESIZE } from '@app/constants/farQuestPagination';
import { backOff } from 'exponential-backoff';
import './mocks/mockornot';

export interface FollowingByFidRequest {
  fid: number;
  limit: number;
  cursor?: string;
}

const getFollowingByFidPaged = (
  followingByFidRequestPayload: FollowingByFidRequest,
): Promise<FollowingByFidResponseSchema> =>
  httpApi
    .post<FollowingByFidResponseSchema>('getFollowingByFid', { ...followingByFidRequestPayload })
    .then(({ data }) => data);

export const getFollowingByFid = async ({ fid }: { fid: number }) => {
  let cursor: string | undefined = undefined;
  let res: FollowingByFidResponseSchema = { result: { users: [] }, source: 'v2' };
  do {
    const paged = await backOff(() => getFollowingByFidPaged({ fid, limit: MAX_PAGESIZE, cursor }));
    cursor = paged.result.next;
    res = { ...res, result: { users: res.result.users.concat(paged.result.users) } };
  } while (cursor);
  return res;
};
