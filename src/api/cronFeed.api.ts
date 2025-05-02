import { FeedObject } from '@app/api/feed-types';
import { httpApi } from '@app/api/http.api';
import './mocks/mockornot';

interface CronFeedRequest {
  channelId: string;
  pageSize: number;
  pageToken?: string;
}

export const getCronFeed = (cronFeedRequestPayload: CronFeedRequest): Promise<FeedObject> =>
  httpApi.post<FeedObject>('getCronFeed', { ...cronFeedRequestPayload }).then(({ data }) => data);
