import { httpApi } from '@app/api/http.api';
import './mocks/mockornot';

export interface SassyHash {
  castHash: string;
  text: string;
  decodedText: string | null;
  isDecrypted: boolean;
}
export interface SassyHashResponse {
  data: SassyHash;
}
interface SassyHashRequest {
  privyAuthToken: string;
  castHash: string;
}

export const isSassy = (text: string): boolean => {
  const re = '[a-f0-9]{64}';
  const regexp = new RegExp(`^${re}$|^${re}\\s|\\s${re}$|\\s${re}\\s`, 'i');
  return regexp.test(text);
};

export const getSassyHash = (sassyHashRequestPayload: SassyHashRequest): Promise<SassyHashResponse> =>
  httpApi
    .post<SassyHashResponse>('getSassyHashes', sassyHashRequestPayload)
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
      return Promise.resolve({
        data: {
          castHash: sassyHashRequestPayload.castHash,
          text: 'error',
          decodedText: null,
          isDecrypted: false,
        },
      });
    });
