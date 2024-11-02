import { httpApiMock } from '@app/api/mocks/http.api.mock';
import { SassyHashResponse } from '@app/api/sassyHash.api';

const res: SassyHashResponse = {
  // data: {
  //   castHash: '0x122fc6df29a8a4c6e062d4f6994c1cb1b09cd2fd',
  //   decodedText: null,
  //   isDecrypted: false,
  //   text: 'BArt-head is back with a new thing 👁️ 👁️',
  // },

  data: {
    castHash: '0x84ebc0cf7b4204b4d0020a5fcb4d2b00215ca1e9',
    decodedText: 'IYKYK 👀',
    isDecrypted: true,
    text: 'Probably Nothing\n\nIYKYK 👀',
  },
};
httpApiMock.onPost('getSassyHashes').reply(200, res);
