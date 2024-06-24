import { StevePolymorphicEmbedMetadata } from '@app/api/metadata.api';
import { httpApiMock } from '@app/api/mocks/http.api.mock';

export const mockMetadata: StevePolymorphicEmbedMetadata = {
  content: 'null',
};
httpApiMock.onPost('getMetadata').reply(200, mockMetadata);
