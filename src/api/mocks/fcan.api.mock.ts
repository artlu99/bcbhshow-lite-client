import { httpApiMock } from '@app/api/mocks/http.api.mock';
import { FcanAd } from '@app/api/fcan.api';

export const mockFcanAd: FcanAd = {
  id: 'mock',
  head: 'mock ad head',
  text: 'mock ad text',
  action: '',
  rewardsMultiple: 1,
  displayUrl: 'https://mock.com',
};
httpApiMock.onPost('getFcanAd').reply(200, mockFcanAd);
