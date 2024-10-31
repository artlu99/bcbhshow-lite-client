import { getBotOrNot } from '@app/api/botOrNot.api';
import { PagedCronFeed } from '@app/api/channelFeed.api';
import { FeedObject } from '@app/api/feed-types';
import { httpApi } from '@app/api/http.api';
import { ChannelObject } from '@app/api/warpcast-types';
import curatedChannels from '@app/assets/curated-channels.json';
import { IHashTag } from '@app/components/common/BaseHashTag/BaseHashTag';
import { FOLLOWING_FEED_PAGESIZE } from '@app/constants/pinataPagination';
import { listify, sift } from 'radash';
import './mocks/mockornot';

export const getTagsForCast = (allChannels: ChannelObject[], parent_url?: string): IHashTag[] => {
  const maybeChannelObj = allChannels?.find((channel) => channel.url === parent_url);
  const tags: IHashTag[] = maybeChannelObj
    ? [{ title: maybeChannelObj.name, id: maybeChannelObj.id, bgColor: 'info' }]
    : [];

  const flatMap = listify(curatedChannels, (key, values) => values.map((value) => ({ id: value, tag: key }))).flat();
  const channelTags = maybeChannelObj?.id
    ? flatMap
        .filter((tag) => tag.id === maybeChannelObj.id)
        .map((tag) => {
          const t: IHashTag = { title: tag.tag, id: tag.id, bgColor: 'success' };
          return t;
        })
    : [];

  return [...channelTags, ...tags];
};

interface FollowingFeedRequest {
  fid: number;
  pageSize: number;
  pageToken?: string;
}
export const getFollowingFeed = (followingFeedRequestPayload: FollowingFeedRequest): Promise<FeedObject> =>
  httpApi.post<FeedObject>('getCastsByFollowing', { ...followingFeedRequestPayload }).then(({ data }) => data);

interface EnhancedFollowingFeedRequest {
  fid: number;
  pageToken?: string;
  powerBadgeUsers: number[];
  allChannels: ChannelObject[];
}
export const getEnhancedFollowingFeed = async (
  homeFeedRequestPayload: EnhancedFollowingFeedRequest,
): Promise<PagedCronFeed> => {
  const { fid, pageToken, powerBadgeUsers, allChannels } = homeFeedRequestPayload;

  const cronFeed = await getFollowingFeed({ fid: fid, pageSize: FOLLOWING_FEED_PAGESIZE, pageToken });
  const seenFids = sift(cronFeed.casts.map((cast) => cast.author.fid).filter((fid) => fid !== null));
  const botOrNotResponse = await getBotOrNot({ fids: seenFids ?? [] });

  return {
    ...cronFeed,
    casts: cronFeed.casts.map((castObject) => ({
      ...castObject,
      amFollowing: true,

      authorHasPowerBadge: powerBadgeUsers.find((fid) => fid === castObject.author.fid) !== undefined,
      botOrNotResult: botOrNotResponse.fids.find((fid) => fid.fid === castObject.author.fid)?.result ?? {
        label: '<unknown>',
        summary: '<unknown>',
        farcaptcha: false,
      },
      tags: getTagsForCast(allChannels, castObject.parent_url),
    })),
  };
};
