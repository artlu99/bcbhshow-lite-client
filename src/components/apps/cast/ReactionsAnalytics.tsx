import { getFidWithFallback } from '@app/auth/fids';
import { followingByFidQuery, reactionsByHashQuery } from '@app/queries/queries';
import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import * as S from './Cast.styles';

export interface ReactionsAnalyticsProps {
  castHash: string;
  likes: number;
  recasts: number;
  allLikooors: number[];
  setAllLikooors: Dispatch<SetStateAction<number[]>>;
  allRecastooors: number[];
  setAllRecastooors: Dispatch<SetStateAction<number[]>>;
}

export const ReactionsAnalytics: React.FC<ReactionsAnalyticsProps> = ({
  castHash,
  likes,
  recasts,
  allLikooors,
  setAllLikooors,
  allRecastooors,
  setAllRecastooors,
}) => {
  const { user } = usePrivy();
  const fid = getFidWithFallback(user);

  const lqQuery = useQuery(reactionsByHashQuery(castHash, 'likes'));
  const memodLikes = useMemo(() => {
    if (!lqQuery) return null;
    if (lqQuery.isLoading || lqQuery.error) return null;
    return (lqQuery.data?.result?.likes ?? []).map((l) => Number(l.fid));
  }, [lqQuery]);
  useEffect(() => {
    if (memodLikes) setAllLikooors(memodLikes);
  }, [memodLikes, setAllLikooors]);

  const rqQuery = useQuery(reactionsByHashQuery(castHash, 'recasters'));
  const memodRecasters = useMemo(() => {
    if (rqQuery.isLoading || rqQuery.error) return null;
    return (rqQuery.data?.result?.recasters ?? []).map((l) => Number(l.fid));
  }, [rqQuery.isLoading, rqQuery.error, rqQuery.data]);
  useEffect(() => {
    if (memodRecasters) setAllRecastooors(memodRecasters);
  }, [memodRecasters, setAllRecastooors]);

  const ffQuery = useQuery(followingByFidQuery(fid));
  const memodFollowing = useMemo(() => {
    if (ffQuery.isLoading || ffQuery.error) return null;
    return (ffQuery.data?.result?.users ?? []).map((l) => Number(l.fid));
  }, [ffQuery.isLoading, ffQuery.error, ffQuery.data]);

  const frensLikes = (allLikooors ?? []).filter((liker_fid) => (memodFollowing ?? []).includes(liker_fid)).length;
  const likesPercentage = likes ? ((frensLikes / likes) * 100).toFixed(0) : 0;

  const frensRecasts = (allRecastooors ?? []).filter((recaster_fid) =>
    (memodFollowing ?? []).includes(recaster_fid),
  ).length;
  const recastsPercentage = recasts ? ((frensRecasts / recasts) * 100).toFixed(0) : 0;

  const recastsAnalytics = `${frensRecasts} recasts by accounts I follow (${recastsPercentage}%)`;
  const likesAnalytics = `${frensLikes} likes by accounts I follow (${likesPercentage}%)`;

  return (
    <S.Description>
      {recasts ? recastsAnalytics : null} {recasts && likes ? ' | ' : null} {likes ? likesAnalytics : null}
    </S.Description>
  );
};
