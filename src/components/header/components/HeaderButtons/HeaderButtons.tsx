import { AppstoreOutlined, CompassOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { FilterIcon } from '@app/components/common/icons/FilterIcon';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { BASE_COLORS, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const FcChannelsButton: React.FC = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  return (
    <Button
      type="default"
      size="small"
      href="https://farcaster-channels.artlu.xyz"
      icon={<FcChannelsIcon />}
      target="_blank"
      $isDark={theme === 'dark'}
      {...props}
    >
      {t('buttons.farcaster-channels')}
    </Button>
  );
};

export const DecentBmButton: React.FC = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  return (
    <Button
      type="default"
      size="small"
      href="https://warpcast.com/artlu/0x732f2bd1"
      icon={<DecentBmIcon />}
      target="_blank"
      $isDark={theme === 'dark'}
      {...props}
    >
      {t('buttons.decent-bookmarks')}
    </Button>
  );
};

export const CurationButton: React.FC = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  return (
    <Button
      type="default"
      size="small"
      href="https://warpcast.com/artlu/0x4e64979b"
      icon={<CurationIcon />}
      target="_blank"
      $isDark={theme === 'dark'}
      {...props}
    >
      {t('buttons.curation-action')}
    </Button>
  );
};

export const ZMSettingsButton: React.FC = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  return (
    <Button type="text" size="small" icon={<MinusCircleOutlined />} $isDark={theme === 'dark'} {...props}>
      {t('buttons.zen-mode')}
    </Button>
  );
};

export const StNSettingsButton: React.FC = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  return (
    <Button type="text" size="small" icon={<FilterIcon />} $isDark={theme === 'dark'} {...props}>
      {t('buttons.signal-to-noise')}
    </Button>
  );
};

const Button = styled(BaseButton)<{ $isDark: boolean }>`
  font-weight: ${FONT_WEIGHT.regular};
  font-size: ${FONT_SIZE.md};
  color: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'black']};
  background: ${(props) => BASE_COLORS[props.$isDark ? 'black' : 'white']};
  border-radius: ${BORDER_RADIUS};
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => BASE_COLORS[props.$isDark ? 'black' : 'white']};
    background: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'black']};
  }
`;

const FcChannelsIcon = styled(CompassOutlined)`
  font-size: 1.5rem;
  vertical-align: middle;
`;

const DecentBmIcon = styled(AppstoreOutlined)`
  // font-size: 1.5rem;
  vertical-align: middle;
`;

const CurationIcon = styled(AppstoreOutlined)`
  // font-size: 1.5rem;
  vertical-align: middle;
`;
