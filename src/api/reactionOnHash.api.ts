import { httpApi } from '@app/api/http.api';

interface ReactionRequest {
  privyAuthToken: string;
  target: { fid: number; hash: string };
  reactionType: 'like' | 'recast' | 'unlike' | 'unrecast';
}

export interface ReactionResponse {
  res: { message?: string; error?: string };
}

export const setReactionOnHash = async (reactionPayload: ReactionRequest): Promise<ReactionResponse> =>
  httpApi.post<ReactionResponse>('setReactionOnHash', { ...reactionPayload }).then(({ data }) => data);
