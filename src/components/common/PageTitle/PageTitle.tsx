import { WithChildrenProps } from '@app/types/generalTypes';
import { Helmet } from 'react-helmet-async';

export const PageTitle: React.FC<WithChildrenProps> = ({ children }) => {
  return (
    <Helmet>
      <title>{children} | BCBHShow Lite Client 🌟</title>
    </Helmet>
  );
};
