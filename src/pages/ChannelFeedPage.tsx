import { ChannelFeed } from '@app/components/apps/channelFeed/ChannelFeed';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useZustand } from '@app/store/zustand';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const ChannelFeedPage: React.FC = () => {
  const { pathname } = useLocation();
  const { setActiveChannelId } = useZustand();

  const channelId = pathname.split('/~/channel/')[1];
  useEffect(() => {
    setActiveChannelId(channelId);
  }, [channelId, setActiveChannelId]);

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('sidebar.feed')}</PageTitle>
      {channelId ? <ChannelFeed /> : null}
    </>
  );
};

export default ChannelFeedPage;
