import { httpApi } from '@app/api/http.api';
import './mocks/mockornot';

interface ForYouFeedRequest {
  fid: number;
  limit: number;
  cursor?: string;
}

interface ForYouFeedResponse {
  casts: {
    object: 'cast';
  }[];
  cursor?: string;
}
export const getNeynarOpenrankForYouFeed = (forYouFeedRequestPayload: ForYouFeedRequest): Promise<ForYouFeedResponse> =>
  httpApi.post<ForYouFeedResponse>('getForYouFeed', { ...forYouFeedRequestPayload }).then(({ data }) => data);
