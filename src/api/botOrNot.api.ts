import { httpApi } from '@app/api/http.api';
import { unique } from 'radash';
import './mocks/mockornot';

export interface BotOrNotResult {
  label?: string;
  summary?: string;
  farcaptcha?: boolean;
}
interface BotOrNotResponse {
  fids: { fid: number; result: BotOrNotResult }[];
}
interface BotOrNotRequest {
  fids: number[];
}
interface BotOrNotLabelsResponse {
  results: {
    label: string;
    cnt: number;
  }[];
}

export const getBotOrNot = (botOrNotRequestPayload: BotOrNotRequest): Promise<BotOrNotResponse> =>
  httpApi
    .post<BotOrNotResponse>('getBotOrNot', {
      ...botOrNotRequestPayload,
      fids: unique(botOrNotRequestPayload.fids),
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
      return Promise.resolve({ fids: [] });
    });

export const getBotOrNotLabels = (): Promise<BotOrNotLabelsResponse> =>
  httpApi
    .get<BotOrNotLabelsResponse>('getBotOrNot')
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
      return Promise.resolve({ results: [] });
    });
