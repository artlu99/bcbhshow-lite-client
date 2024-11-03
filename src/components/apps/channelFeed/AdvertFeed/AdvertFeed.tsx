import { EnhancedCastObject } from '@app/api/channelFeed.api';
import { FcanAd, getFcanAd } from '@app/api/fcan.api';
import { getStrictFid } from '@app/auth/fids';
import { Advert } from '@app/components/apps/channelFeed/AdvertFeed/Advert';
import { useResponsive } from '@app/hooks/useResponsive';
import { usePrivy } from '@privy-io/react-auth';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './AdvertFeed.styles';

interface AdvertFeedProps {
  casts: EnhancedCastObject[];
  children: ({ castList }: { castList: EnhancedCastObject[] }) => ReactNode;
}

export const AdvertFeed: React.FC<AdvertFeedProps> = ({ casts, children }) => {
  const [fcanAd, setFcanAd] = useState<FcanAd>();
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
  const { mobileOnly } = useResponsive();
  const { t } = useTranslation();

  const { user } = usePrivy();
  const fid = getStrictFid(user);

  useEffect(() => {
    if (!fid) return;
    getFcanAd({ fid }).then((res) => setFcanAd(res));
  }, [fid]);

  return (
    <>
      <S.TitleWrapper>
        {mobileOnly && fcanAd && (
          <S.AdvertPopover
            trigger="click"
            open={overlayOpen}
            onOpenChange={(open) => setOverlayOpen(open)}
            content={<Advert fcanAd={fcanAd} />}
          >
            <S.AdvertButton>
              {t('common.advert')}: {fcanAd ? fcanAd.head : 'BCBHShow'}
            </S.AdvertButton>
          </S.AdvertPopover>
        )}
      </S.TitleWrapper>

      <S.ContentWrapper>
        <S.FeedWrapper>{children({ castList: casts })}</S.FeedWrapper>

        {!mobileOnly && fcanAd && <Advert fcanAd={fcanAd} />}
      </S.ContentWrapper>
    </>
  );
};
