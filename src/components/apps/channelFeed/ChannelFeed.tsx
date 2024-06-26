import { EnhancedCastObject, getEnhancedChannelFeed } from '@app/api/channelFeed.api';
import { CastObject } from '@app/api/feed-types';
import { getFidWithFallback } from '@app/auth/fids';
import { Cast } from '@app/components/apps/cast/Cast';
import { AdvertFeed } from '@app/components/apps/channelFeed/AdvertFeed/AdvertFeed';
import { BaseEmpty } from '@app/components/common/BaseEmpty/BaseEmpty';
import { BaseFeed } from '@app/components/common/BaseFeed/BaseFeed';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { allPowerBadgeUsersQuery, channelByIdQuery, followingByFidQuery } from '@app/queries/queries';
import { useZustand } from '@app/store/zustand';
import { useNeynarContext } from '@neynar/react';
import { useQuery } from '@tanstack/react-query';
import { sift, unique } from 'radash';
import { useEffect, useMemo, useState } from 'react';

const isAllowedInMainFeed = (cast: CastObject, channelModerators: number[]) => {
  return (
    channelModerators.filter((m) => m === cast.author.fid).length > 0 ||
    cast.reactions.likes.filter((l) => channelModerators.filter((m) => m === l.fid).length > 0).length > 0
  );
};

