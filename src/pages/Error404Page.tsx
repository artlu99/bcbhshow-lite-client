import error404 from '@app/assets/images/error404.svg';
import { Error } from '@app/components/Error/Error';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';

const Error404Page: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.clientError')}</PageTitle>
      <Error img={error404} msg={t('error404.notFound')} />
    </>
  );
};

export default Error404Page;
