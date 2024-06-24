import styled from 'styled-components';
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AdvertButton = styled.div`
  height: 3.125rem;
  width: 6.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background-color);
  border-radius: ${BORDER_RADIUS};
  font-size: ${FONT_SIZE.xs};
  font-weight: ${FONT_WEIGHT.semibold};
  line-height: 1.25rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.875rem;
`;

export const FeedWrapper = styled.div`
  max-width: 35rem;

  @media only screen and ${media.xs} {
    width: 100%;
  }

  @media only screen and ${media.md} {
    width: calc(100% - 21.25rem);
  }
`;

export const AdvertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: min-content;
  width: 21.25rem;
  max-width: 21.25rem;

  @media only screen and ${media.md} {
    margin-left: 1.875rem;
    position: sticky;
    top: 1.875rem;
    padding: 1.25rem 1rem;
    filter: drop-shadow(0 4px 40px rgba(0, 0, 0, 0.07));
    background: var(--background-color);
    border-radius: ${BORDER_RADIUS};
  }
`;

export const AdvertTitle = styled.div`
  display: flex;
  justify-content: center;
  line-height: 1.5625rem;
  font-size: ${FONT_SIZE.lg};
  font-weight: ${FONT_WEIGHT.bold};
  color: var(--text-main-color);
  margin-bottom: 1rem;
`;

export const AdvertPopover = styled(BasePopover)`
  & .ant-popover-inner-content {
    padding: 0;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Btn = styled(BaseButton)`
  display: block;
  width: 100%;
  font-size: ${FONT_SIZE.xxs};
`;
