import { httpApi } from '@app/api/http.api';
import { ReactionType } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import './mocks/mockornot';

interface ReactionsByFidRequest {
  type: ReactionType;
  fid: number;
  limit: number;
  cursor?: string;
}

interface ReactionsCastResponse {
  reactions: {
    cast: {
      hash: string;
    };
  }[];
  cursor?: string;
}
export const getNeynarReactionsByFid = (
  reactionsByFidRequestPayload: ReactionsByFidRequest,
): Promise<ReactionsCastResponse> =>
  httpApi
    .post<ReactionsCastResponse>('getNeynarReactionsByFid', { ...reactionsByFidRequestPayload })
    .then(({ data }) => data);
