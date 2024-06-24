import { useTranslation } from 'react-i18next';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './AdvertFeed.styles';
import { FcanAd } from '@app/api/fcan.api';
import { Card } from '@app/pages/uiComponentsPages/UIComponentsPage.styles';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { setShowAds, setHideAds } from '@app/store/slices/showHidesSlice';

interface Advert {
  fcanAd: FcanAd;
}

const openInNewTab = (url: string | undefined) => {
  if (url) window.open(url, '_blank', 'noopener noreferrer');
};

export const Advert: React.FC<Advert> = (advert) => {
  const { t } = useTranslation();
  const { mobileOnly } = useResponsive();
  const dispatch = useAppDispatch();
  const showAds = useAppSelector((state) => state.showHides.showAds);

  return (
    <S.AdvertWrapper>
      {!mobileOnly && (
        <S.AdvertTitle>{showAds ? `${t('common.advert')}: ${advert.fcanAd.head}` : t('fcan.adsHidden')}</S.AdvertTitle>
      )}
      <Card>{showAds ? advert.fcanAd.text : `<${t('fcan.reserved')}>`}</Card>
      <S.BtnWrapper>
        {showAds ? (
          <>
            {advert.fcanAd.attribUrl ? (
              <S.Btn onClick={() => openInNewTab(`https://fcan.xyz/r?id=${advert.fcanAd.id}`)} type="primary">
                {t('fcan.clickWithRewards')}
              </S.Btn>
            ) : (
              <S.Btn onClick={() => openInNewTab(advert.fcanAd.displayUrl)}>{t('fcan.clickWithoutTracking')}</S.Btn>
            )}
            <S.Btn onClick={() => dispatch(setHideAds())}>{t('fcan.hideAds')}</S.Btn>
          </>
        ) : (
          <S.Btn onClick={() => dispatch(setShowAds())}>{t('fcan.showAds')}</S.Btn>
        )}
      </S.BtnWrapper>
    </S.AdvertWrapper>
  );
};
