import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseCollapse } from '@app/components/common/BaseCollapse/BaseCollapse';
import { BurgerIcon } from '@app/components/common/Burger/BurgerIcon';
import {
  DecentBmButton,
  FcChannelsButton,
  StNSettingsButton,
  ZMSettingsButton,
} from '@app/components/header/components/HeaderButtons/HeaderButtons';
import { LAYOUT, media } from '@app/styles/themes/constants';
import { NeynarAuthButton } from '@neynar/react';
import '@neynar/react/dist/style.css';
import styled, { css } from 'styled-components';

export const HeaderActionWrapper = styled.div`
  cursor: pointer;

  & > .ant-btn > span[role='img'],
  .ant-badge {
    font-size: 1.25rem;

    @media only screen and ${media.md} {
      font-size: 1.625rem;
    }
  }

  & .ant-badge {
    display: inline-block;
  }
`;

export const DropdownCollapse = styled(BaseCollapse)`
  & > .ant-collapse-item > .ant-collapse-header {
    font-weight: 600;
    font-size: 0.875rem;

    color: var(--primary-color);

    @media only screen and ${media.md} {
      font-size: 1rem;
    }
  }

  & > .ant-collapse-item-disabled > .ant-collapse-header {
    cursor: default;

    & > span[role='img'] {
      display: none;
    }
  }
`;

export const BurgerCol = styled(BaseCol)`
  z-index: 999;
  display: flex;
`;

export const MobileBurger = styled(BurgerIcon)`
  width: 1.75rem;
  height: 1.75rem;
  margin-right: -0.5rem;
  color: var(--text-main-color);

  ${(props) =>
    props.isCross &&
    css`
      color: var(--text-secondary-color);
    `};
`;

export const SearchColumn = styled(BaseCol)`
  padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
`;

interface ProfileColumn {
  $isTwoColumnsLayout: boolean;
}

export const ProfileColumn = styled(BaseCol)<ProfileColumn>`
  @media only screen and ${media.md} {
    ${(props) =>
      props?.$isTwoColumnsLayout &&
      css`
        background-color: var(--sider-background-color);
        padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
      `}
  }
`;

export const FCButton = styled(FcChannelsButton)`
  display: block;

  @media only screen and ${media.lg} {
    display: block;
  }
`;

export const DBmButton = styled(DecentBmButton)`
  display: block;

  @media only screen and ${media.lg} {
    display: block;
  }
`;

export const ZMButton = styled(ZMSettingsButton)`
  display: none;

  @media only screen and ${media.lg} {
    display: block;
  }
`;

export const StNButton = styled(StNSettingsButton)`
  display: none;

  @media only screen and ${media.lg} {
    display: block;
  }
`;

export const SIWNButton = styled(NeynarAuthButton)`
  max-width: 160px;
  max-height: 30px;
`;
