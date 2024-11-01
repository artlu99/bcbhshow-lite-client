import { httpApi } from '@app/api/http.api';
import { unique } from 'radash';
import './mocks/mockornot';

export interface SassyHash {
  castHash: string;
  text: string;
  decodedText: string | null;
  isDecrypted: boolean;
}
export interface SassyHashResponse {
  data: { [label: string]: SassyHash };
}
interface SassyHashRequest {
  fid: number;
  hashes: string[];
}

export const isSassy = (text: string): boolean => {
  const re = '[a-f0-9]{64}';
  const regexp = new RegExp(`^${re}$|^${re}\\s|\\s${re}$|\\s${re}\\s`, 'i');
  return regexp.test(text);
};

export const getSassyHashes = (sassyHashRequestPayload: SassyHashRequest): Promise<SassyHashResponse> =>
  httpApi
    .post<SassyHashResponse>('getSassyHashes', {
      ...sassyHashRequestPayload,
      hashes: unique(sassyHashRequestPayload.hashes),
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
      return Promise.resolve({ data: {} });
    });
