import { Slider as AntdSlider } from 'antd';
import styled from 'styled-components';

export const Slider = styled(AntdSlider)`
  & .ant-slider-mark-text:not(.ant-slider-mark-text-active) {
    color: var(--subtext-color);
  }
`;
