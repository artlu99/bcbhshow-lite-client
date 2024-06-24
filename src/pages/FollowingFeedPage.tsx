import { getFidWithFallback } from '@app/auth/fids';
import { FollowingFeed } from '@app/components/apps/followingFeed/FollowingFeed';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useNeynarContext } from '@neynar/react';
import { useTranslation } from 'react-i18next';

const FollowingFeedPage: React.FC = () => {
  const { user } = useNeynarContext();
  const fid = getFidWithFallback(user);

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('sidebar.feed')}</PageTitle>
      <FollowingFeed fid={fid} />
    </>
  );
};

export default FollowingFeedPage;
