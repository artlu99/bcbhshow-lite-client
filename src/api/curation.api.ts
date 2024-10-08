import { httpApi } from '@app/api/http.api';

type ActionEnumType = 'upvote' | 'downvote';

interface Votes {
  votedFid: number;
  cnt: number;
  action: ActionEnumType;
}

export interface VotesResponse {
  results: Votes[];
}

export interface Curation {
  timestamp: number;
  voterFid: number;
  votedFid: number;
  hash: string;
  action: ActionEnumType;
}

export interface CurationResponse {
  results: Curation[];
}

export interface CurationRequest {
  hashList: string[];
  pageSize?: number;
}

export interface CurationPutRequest {
  castFid: number;
  castHash: string;
  actionFid: number;
  action: ActionEnumType;
}

export const getVotesDeprecated = (): Promise<VotesResponse> =>
  httpApi.get<VotesResponse>('getCurationDeprecated').then(({ data }) => data);

export const getCuration = (curationRequestPayload: CurationRequest): Promise<CurationResponse> =>
  httpApi.post<CurationResponse>('getCurationDeprecated', { ...curationRequestPayload }).then(({ data }) => data);

export const putCuration = (curationPutRequestPayload: CurationPutRequest): Promise<{ message: string }> =>
  httpApi.put<{ message: string }>('getCurationDeprecated', { ...curationPutRequestPayload }).then(({ data }) => data);
