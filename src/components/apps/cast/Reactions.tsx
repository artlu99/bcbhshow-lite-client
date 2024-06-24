import { Curation, putCuration } from '@app/api/curation.api';
import { HubReactionType, HubReactionsResponse, HubReactionsStreamItem } from '@app/api/hubble-http-types';
import { setReactionOnHash } from '@app/api/reactionOnHash.api';
import { ReactionsAnalytics } from '@app/components/apps/cast/ReactionsAnalytics';
import { BaseBadge } from '@app/components/common/BaseBadge/BaseBadge';
import { BaseDivider } from '@app/components/common/BaseDivider/BaseDivider';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import { hubReactionsByFidQuery } from '@app/queries/queries';
import { BASE_COLORS } from '@app/styles/themes/constants';
import { useNeynarContext } from '@neynar/react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChartBigIcon,
  LucideHeart,
  LucideMessageSquare,
  LucideRepeat2,
  LucideThumbsDown,
  LucideThumbsUp,
} from 'lucide-react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import * as S from './Cast.styles';
import { getFidWithFallback } from '@app/auth/fids';

const hubReactionsToStreamItems = (reactions: HubReactionsResponse | undefined): HubReactionsStreamItem[] => {
  return (reactions?.messages ?? []).map((m) => {
    const streamItem: HubReactionsStreamItem = {
      timestamp: m?.data?.timestamp,
      hash: m?.data?.reactionBody?.targetCastId?.hash,
      reactionType: m?.data?.reactionBody?.type,
      messageType: m?.data?.type,
    };
    return streamItem;
  });
};

const isStateAdded = (stream: HubReactionsStreamItem[], hash: string): boolean => {
  // assumes stream is sorted by timestamp with newest first
  // find stops after the first match
  return !!(stream.find((item) => item.hash === hash)?.messageType === 'MESSAGE_TYPE_REACTION_ADD');
};

export interface ReactionsProps {
  castHash: string;
  castFid: number;
  replies: number;
  recasts: number;
  likes: number;
  allLikooors: number[];
  setAllLikooors: Dispatch<SetStateAction<number[]>>;
  allRecastooors: number[];
  setAllRecastooors: Dispatch<SetStateAction<number[]>>;
  curation?: { upvotes: Curation[]; downvotes: Curation[] };
}

