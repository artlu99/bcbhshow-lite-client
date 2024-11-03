import { EnhancedCastObject } from '@app/api/channelFeed.api';
import { getEnhancedForYouFeed } from '@app/api/forYouFeed.api';
import { Cast } from '@app/components/apps/cast/Cast';
import { AdvertFeed } from '@app/components/apps/channelFeed/AdvertFeed/AdvertFeed';
import { BaseEmpty } from '@app/components/common/BaseEmpty/BaseEmpty';
import { BaseFeed } from '@app/components/common/BaseFeed/BaseFeed';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { allChannelsQuery, followingByFidQuery } from '@app/queries/queries';
import { useZustand } from '@app/store/zustand';
import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

interface ForYouFeedProps {
  fid: number;
}
export const ForYouFeed: React.FC<ForYouFeedProps> = ({ fid }) => {
  const [casts, setCasts] = useState<EnhancedCastObject[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const {
    setNumCasts,
    setNumFollowingCasts,
    setNumSassyCasts,
    setNumCuratedChannelsCasts,
    setNumFarcaptchas,
    setNumCastsAfterFiltering,
    selectedLabels,
  } = useZustand();

  const signalToNoiseState = useAppSelector((state) => state.signalToNoise);
  const showOnlyFollowing = signalToNoiseState.showOnlyFollowing;
  const showOnlySassy = signalToNoiseState.showOnlySassy;
  const showOnlyCuratedChannels = signalToNoiseState.showOnlyCuratedChannels;
  const showOnlyFarcaptcha = signalToNoiseState.showOnlyFarcaptcha;

  const chQuery = useQuery(allChannelsQuery());
  const memodChannelData = useMemo(() => {
    if (chQuery.isLoading || chQuery.error) return null;
    return chQuery?.data?.result?.channels ?? [];
  }, [chQuery.isLoading, chQuery.error, chQuery.data]);

  const ffQuery = useQuery(followingByFidQuery(fid));
  const memodFfData = useMemo(() => {
    if (ffQuery.isLoading || ffQuery.error) return null;
    return (ffQuery.data?.result?.users ?? []).map((u) => Number(u.fid));
  }, [ffQuery.isLoading, ffQuery.error, ffQuery.data]);

  const { authenticated } = usePrivy();

  useEffect(() => {
    setCasts([]);

    getEnhancedForYouFeed({
      fid: fid,
      authenticated,
      following: memodFfData ?? [],
      allChannels: memodChannelData ?? [],
    })
      .then((res) => {
        setCasts(res.casts);
        setNextCursor(res.next?.cursor);
        setHasMore(!!res.next?.cursor);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [fid, authenticated, memodChannelData, memodFfData]);

  useEffect(() => {
    setNumCasts(casts.length);
    setNumFollowingCasts(casts.filter((c) => c.amFollowing).length);
    setNumSassyCasts(casts.filter((c) => c.isSassy).length);
    setNumCuratedChannelsCasts(casts.filter((c) => c.tags.length > 1).length);
    setNumFarcaptchas(casts.filter((c) => c.botOrNotResult.farcaptcha).length);
  }, [casts, setNumCasts, setNumFollowingCasts, setNumSassyCasts, setNumCuratedChannelsCasts, setNumFarcaptchas]);

  const next = () =>
    getEnhancedForYouFeed({
      fid: fid,
      authenticated,
      cursor: nextCursor,
      following: memodFfData ?? [],
      allChannels: memodChannelData ?? [],
    }).then((newCasts) => {
      setNextCursor(newCasts.next?.cursor);
      setCasts(casts.concat(newCasts.casts));
    });

  const filteredCastsList = useMemo(() => {
    const filteredCasts = casts
      .filter((c) => !showOnlyFollowing || c.amFollowing)
      .filter((c) => !showOnlySassy || c.isSassy)
      .filter((c) => !showOnlyCuratedChannels || c.tags.length > 1)
      .filter((c) => !showOnlyFarcaptcha || c.botOrNotResult.farcaptcha)
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
          parentUrl={post.parent_url ?? undefined}
          replies={post.replies?.count ?? 0}
          recasts={post.reactions?.recasts_count ?? 0}
          recastooors={post.reactions?.recasts.map((r) => r.fid) ?? []}
          likes={post.reactions?.likes_count ?? 0}
          likooors={post.reactions?.likes.map((l) => l.fid) ?? []}
          tags={post.tags}
          botOrNotResult={post.botOrNotResult}
          sassyHash={post.sassyHash}
        />
      ));
    setNumCastsAfterFiltering(filteredCasts.length);
    return filteredCasts;
  }, [
    casts,
    setNumCastsAfterFiltering,
    showOnlyFollowing,
    showOnlySassy,
    showOnlyCuratedChannels,
    showOnlyFarcaptcha,
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
