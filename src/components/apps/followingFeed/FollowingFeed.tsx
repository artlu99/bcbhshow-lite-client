import { EnhancedCastObject } from '@app/api/channelFeed.api';
import { getEnhancedFollowingFeed } from '@app/api/followingFeed.api';
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

interface FollowingFeedProps {
  fid: number;
}
export const FollowingFeed: React.FC<FollowingFeedProps> = ({ fid }) => {
  const [casts, setCasts] = useState<EnhancedCastObject[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const {
    setNumCasts,
    setNumSassyCasts,
    setNumCuratedChannelsCasts,
    setNumFarcaptchas,
    setNumCastsAfterFiltering,
    selectedLabels,
  } = useZustand();

  const signalToNoiseState = useAppSelector((state) => state.signalToNoise);
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

  const { getAccessToken } = usePrivy();

  useEffect(() => {
    setCasts([]);

    getEnhancedFollowingFeed({
      fid: fid,
      getAccessToken,
      allChannels: memodChannelData ?? [],
    })
      .then((res) => {
        setCasts(res.casts);
        setNextPageToken(res.next?.cursor);
        setHasMore(!!res.next?.cursor);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [getAccessToken, fid, memodChannelData, memodFfData]);

  useEffect(() => {
    setNumCasts(casts.length);
    setNumSassyCasts(casts.filter((c) => c.isSassy).length);
    setNumCuratedChannelsCasts(casts.filter((c) => c.tags.length > 1).length);
    setNumFarcaptchas(casts.filter((c) => c.botOrNotResult.farcaptcha).length);
  }, [casts, setNumCasts, setNumSassyCasts, setNumCuratedChannelsCasts, setNumFarcaptchas]);

  const next = () =>
    getEnhancedFollowingFeed({
      fid,
      getAccessToken,
      pageToken: nextPageToken,
      allChannels: memodChannelData ?? [],
    }).then((newCasts) => {
      setNextPageToken(newCasts.next?.cursor);
      setCasts(casts.concat(newCasts.casts));
    });

  const filteredCastsList = useMemo(() => {
    const filteredCasts = casts
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
  }, [casts, setNumCastsAfterFiltering, showOnlySassy, showOnlyCuratedChannels, showOnlyFarcaptcha, selectedLabels]);

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
