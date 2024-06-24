import logo from '@app/assets/logo.png';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { channelByIdQuery } from '@app/queries/queries';
import { pinChannel, unpinChannel } from '@app/store/slices/pinnedChannelsSlice';
import { useZustand } from '@app/store/zustand';
import { BORDER_RADIUS } from '@app/styles/themes/constants';
import { useQuery } from '@tanstack/react-query';
import { PinIcon, PinOffIcon } from 'lucide-react';
import { useMemo } from 'react';
import * as S from './/ChannelLogo.styles';

export const ChannelLogo: React.FC = () => {
  const { activeChannelId } = useZustand();

  const chQuery = useQuery(channelByIdQuery(activeChannelId));
  const memodChData = useMemo(() => {
    if (chQuery.isLoading || chQuery.error) return null;
    return chQuery.data;
  }, [chQuery.isLoading, chQuery.error, chQuery.data]);

  const pinnedChannelsState = useAppSelector((state) => state.pinnedChannels);
  const pinnedChannels = pinnedChannelsState.pinnedChannels;

  const isPinned = pinnedChannels.filter((channel) => channel === activeChannelId).length > 0;

  const img = memodChData?.result?.channel?.imageUrl ?? logo;
  const channelName = memodChData?.result?.channel?.name ?? activeChannelId;

  const pinIconSize = 18;
  return (
    <S.ChannelLogoDiv>
      <S.ChannelLogoLink
        to={`https://farcaster-channels.artlu.xyz/channel-followers/${activeChannelId}.csv`}
        target="_blank"
      >
        <S.BrandSpan>
          <img src={img} alt={channelName} height={48} style={{ borderRadius: BORDER_RADIUS }} />
        </S.BrandSpan>
        {isPinned ? (
          <PinIcon
            size={pinIconSize}
            onClick={() => {
              unpinChannel(activeChannelId) && window.location.reload();
            }}
          />
        ) : (
          <PinOffIcon
            size={pinIconSize}
            onClick={() => {
              pinChannel(activeChannelId) && window.location.reload();
            }}
          />
        )}
      </S.ChannelLogoLink>
    </S.ChannelLogoDiv>
  );
};
