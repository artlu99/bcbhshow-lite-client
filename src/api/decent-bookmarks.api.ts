import { httpApi } from '@app/api/http.api';
import './mocks/mockornot';

export interface DecentBookmark {
  timestamp: number;
  fid: number;
  username: string;
  hash: string;
  tags?: string[];
}

export interface DecentBookmarksRequest {
  fid: number;
}

export const getDecentBookmarks = (
  bookmarksRequestPayload: DecentBookmarksRequest,
): Promise<{ bookmarks: DecentBookmark[] }> =>
  httpApi
    .post<{ bookmarks: DecentBookmark[] }>('getDecentBookmarks', { ...bookmarksRequestPayload })
    .then(({ data }) => data);