export const ChannelFeed: React.FC = () => {
  const [allPowerBadgeUsers, setAllPowerBadgeUsers] = useState<number[]>([]);
  const [channelModerators, setChannelModerators] = useState<number[]>([]);
  const [casts, setCasts] = useState<EnhancedCastObject[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const {
    activeChannelId,
    setNumCasts,
    setNumMainFeedCasts,
    setNumFollowingCasts,
    setNumFarcaptchas,
    setNumUpvotes,
    setNumDownvotes,
    setNumCastsWithUpvotes,
    setNumCastsWithDownvotes,
    setNumCastsAboveThreshold,
    setNumCastsAfterFiltering,
    selectedLabels,
  } = useZustand();

  const signalToNoiseState = useAppSelector((state) => state.signalToNoise);
  const showMainFeed = signalToNoiseState.showMainFeed;
  const showOnlyFollowing = signalToNoiseState.showOnlyFollowing;
  const showOnlyFarcaptcha = signalToNoiseState.showOnlyFarcaptcha;
  const onlyShowUpvoted = signalToNoiseState.onlyShowUpvoted;
  const hideDownvoted = signalToNoiseState.hideDownvoted;
  const onlyShowRatioAboveThreshold = signalToNoiseState.onlyShowRatioAboveThreshold;
  const ratioThreshold = signalToNoiseState.ratioThreshold;

  const { user } = useNeynarContext();
  const fid = getFidWithFallback(user);

  const pbQuery = useQuery(allPowerBadgeUsersQuery());
  const memodPbData = useMemo(() => {
    if (pbQuery.isLoading || pbQuery.error) return null;
    return pbQuery.data;
  }, [pbQuery.isLoading, pbQuery.error, pbQuery.data]);

  const chQuery = useQuery(channelByIdQuery(activeChannelId));
  const memodChData = useMemo(() => {
    if (chQuery.isLoading || chQuery.error) return null;
    return chQuery.data;
  }, [chQuery.isLoading, chQuery.error, chQuery.data]);
  const activeChannel = memodChData?.result?.channel;

  const ffQuery = useQuery(followingByFidQuery(fid));
  const memodFfData = useMemo(() => {
    if (ffQuery.isLoading || ffQuery.error) return null;
    return (ffQuery.data?.result?.users ?? [])?.map((u) => Number(u.fid));
  }, [ffQuery.isLoading, ffQuery.error, ffQuery.data]);

  useEffect(() => {
    const allPowerBadgeUsers = memodPbData?.result.fids ?? [];
    setAllPowerBadgeUsers(allPowerBadgeUsers);
  }, [memodPbData]);

  useEffect(() => {
    setChannelModerators(unique(sift([activeChannel?.leadFid, activeChannel?.moderatorFid])));
    getEnhancedChannelFeed({
      channel: activeChannel,
      following: memodFfData ?? [],
      powerBadgeUsers: allPowerBadgeUsers,
    })
      .then((res) => {
        setCasts(res.casts);
        setNextPageToken(res.next?.cursor);
        setHasMore(!!res.next?.cursor);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [memodChData, allPowerBadgeUsers, memodFfData, activeChannel]);

  useEffect(() => {
    setNumCasts(casts.length);
    setNumMainFeedCasts(casts.filter((c) => isAllowedInMainFeed(c, channelModerators)).length);
    setNumFollowingCasts(casts.filter((c) => c.amFollowing).length);
    setNumFarcaptchas(casts.filter((c) => c.botOrNotResult.farcaptcha).length);
    setNumUpvotes(casts.reduce((acc, c) => acc + c.curation.upvotes.length, 0));
    setNumDownvotes(casts.reduce((acc, c) => acc + c.curation.downvotes.length, 0));
    setNumCastsWithUpvotes(casts.filter((c) => c.curation.upvotes.length > 0).length);
    setNumCastsWithDownvotes(casts.filter((c) => c.curation.downvotes.length > 0).length);
    setNumCastsAboveThreshold(
      casts.filter((c) => c.curation.upvotes.length / (c.curation.downvotes.length + 0.00001) > ratioThreshold).length,
    );
  }, [
    casts,
    channelModerators,
    memodFfData,
    ratioThreshold,
    setNumCasts,
    setNumCastsAboveThreshold,
    setNumCastsWithDownvotes,
    setNumCastsWithUpvotes,
    setNumDownvotes,
    setNumFarcaptchas,
    setNumFollowingCasts,
    setNumMainFeedCasts,
    setNumUpvotes,
  ]);

  const next = () =>
    getEnhancedChannelFeed({
      channel: activeChannel,
      pageToken: nextPageToken,
      following: memodFfData ?? [],
      powerBadgeUsers: allPowerBadgeUsers,
    }).then((newCasts) => {
      setNextPageToken(newCasts.next?.cursor);
      setCasts(casts.concat(newCasts.casts));
    });

  const filteredCastsList = useMemo(() => {
    const filteredCasts = casts
      .filter((c) => !showMainFeed || isAllowedInMainFeed(c, channelModerators))
      .filter((c) => !showOnlyFollowing || c.amFollowing)
      .filter((c) => !showOnlyFarcaptcha || c.botOrNotResult.farcaptcha)
      .filter((c) => !onlyShowUpvoted || c.curation.upvotes.length > 0)
      .filter((c) => (hideDownvoted ? c.curation.downvotes.length < 1 : true))
      .filter((c) =>
        onlyShowRatioAboveThreshold
          ? c.curation.upvotes.length / (c.curation.downvotes.length + 0.00001) > ratioThreshold
          : true,
      )
      .filter((c) =>
        selectedLabels.length === 0 ? true : selectedLabels.includes(c.botOrNotResult.label ?? 'missing-label'),
      )
      .map((post, index) => (
        <Cast
          level={0}
          key={`${post.hash}-top-${index}`}
          castHash={post.hash}
          title={' '}
          description={post.text}
          date={post.timestamp}
          embeds={post.embeds ?? []}
          displayName={post.author.display_name}
          fid={post.author.fid}
          fname={post.author.username ?? post.author.display_name ?? post.author.fid.toString() ?? '<unknown>'}
          avatar={post.author.pfp_url}
          parentHash={post.parent_hash}
          threadHash={post.thread_hash}
          parentUrl={post.parent_url}
          replies={post.replies.count}
          recasts={post.reactions.recasts_count}
          recastooors={post.reactions.recasts.map((r) => r.fid)}
          likes={post.reactions.likes_count}
          likooors={post.reactions.likes.map((l) => l.fid)}
          curation={post.curation}
          hasPowerBadge={post.authorHasPowerBadge}
          botOrNotResult={post.botOrNotResult}
          tags={[]}
        />
      ));
    setNumCastsAfterFiltering(filteredCasts.length);
    return filteredCasts;
  }, [
    casts,
    channelModerators,
    hideDownvoted,
    onlyShowRatioAboveThreshold,
    onlyShowUpvoted,
    ratioThreshold,
    setNumCastsAfterFiltering,
    showMainFeed,
    showOnlyFarcaptcha,
    showOnlyFollowing,
    selectedLabels,
  ]);

  return (
    <AdvertFeed casts={casts}>
      {({ castList }) =>
        castList?.length || !loaded ? (
          <BaseFeed next={next} hasMore={hasMore}>
            {filteredCastsList}
          </BaseFeed>
        ) : (
          <BaseEmpty />
        )
      }
    </AdvertFeed>
  );
};
