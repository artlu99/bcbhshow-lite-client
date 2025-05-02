import { Radio as AntdRadio } from 'antd';
import styled from 'styled-components';

export const Radio = styled(AntdRadio)`
  .ant-radio-disabled + span {
    color: var(--disabled-color);
  }
`;

export const RadioButton = styled(AntdRadio.Button)`
  &.ant-radio-button-wrapper-disabled {
    color: var(--disabled-color);
  }
`;
