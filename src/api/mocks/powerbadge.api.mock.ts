import { httpApiMock } from '@app/api/mocks/http.api.mock';

httpApiMock.onPost('getAllPowerBadgeUsers').reply(200, {
  result: { fids: [2, 3, 6546, 15850] },
});
