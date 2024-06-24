import { Bookmarks } from '@app/components/apps/bookmarks/Bookmarks';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';

const BookmarksPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('sidebar.bookmarks')}</PageTitle>
      <Bookmarks />
    </>
  );
};

export default BookmarksPage;
