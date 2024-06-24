import { httpApi } from '@app/api/http.api';
import { AllChannelsResponseObject } from '@app/api/warpcast-types';
import './mocks/mockornot';

export const getAllChannels = async (): Promise<AllChannelsResponseObject> =>
  httpApi.post<AllChannelsResponseObject>('getAllChannels').then(({ data }) => data);
