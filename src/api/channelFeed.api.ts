import { BotOrNotResult, getBotOrNot } from '@app/api/botOrNot.api';
import { getCronFeed } from '@app/api/cronFeed.api';
import { CastObject } from '@app/api/feed-types';
import { ChannelObject } from '@app/api/warpcast-types';
import { IHashTag } from '@app/components/common/BaseHashTag/BaseHashTag';
import { CHANNEL_FEED_PAGESIZE } from '@app/constants/pinataPagination';
import { sift, unique } from 'radash';
import { getSassyHashes, isSassy, SassyHash } from './sassyHash.api';

export interface EnhancedCastObject extends CastObject {
  amFollowing: boolean;
  authorHasPowerBadge: boolean;
  botOrNotResult: BotOrNotResult;
  isSassy: boolean;
  sassyHash?: SassyHash;
  tags: IHashTag[];
}
export interface PagedCronFeed {
  casts: EnhancedCastObject[];
  next?: { cursor: string };
}

interface ChannelFeedRequest {
  fid: number;
  channel?: ChannelObject;
  pageToken?: string;
  following: number[];
  powerBadgeUsers: number[];
}

export const getEnhancedChannelFeed = async (channelFeedRequestPayload: ChannelFeedRequest): Promise<PagedCronFeed> => {
  const { channel, fid, pageToken, following, powerBadgeUsers } = channelFeedRequestPayload;
  if (!channel) return { casts: [] };

  const cronFeed = await getCronFeed({ channelId: channel.id, pageSize: CHANNEL_FEED_PAGESIZE, pageToken });
  const seenFids = sift(cronFeed.casts.map((cast) => cast.author.fid).filter((fid) => fid !== null));
  const seenSassyHashes = unique(sift(cronFeed.casts.map((cast) => (isSassy(cast.text) ? cast.hash : null))));
  const botOrNotResponse = await getBotOrNot({ fids: seenFids ?? [] });
  const sassyHashResponse = await getSassyHashes({ fid, hashes: seenSassyHashes ?? [] });

  return {
    ...cronFeed,
    casts: cronFeed.casts.map((castObject) => ({
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
      tags: [],
    })),
  };
};
