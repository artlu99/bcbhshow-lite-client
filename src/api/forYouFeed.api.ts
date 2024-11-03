import { getBotOrNot } from '@app/api/botOrNot.api';
import { PagedCronFeed } from '@app/api/channelFeed.api';
import { FeedObject } from '@app/api/feed-types';
import { getTagsForCast } from '@app/api/followingFeed.api';
import { httpApi } from '@app/api/http.api';
import { getSassyHash, isSassy } from '@app/api/sassyHash.api';
import { ChannelObject } from '@app/api/warpcast-types';
import { FORYOU_FEED_PAGESIZE } from '@app/constants/neynarPagination';
import { sift, unique } from 'radash';
import './mocks/mockornot';

interface ForYouFeedRequest {
  fid: number;
  limit: number;
  cursor?: string;
}

export const getNeynarOpenrankForYouFeed = (forYouFeedRequestPayload: ForYouFeedRequest): Promise<FeedObject> =>
  httpApi.post<FeedObject>('getForYouFeed', { ...forYouFeedRequestPayload }).then(({ data }) => data);

interface EnhancedForYouFeedRequest {
  fid: number;
  authenticated: boolean;
  cursor?: string;
  following: number[];
  allChannels: ChannelObject[];
}
export const getEnhancedForYouFeed = async (
  homeFeedRequestPayload: EnhancedForYouFeedRequest,
): Promise<PagedCronFeed> => {
  const { fid, authenticated, cursor, following, allChannels } = homeFeedRequestPayload;

  const forYouFeed = await getNeynarOpenrankForYouFeed({ fid: fid, limit: FORYOU_FEED_PAGESIZE, cursor });
  const seenFids = sift(forYouFeed.casts.map((cast) => cast.author.fid).filter((fid) => fid !== null));
  const seenSassyHashes = unique(sift(forYouFeed.casts.map((cast) => (isSassy(cast.text) ? cast.hash : null))));
  const botOrNotResponse = await getBotOrNot({ fids: seenFids ?? [] });
  const sassyHashResponses = authenticated
    ? await Promise.all(seenSassyHashes.map((sh) => getSassyHash({ castHash: sh })))
    : [];

  return {
    ...forYouFeed,
    casts: forYouFeed.casts.map((castObject) => ({
      ...castObject,
      amFollowing: following.find((fid) => fid === castObject.author.fid) !== undefined,

      isSassy: isSassy(castObject.text),
      sassyHash: sassyHashResponses.find((sh) => sh.data.castHash === castObject.hash)?.data,

      botOrNotResult: botOrNotResponse.fids.find((fid) => fid.fid === castObject.author.fid)?.result ?? {
        label: '<unknown>',
        summary: '<unknown>',
        farcaptcha: false,
      },
      tags: getTagsForCast(allChannels, castObject.parent_url ?? undefined),
    })),
  };
};
