import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { HeaderFullscreen } from '@app/components/header/components/HeaderFullscreen/HeaderFullscreen';
import { HeaderSignalToNoise } from '@app/components/header/components/HeaderSignalToNoise/HeaderSignalToNoise';
import { SettingsDropdown } from '@app/components/header/components/settingsDropdown/SettingsDropdown';
import { BotOrNotLabelsDropdown } from '@app/components/header/components/signalToNoiseDropdown/signalToNoiseOverlay/BotOrNotLabelsDropdown';
import { ChannelLogo } from '@app/components/header/layouts/ChannelLogo';
import { useLocation } from 'react-router-dom';
import * as S from '../Header.styles';

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isTwoColumnsLayout }) => {
  const { pathname } = useLocation();
  const isHomeFeed = pathname.startsWith('/home');
  const isChannelFeed = pathname.startsWith('/~/channel/');
  const isDecentBookmarksPage = pathname.startsWith('/external/decent-bookmarks');
  const isVotePage = pathname.startsWith('/votes');

  const leftSide = isTwoColumnsLayout ? (
    <S.SearchColumn xl={16} xxl={17}>
      <BaseRow justify="space-between">
        {(isHomeFeed || isChannelFeed) && (
          <BaseCol>
            <HeaderSignalToNoise />
          </BaseCol>
        )}
        {isDecentBookmarksPage && (
          <BaseCol>
            <S.DBmButton />
          </BaseCol>
        )}
        <BaseCol>
          <S.FCButton />
        </BaseCol>
      </BaseRow>
    </S.SearchColumn>
  ) : (
    <>
      {(isHomeFeed || isChannelFeed) && (
        <>
          <BaseCol>
            <HeaderSignalToNoise />
          </BaseCol>
          <BaseCol>
            <BotOrNotLabelsDropdown />
          </BaseCol>
        </>
      )}
      {isDecentBookmarksPage && (
        <BaseCol>
          <S.DBmButton />
        </BaseCol>
      )}
      <BaseCol>
        {isChannelFeed ? <ChannelLogo /> : isHomeFeed ? <S.CCAButton /> : isVotePage ? <S.CCAButton /> : <S.FCButton />}
      </BaseCol>
    </>
  );

  return (
    <BaseRow justify="space-between" align="middle">
      {leftSide}

      <S.ProfileColumn xl={8} xxl={7} $isTwoColumnsLayout={isTwoColumnsLayout}>
        <BaseRow align="middle" justify="end" gutter={[5, 5]}>
          <BaseCol>
            <BaseRow gutter={[{ xxl: 5 }, { xxl: 5 }]}>
              <BaseCol>
                <HeaderFullscreen />
              </BaseCol>

              <BaseCol>
                <SettingsDropdown />
              </BaseCol>
            </BaseRow>
          </BaseCol>

          <BaseCol>
            <S.SIWNButton />
          </BaseCol>
        </BaseRow>
      </S.ProfileColumn>
    </BaseRow>
  );
};
