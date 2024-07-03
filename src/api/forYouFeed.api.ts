import { getBotOrNot } from '@app/api/botOrNot.api';
import { PagedCronFeed } from '@app/api/channelFeed.api';
import { getCuration } from '@app/api/curation.api';
import { FeedObject } from '@app/api/feed-types';
import { getTagsForCast } from '@app/api/followingFeed.api';
import { httpApi } from '@app/api/http.api';
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
  const seenHashes = unique(forYouFeed.casts.map((cast) => cast.hash));
  const botOrNotResponse = await getBotOrNot({ fids: seenFids ?? [] });
  const curation = await getCuration({ hashList: seenHashes ?? [] });

  return {
    ...forYouFeed,
    casts: forYouFeed.casts.map((castObject) => ({
      ...castObject,
      amFollowing: following.find((fid) => fid === castObject.author.fid) !== undefined,

      authorHasPowerBadge: powerBadgeUsers.find((fid) => fid === castObject.author.fid) !== undefined,
      botOrNotResult: botOrNotResponse.fids.find((fid) => fid.fid === castObject.author.fid)?.result ?? {
        label: '<unknown>',
        summary: '<unknown>',
        farcaptcha: false,
      },
      tags: getTagsForCast(allChannels, castObject.parent_url),
      curation: {
        upvotes: curation.results.filter(
          (result) =>
            result.votedFid === castObject.author.fid && result.hash === castObject.hash && result.action === 'upvote',
        ),
        downvotes: curation.results.filter(
          (result) =>
            result.votedFid === castObject.author.fid &&
            result.hash === castObject.hash &&
            result.action === 'downvote',
        ),
      },
    })),
  };
};
