import { httpApi } from '@app/api/http.api';
import { UserFollowingChannelsObject } from '@app/api/warpcast-types';
import './mocks/mockornot';

interface ChannelsRequest {
  fid: number;
}

export const getUserFollowingChannels = async (
  channelsRequestPayload: ChannelsRequest,
): Promise<UserFollowingChannelsObject> =>
  httpApi
    .post<UserFollowingChannelsObject>('getUserFollowingChannels', { ...channelsRequestPayload })
    .then(({ data }) => data);
