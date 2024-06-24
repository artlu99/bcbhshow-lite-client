import { CastObject } from '@app/api/feed-types';
import { httpApi } from '@app/api/http.api';

interface CastRequest {
  hash: string;
}

export interface CastResponse {
  cast: CastObject;
}

export const getCastByHash = async (castRequestPayload: CastRequest): Promise<CastResponse> =>
  httpApi.post<CastResponse>('getCastByHash', { ...castRequestPayload }).then(({ data }) => data);
