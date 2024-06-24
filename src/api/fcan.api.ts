import { httpApi } from '@app/api/http.api';
import './mocks/mockornot';

export interface FcanAd {
  id: string;
  head: string;
  text: string;
  action: string;
  rewardsMultiple: number;
  displayUrl: string;
  attribUrl?: string;
}

export interface FcanAdRequest {
  fid: number;
}

export const getFcanAd = (adRequestPayload: FcanAdRequest): Promise<FcanAd> =>
  httpApi.post<FcanAd>('getFcanAd', { ...adRequestPayload }).then(({ data }) => data);
