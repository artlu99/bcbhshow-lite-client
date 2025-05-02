import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { media } from '@app/styles/themes/constants';
import styled from 'styled-components';

export const BaseFormTitle = styled(BaseTypography.Text)`
  font-weight: 700;
  font-size: 1rem;
  display: block;

  @media only screen and ${media.md} {
    font-size: 1.125rem;
  }
`;
