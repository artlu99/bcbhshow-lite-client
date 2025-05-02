import { Tabs as AntdTabs } from 'antd';
import styled from 'styled-components';

export const Tabs = styled(AntdTabs)`
  .ant-tabs-tab.ant-tabs-tab-disabled {
    color: var(--disabled-color);
  }
`;
