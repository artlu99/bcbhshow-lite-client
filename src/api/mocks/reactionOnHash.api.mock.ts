import { CastObject } from '@app/api/feed-types';
import { mockCronFeed } from '@app/api/mocks/cronFeed.api.mock';
import { httpApiMock } from '@app/api/mocks/http.api.mock';

export const mockCast: CastObject | undefined = mockCronFeed.casts.find((c) => c.hash === '0x[0]');

httpApiMock.onPost('setReactionOnHash').reply(200, { message: 'ok' });
