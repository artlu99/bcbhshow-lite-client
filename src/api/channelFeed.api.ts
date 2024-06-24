import { BotOrNotResult, getBotOrNot } from '@app/api/botOrNot.api';
import { getCronFeed } from '@app/api/cronFeed.api';
import { Curation, getCuration } from '@app/api/curation.api';
import { CastObject } from '@app/api/feed-types';
import { ChannelObject } from '@app/api/warpcast-types';
import { IHashTag } from '@app/components/common/BaseHashTag/BaseHashTag';
import { CHANNEL_FEED_PAGESIZE } from '@app/constants/pinataPagination';
import { sift, unique } from 'radash';

export interface EnhancedCastObject extends CastObject {
  amFollowing: boolean;
  authorHasPowerBadge: boolean;
  botOrNotResult: BotOrNotResult;
  tags: IHashTag[];
  curation: { upvotes: Curation[]; downvotes: Curation[] };
}
export interface PagedCronFeed {
  casts: EnhancedCastObject[];
  next?: { cursor: string };
}

interface ChannelFeedRequest {
  channel?: ChannelObject;
  pageToken?: string;
  following: number[];
  powerBadgeUsers: number[];
}

export const getEnhancedChannelFeed = async (channelFeedRequestPayload: ChannelFeedRequest): Promise<PagedCronFeed> => {
  const { channel, pageToken, following, powerBadgeUsers } = channelFeedRequestPayload;
  if (!channel) return { casts: [] };

  const cronFeed = await getCronFeed({ channelId: channel.id, pageSize: CHANNEL_FEED_PAGESIZE, pageToken });
  const seenFids = sift(cronFeed.casts.map((cast) => cast.author.fid).filter((fid) => fid !== null));
  const seenHashes = unique(cronFeed.casts.map((cast) => cast.hash));
  const botOrNotResponse = await getBotOrNot({ fids: seenFids ?? [] });
  const curation = await getCuration({ hashList: seenHashes ?? [] });

  return {
    ...cronFeed,
    casts: cronFeed.casts.map((castObject) => ({
      ...castObject,
      amFollowing: following.find((fid) => fid === castObject.author.fid) !== undefined,

      authorHasPowerBadge: powerBadgeUsers.find((fid) => fid === castObject.author.fid) !== undefined,
      botOrNotResult: botOrNotResponse.fids.find((fid) => fid.fid === castObject.author.fid)?.result ?? {
        label: '<unknown>',
        summary: '<unknown>',
        farcaptcha: false,
      },
      tags: [],
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
