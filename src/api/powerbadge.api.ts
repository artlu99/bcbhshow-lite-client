import { httpApi } from '@app/api/http.api';
import './mocks/mockornot';

export interface PowerBadgeUsersResponse {
  result: { fids: number[] };
}

export interface PowerBadgeUsersRequest {
  empty: undefined;
}

export const getAllPowerBadgeUsers = (
  powerBadgeRequestPayload: PowerBadgeUsersRequest,
): Promise<PowerBadgeUsersResponse> =>
  httpApi
    .post<PowerBadgeUsersResponse>('getAllPowerBadgeUsers', { ...powerBadgeRequestPayload })
    .then(({ data }) => data);
