import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { SettingsDropdown } from '@app/components/header/components/settingsDropdown/SettingsDropdown';
import { SignalToNoiseDropdown } from '@app/components/header/components/signalToNoiseDropdown/SignalToNoiseDropdown';
import { ZenModeDropdown } from '@app/components/header/components/zenModeDropdown/ZenModeDropdown';
import { useLocation } from 'react-router-dom';
import * as S from '../Header.styles';

interface MobileHeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSider, isSiderOpened }) => {
  const { pathname } = useLocation();
  const isHomeFeed = pathname.startsWith('/home');
  const isChannelFeed = pathname.startsWith('/~/channel/');
  const isVotePage = pathname.startsWith('/votes');

  return (
    <>
      <BaseRow justify="space-between" align="middle">
        <BaseCol>
          <S.SIWNButton />
        </BaseCol>

        <BaseCol>
          <BaseRow align="middle">
            {(isHomeFeed || isChannelFeed) && (
              <>
                <BaseCol>
                  <ZenModeDropdown />
                </BaseCol>
                <BaseCol>
                  <SignalToNoiseDropdown />
                </BaseCol>
              </>
            )}
            {isVotePage && (
              <BaseRow justify="space-between" align="middle">
                <BaseCol>
                  <S.CCAButton />
                </BaseCol>
              </BaseRow>
            )}

            <BaseCol>
              <SettingsDropdown />
            </BaseCol>
          </BaseRow>
        </BaseCol>

        <S.BurgerCol>
          <S.MobileBurger onClick={toggleSider} isCross={isSiderOpened} />
        </S.BurgerCol>
      </BaseRow>
    </>
  );
};
