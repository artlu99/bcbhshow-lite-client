import { HubReactionsResponse, HubReactionsStreamItem, HubReactionType } from '@app/api/hubble-http-types';
import { getFidWithFallback } from '@app/auth/fids';
import { ReactionsAnalytics } from '@app/components/apps/cast/ReactionsAnalytics';
import { BaseBadge } from '@app/components/common/BaseBadge/BaseBadge';
import { BaseDivider } from '@app/components/common/BaseDivider/BaseDivider';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import { hubReactionsByFidQuery } from '@app/queries/queries';
import { BASE_COLORS } from '@app/styles/themes/constants';
import { useFarcasterSigner, usePrivy } from '@privy-io/react-auth';
import { ExternalEd25519Signer, HubRestAPIClient } from '@standard-crypto/farcaster-js';
import { useQuery } from '@tanstack/react-query';
import { BarChartBigIcon, LucideHeart, LucideMessageSquare, LucideRepeat2 } from 'lucide-react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import * as S from './Cast.styles';

const hubUrl = 'https://hub.farcaster.standardcrypto.vc:2281';

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
  target: { fid: number; hash: string };
  replies: number;
  recasts: number;
  likes: number;
  allLikooors: number[];
  setAllLikooors: Dispatch<SetStateAction<number[]>>;
  allRecastooors: number[];
  setAllRecastooors: Dispatch<SetStateAction<number[]>>;
}

export const Reactions: React.FC<ReactionsProps> = ({
  target,
  replies,
  recasts,
  likes,
  allLikooors,
  setAllLikooors,
  allRecastooors,
  setAllRecastooors,
}) => {
  const [isAnalyticsOpen, setAnalyticsOpen] = useState(false);
  const [optimisticLikes, setOptimisticLikes] = useState(0);
  const [optimisticRecasts, setOptimisticRecasts] = useState(0);

  const zenModeState = useAppSelector((state) => state.zenMode);
  const showReactions = zenModeState.showReactions;
  const showPFPs = zenModeState.showPFPs;

  const theme = useAppSelector((state) => state.theme.theme);
  const shadedColor = theme === 'dark' ? BASE_COLORS.lightgrey : showPFPs ? BASE_COLORS.lightgreen : BASE_COLORS.gray;
  const highlightedColor = theme === 'dark' ? BASE_COLORS.orange : BASE_COLORS.blue;

  const { isLandscapeMobile, isTablet, isDesktop } = useResponsive();
  const reactionBarMarginSize = isDesktop ? 60 : isTablet ? 40 : isLandscapeMobile ? 50 : 10;
  const reactionIconSize = isDesktop ? 18 : isTablet ? 24 : 24;

  const { authenticated, user: privyUser } = usePrivy();
  const user = privyUser ? privyUser.farcaster : null;
  const fid = getFidWithFallback(privyUser);

  const { getFarcasterSignerPublicKey, signFarcasterMessage } = useFarcasterSigner();
  const client = new HubRestAPIClient({ hubUrl });
  const privySigner = new ExternalEd25519Signer(signFarcasterMessage, getFarcasterSignerPublicKey);

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

  const handleLike = async (target: { fid: number; hash: string }) => {
    if (authenticated && !!user?.fid && !!user?.signerPublicKey) {
      if (isStateAdded(memodLikes ?? [], target.hash) || allLikooors.includes(user?.fid ?? -1)) {
        setOptimisticLikes(0);
        await client.removeReaction({ type: 'like', target }, user.fid, privySigner);
      } else {
        setOptimisticLikes(1);
        await client.submitReaction({ type: 'like', target }, user.fid, privySigner);
      }
    }
  };

  const handleRecast = async (target: { fid: number; hash: string }) => {
    if (authenticated && !!user?.fid && !!user?.signerPublicKey) {
      if (isStateAdded(memodRecasts ?? [], target.hash) || allRecastooors.includes(user?.fid ?? -1)) {
        setOptimisticRecasts(0);
        await client.removeReaction({ type: 'recast', target }, user.fid, privySigner);
      } else {
        setOptimisticRecasts(1);
        await client.submitReaction({ type: 'recast', target }, user.fid, privySigner);
      }
    }
  };

  const amLikooor =
    isStateAdded(memodLikes ?? [], target.hash) || optimisticLikes || allLikooors.includes(user?.fid ?? -1);
  const amRecastooor =
    isStateAdded(memodRecasts ?? [], target.hash) || optimisticRecasts || allRecastooors.includes(user?.fid ?? -1);

  return showReactions ? (
    <>
      <S.Description>
        <BaseBadge count={replies} color={shadedColor}>
          <LucideMessageSquare size={reactionIconSize} />
        </BaseBadge>
        <BaseDivider type="vertical" style={{ marginLeft: reactionBarMarginSize }} />
        <BaseBadge count={recasts + optimisticRecasts} color={amRecastooor ? highlightedColor : shadedColor}>
          <LucideRepeat2 size={reactionIconSize} onClick={() => handleRecast(target)} />
        </BaseBadge>
        <BaseDivider type="vertical" style={{ marginLeft: reactionBarMarginSize }} />
        <BaseBadge count={likes + optimisticLikes} color={amLikooor ? highlightedColor : shadedColor}>
          <LucideHeart size={reactionIconSize} onClick={() => handleLike(target)} />
        </BaseBadge>
        <BaseDivider type="vertical" style={{ marginLeft: reactionBarMarginSize }} />
        <BarChartBigIcon size={reactionIconSize * 1.2} onClick={() => setAnalyticsOpen(!isAnalyticsOpen)} />
        <BaseDivider type="vertical" style={{ marginLeft: reactionBarMarginSize }} />
      </S.Description>
      {isAnalyticsOpen && (
        <ReactionsAnalytics
          castHash={target.hash}
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
