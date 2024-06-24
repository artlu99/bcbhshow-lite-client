import { getAllChannels } from '@app/api/allChannels.api';
import { getBotOrNotLabels } from '@app/api/botOrNot.api';
import { getCastByHash } from '@app/api/castByHash.api';
import { getChannelById } from '@app/api/channelById.api';
import { getVotes } from '@app/api/curation.api';
import { getFollowingByFid } from '@app/api/followingByFid.api';
import { getHubReactionsByFid } from '@app/api/hubReactionsByFid.api';
import { HubReactionType } from '@app/api/hubble-http-types';
import { getMetadata } from '@app/api/metadata.api';
import { getAllPowerBadgeUsers } from '@app/api/powerbadge.api';
import { getReactionsByHash } from '@app/api/reactionsByHash.api';
import { getUserFollowingChannels } from '@app/api/userFollowingChannels.api';
import { defaultChannelId } from '@app/constants/config/config';
import { queryOptions } from '@tanstack/react-query';

const defaultFid = import.meta.env.REACT_APP_DEFAULT_FID as number;

export const allPowerBadgeUsersQuery = () =>
  queryOptions({
    meta: { persist: true },
    queryKey: ['allPowerBadgeUsers'],
    queryFn: () => getAllPowerBadgeUsers({ empty: undefined }),
    staleTime: 2 * 60 * 60 * 1000, // 2 hours
  });

export const allChannelsQuery = () =>
  queryOptions({
    meta: { persist: true },
    queryKey: ['allChannels'],
    queryFn: () => getAllChannels(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });

export const channelByIdQuery = (channelId?: string) =>
  queryOptions({
    meta: { persist: true },
    queryKey: ['channelById', { channelId }],
    queryFn: () => getChannelById({ channelId: channelId ?? defaultChannelId }),
    staleTime: 2 * 60 * 60 * 1000, // 2 hours
  });

export const userFollowingChannelsQuery = (fid?: number) =>
  queryOptions({
    meta: { persist: true },
    queryKey: ['userFollowingChannels', { fid }],
    queryFn: () => getUserFollowingChannels({ fid: fid ?? defaultFid }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

export const followingByFidQuery = (fid?: number) =>
  queryOptions({
    meta: { persist: true },
    queryKey: ['followingByFid', { fid }],
    queryFn: () => getFollowingByFid({ fid: fid ?? defaultFid }),
    staleTime: 20 * 60 * 1000, // 20 minutes
  });

export const castByHashQuery = (hash: string) =>
  queryOptions({
    meta: { persist: true },
    queryKey: ['castByHash', { hash }],
    queryFn: () => getCastByHash({ hash }),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

export const metadataQuery = (url: string) =>
  queryOptions({
    meta: { persist: true },
    queryKey: ['metadata', { url }],
    queryFn: () => getMetadata({ url }),
    staleTime: 2 * 24 * 60 * 60 * 1000, // 2 days
  });

export const hubReactionsByFidQuery = (fid: number, reactionType: HubReactionType) =>
  queryOptions({
    meta: { persist: true },
    queryKey: ['reactionsByFid', { fid, reactionType }],
    queryFn: () => getHubReactionsByFid({ fid, reactionType, pageSize: 100 }),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

export const reactionsByHashQuery = (hash: string, type: 'likes' | 'recasters') =>
  queryOptions({
    meta: { persist: true },
    queryKey: ['reactionsByHash', { hash, type }],
    queryFn: () => getReactionsByHash({ hash, type }),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

export const botOrNotLabelsQuery = () =>
  queryOptions({
    meta: { persist: true },
    queryKey: ['botOrNotLabels'],
    queryFn: () => getBotOrNotLabels(),
    staleTime: 2 * 24 * 60 * 60 * 1000, // 2 days
  });

export const getVotesQuery = () =>
  queryOptions({
    meta: { persist: true },
    queryKey: ['getVotes'],
    queryFn: () => getVotes(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
