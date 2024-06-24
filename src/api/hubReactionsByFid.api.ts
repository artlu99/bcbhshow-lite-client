import { httpApi } from '@app/api/http.api';
import { HubReactionType, HubReactionsResponse } from './hubble-http-types';
import './mocks/mockornot';

interface ReactionsByFidRequest {
  fid: number;
  reactionType?: HubReactionType | undefined;
  pageSize?: number | undefined;
  pageToken?: string | undefined;
  reverse?: boolean | undefined;
}

export const getHubReactionsByFid = (
  reactionsByFidRequestPayload: ReactionsByFidRequest,
): Promise<HubReactionsResponse> =>
  httpApi
    .post<HubReactionsResponse>('getHubReactionsByFid', { ...reactionsByFidRequestPayload })
    .then(({ data }) => data);