export const Reactions: React.FC<ReactionsProps> = ({
  castHash,
  castFid,
  replies,
  recasts,
  likes,
  curation,
  allLikooors,
  setAllLikooors,
  allRecastooors,
  setAllRecastooors,
}) => {
  const [isAnalyticsOpen, setAnalyticsOpen] = useState(false);
  const [optimisticLikes, setOptimisticLikes] = useState(0);
  const [optimisticRecasts, setOptimisticRecasts] = useState(0);
  const [optimisticUpvotes, setOptimisticUpvotes] = useState(0);
  const [optimisticDownvotes, setOptimisticDownvotes] = useState(0);

  const zenModeState = useAppSelector((state) => state.zenMode);
  const showReactions = zenModeState.showReactions;
  const showPFPs = zenModeState.showPFPs;

  const theme = useAppSelector((state) => state.theme.theme);
  const shadedColor = theme === 'dark' ? BASE_COLORS.lightgrey : showPFPs ? BASE_COLORS.lightgreen : BASE_COLORS.gray;
  const highlightedColor = theme === 'dark' ? BASE_COLORS.orange : BASE_COLORS.blue;

  const { isTablet, isDesktop } = useResponsive();
  const reactionBarMarginSize = isDesktop ? 60 : isTablet ? 40 : 30;
  const reactionIconSize = isDesktop ? 18 : isTablet ? 24 : 24;

  const { user } = useNeynarContext();
  const fid = getFidWithFallback(user);

  const flQuery = useQuery(hubReactionsByFidQuery(fid, HubReactionType.LIKE));
  const memodLikes = useMemo(() => {
    if (flQuery.isLoading || flQuery.error) return null;
    return hubReactionsToStreamItems(flQuery?.data);
  }, [flQuery]);

  const frQuery = useQuery(hubReactionsByFidQuery(fid, HubReactionType.RECAST));
  const memodRecasts = useMemo(() => {
    if (frQuery.isLoading || frQuery.error) return null;
    return hubReactionsToStreamItems(frQuery?.data);
  }, [frQuery]);

  const handleLike = async (castHash: string) => {
    if (user?.fid) {
      if (isStateAdded(memodLikes ?? [], castHash) || allLikooors.includes(user?.fid ?? -1)) {
        setOptimisticLikes(0);
        await setReactionOnHash({ signerId: user.signer_uuid, hash: castHash, reactionType: 'unlike' });
      } else {
        setOptimisticLikes(1);
        await setReactionOnHash({ signerId: user.signer_uuid, hash: castHash, reactionType: 'like' });
      }
    }
  };

  const handleRecast = async (castHash: string) => {
    if (user?.fid) {
      if (isStateAdded(memodRecasts ?? [], castHash) || allRecastooors.includes(user?.fid ?? -1)) {
        setOptimisticRecasts(0);
        await setReactionOnHash({ signerId: user.signer_uuid, hash: castHash, reactionType: 'unrecast' });
      } else {
        setOptimisticRecasts(1);
        await setReactionOnHash({ signerId: user.signer_uuid, hash: castHash, reactionType: 'recast' });
      }
    }
  };

  const handleUpvote = async (castHash: string, castFid: number) => {
    if (user?.fid) {
      setOptimisticUpvotes(optimisticUpvotes + 1);
      await putCuration({ castHash, castFid, actionFid: user.fid, action: 'upvote' });
    } else {
      console.log('must be logged in to vote!');
    }
  };

  const handleDownvote = async (castHash: string, castFid: number) => {
    if (user?.fid) {
      setOptimisticDownvotes(optimisticDownvotes + 1);
      await putCuration({ castHash, castFid, actionFid: user.fid, action: 'downvote' });
    } else {
      console.log('must be logged in to vote!');
    }
  };

  const amLikooor =
    isStateAdded(memodLikes ?? [], castHash) || optimisticLikes || allLikooors.includes(user?.fid ?? -1);
  const amRecastooor =
    isStateAdded(memodRecasts ?? [], castHash) || optimisticRecasts || allRecastooors.includes(user?.fid ?? -1);
  const amUpvotooor =
    (curation?.upvotes ?? []).find((upvote) => upvote.voterFid === (user?.fid ?? -1)) || optimisticUpvotes;
  const amDownvotooor =
    (curation?.downvotes ?? []).find((downvote) => downvote.voterFid === (user?.fid ?? -1)) || optimisticDownvotes;

  return showReactions ? (
    <>
      <S.Description>
        <BaseBadge count={replies} color={shadedColor}>
          <LucideMessageSquare size={reactionIconSize} />
        </BaseBadge>
        <BaseDivider type="vertical" style={{ marginLeft: reactionBarMarginSize }} />
        <BaseBadge count={recasts + optimisticRecasts} color={amRecastooor ? highlightedColor : shadedColor}>
          <LucideRepeat2 size={reactionIconSize} onClick={() => handleRecast(castHash)} />
        </BaseBadge>
        <BaseDivider type="vertical" style={{ marginLeft: reactionBarMarginSize }} />
        <BaseBadge count={likes + optimisticLikes} color={amLikooor ? highlightedColor : shadedColor}>
          <LucideHeart size={reactionIconSize} onClick={() => handleLike(castHash)} />
        </BaseBadge>
        <BaseDivider type="vertical" style={{ marginLeft: reactionBarMarginSize }} />
        <BarChartBigIcon size={reactionIconSize * 1.2} onClick={() => setAnalyticsOpen(!isAnalyticsOpen)} />
        <BaseDivider type="vertical" style={{ marginLeft: reactionBarMarginSize }} />
        {curation ? (
          <>
            <BaseDivider type="vertical" style={{ marginLeft: reactionBarMarginSize }} />
            <BaseBadge
              count={(curation?.upvotes?.length ?? 0) + optimisticUpvotes}
              color={amUpvotooor ? highlightedColor : shadedColor}
            >
              {optimisticUpvotes ? (
                <LucideThumbsUp size={reactionIconSize} />
              ) : (
                <LucideThumbsUp size={reactionIconSize} onClick={() => handleUpvote(castHash, castFid)} />
              )}
            </BaseBadge>
            <BaseDivider type="vertical" style={{ marginLeft: reactionBarMarginSize }} />
            <BaseBadge
              count={(curation?.downvotes?.length ?? 0) + optimisticDownvotes}
              color={amDownvotooor ? highlightedColor : shadedColor}
            >
              {optimisticDownvotes ? (
                <LucideThumbsDown size={reactionIconSize} />
              ) : (
                <LucideThumbsDown size={reactionIconSize} onClick={() => handleDownvote(castHash, castFid)} />
              )}
            </BaseBadge>
          </>
        ) : null}
      </S.Description>
      {isAnalyticsOpen && (
        <ReactionsAnalytics
          castHash={castHash}
          recasts={recasts}
          likes={likes}
          allLikooors={allLikooors}
          setAllLikooors={setAllLikooors}
          allRecastooors={allRecastooors}
          setAllRecastooors={setAllRecastooors}
        />
      )}
    </>
  ) : null;
};
