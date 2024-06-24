import { httpApi } from '@app/api/http.api';
import { ChannelResponseObject } from '@app/api/warpcast-types';
import './mocks/mockornot';

export interface ChannelRequest {
  channelId: string;
}

export const getChannelById = async (channelRequestPayload: ChannelRequest): Promise<ChannelResponseObject> =>
  httpApi.post<ChannelResponseObject>('getChannelById', { ...channelRequestPayload }).then(({ data }) => data);
