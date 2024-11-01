import { getBotOrNot } from '@app/api/botOrNot.api';
import { PagedCronFeed } from '@app/api/channelFeed.api';
import { FeedObject } from '@app/api/feed-types';
import { getTagsForCast } from '@app/api/followingFeed.api';
import { httpApi } from '@app/api/http.api';
import { ChannelObject } from '@app/api/warpcast-types';
import { FORYOU_FEED_PAGESIZE } from '@app/constants/neynarPagination';
import { sift, unique } from 'radash';
import './mocks/mockornot';
import { getSassyHashes, isSassy } from './sassyHash.api';

interface ForYouFeedRequest {
  fid: number;
  limit: number;
  cursor?: string;
}

export const getNeynarOpenrankForYouFeed = (forYouFeedRequestPayload: ForYouFeedRequest): Promise<FeedObject> =>
  httpApi.post<FeedObject>('getForYouFeed', { ...forYouFeedRequestPayload }).then(({ data }) => data);

interface EnhancedForYouFeedRequest {
  fid: number;
  cursor?: string;
  following: number[];
  powerBadgeUsers: number[];
  allChannels: ChannelObject[];
}
export const getEnhancedForYouFeed = async (
  homeFeedRequestPayload: EnhancedForYouFeedRequest,
): Promise<PagedCronFeed> => {
  const { fid, cursor, following, powerBadgeUsers, allChannels } = homeFeedRequestPayload;

  const forYouFeed = await getNeynarOpenrankForYouFeed({ fid: fid, limit: FORYOU_FEED_PAGESIZE, cursor });
  const seenFids = sift(forYouFeed.casts.map((cast) => cast.author.fid).filter((fid) => fid !== null));
  const seenSassyHashes = unique(sift(forYouFeed.casts.map((cast) => (isSassy(cast.text) ? cast.hash : null))));
  const botOrNotResponse = await getBotOrNot({ fids: seenFids ?? [] });
  const sassyHashResponse = await getSassyHashes({ fid, hashes: seenSassyHashes ?? [] });

  return {
    ...forYouFeed,
    casts: forYouFeed.casts.map((castObject) => ({
      ...castObject,
      amFollowing: following.find((fid) => fid === castObject.author.fid) !== undefined,

      isSassy: isSassy(castObject.text),
      sassyHash: Object.values(sassyHashResponse.data).find((obj) => obj.castHash === castObject.hash),

      authorHasPowerBadge: powerBadgeUsers.find((fid) => fid === castObject.author.fid) !== undefined,
      botOrNotResult: botOrNotResponse.fids.find((fid) => fid.fid === castObject.author.fid)?.result ?? {
        label: '<unknown>',
        summary: '<unknown>',
        farcaptcha: false,
      },
      tags: getTagsForCast(allChannels, castObject.parent_url ?? undefined),
    })),
  };
};
