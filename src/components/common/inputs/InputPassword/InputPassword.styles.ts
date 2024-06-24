import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import styled from 'styled-components';

export const InputPassword = styled(BaseInput.Password)`
  .ant-input-password-icon.anticon {
    color: var(--disabled-color);
    &:hover {
      color: var(--text-main-color);
    }
  }
`;
