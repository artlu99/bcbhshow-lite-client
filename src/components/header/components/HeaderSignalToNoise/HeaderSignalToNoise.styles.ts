import styled from 'styled-components';
import { FilterIcon } from '@app/components/common/icons/FilterIcon';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { SuffixInput } from '@app/components/common/inputs/SuffixInput/SuffixInput';
import { BORDER_RADIUS, media } from '@app/styles/themes/constants';

export const SignalToNoiseIcon = styled(FilterIcon)`
  &.anticon.anticon-filter {
    display: block;
    font-size: 1.25rem;

    @media only screen and ${media.md} {
      font-size: 1.625rem;
    }
  }
`;

export const InputSignalToNoise = styled(SuffixInput)`
  .ant-input-group-addon {
    display: none;
  }

  @media only screen and ${media.md} {
    .ant-input-group .ant-input-affix-wrapper:not(:last-child) {
      border-radius: ${BORDER_RADIUS};
      border: 0;
      padding: 0.5625rem 1.25rem;
    }
  }
`;

export const SignalToNoiseModal = styled(BaseModal)`
  border-radius: ${BORDER_RADIUS};

  & .ant-modal-body {
    padding: 0;
  }
`;

export const Btn = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
