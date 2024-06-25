import { getFidWithFallback } from '@app/auth/fids';
import { ForYouFeed } from '@app/components/apps/forYouFeed/ForYouFeed';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useNeynarContext } from '@neynar/react';
import { useTranslation } from 'react-i18next';

const ForYouFeedPage: React.FC = () => {
  const { user } = useNeynarContext();
  const fid = getFidWithFallback(user);

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('sidebar.foryou')}</PageTitle>
      <ForYouFeed fid={fid} />
    </>
  );
};

export default ForYouFeedPage;
