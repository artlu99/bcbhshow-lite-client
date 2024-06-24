import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { animatedShowLogo } from '@app/constants/bcbhshowAssets';
import { BaseDivider } from '@app/components/common/BaseDivider/BaseDivider';

const seasonOne = [
  {
    username: 'farchiver',
    sponsor: 'Farchiver',
    url: 'https://farchiver.xyz',
    pfp: 'https://i.imgur.com/e2TcmDN.png',
  },
  {
    username: 'farchiver',
    sponsor: 'Farchiver',
    url: 'https://farchiver.xyz',
    pfp: 'https://i.imgur.com/e2TcmDN.png',
  },
  {
    username: 'beecurious',
    sponsor: '/farcastea',
    url: 'https://farcastea.xyz',
    pfp: 'https://i.imgur.com/HTCi4oR.jpg',
  },
  {
    username: 'proxystudio.eth',
    sponsor: '/openventures',
    url: 'https://warpcast.com/~/channel/openventures',
    pfp: 'https://i.imgur.com/Ut3XLfb.gif',
  },
  {
    username: 'borodutch',
    sponsor: 'WDLATY',
    url: 'https://book.borodutch.com',
    pfp: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/8636a84e-65a4-4b0e-ea5f-4d0a9f1c6000/original',
  },
  {
    username: 'farchiver',
    sponsor: 'Farchiver',
    url: 'https://farchiver.xyz',
    pfp: 'https://i.imgur.com/e2TcmDN.png',
  },
];
const seasonTwo = [
  {
    username: 'poidh',
    sponsor: 'POIDH Community',
    url: 'https://poidh.xyz/degen/bounty/325',
    pfp: 'https://i.imgur.com/Pr8nzyn.png',
  },
  {
    username: 'farchiver',
    sponsor: 'Farchiver',
    url: 'https://farchiver.xyz',
    pfp: 'https://i.imgur.com/e2TcmDN.png',
  },
];
const Text = styled.span`
  color: var(--text-main-color);
  font-size: ${FONT_SIZE.xs};
  font-weight: ${FONT_WEIGHT.regular};
`;
const LinkText = styled(Text)`
  text-decoration: underline;
  color: var(--primary-color);
`;

const SponsorshipPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('sidebar.sponsorship')}</PageTitle>
      <BaseSpace direction="vertical" size="middle" style={{ display: 'flex' }}>
        <BaseRow gutter={[30, 30]}>
          <BaseCol id="top-left" xs={24} lg={12}>
            <S.Card title={t('sponsorship.leftCardTitle')}>
              <div>
                <BaseSpace wrap>{t('sponsorship.leftCardPre')}</BaseSpace>
                <BaseImage src={animatedShowLogo} />
                <BaseSpace wrap>{t('sponsorship.leftCardPost')}</BaseSpace>
                <br />
                <br />
                <BaseSpace wrap>{t('sponsorship.everything')}</BaseSpace>{' '}
                <BaseSpace wrap>{t('sponsorship.unlonely')}</BaseSpace>
                <br />
                <BaseSpace wrap>{t('sponsorship.episodes')}</BaseSpace>
                <br />
                <BaseSpace wrap>{t('sponsorship.clips')}</BaseSpace>{' '}
                <BaseSpace wrap>{t('sponsorship.transcripts')}</BaseSpace>
              </div>
            </S.Card>
          </BaseCol>
          <BaseCol id="top-right" xs={24} lg={12}>
            <S.Card title={t('sponsorship.rightCardTitle')}>
              <BaseSpace direction="vertical" wrap>
                {seasonOne.map((sponsor, idx) => (
                  <BaseRow gutter={[30, 30]} key={`season-1-sponsor-${idx}`}>
                    <Link to={`https://farcaster.id/${sponsor.username}`} target={'_blank'}>
                      <BaseAvatar src={sponsor.pfp} alt={`@${sponsor.username}`} shape="circle" />
                    </Link>
                    {'   '}
                    <Link to={sponsor.url} target={'_blank'}>
                      <LinkText>{sponsor.sponsor}</LinkText>
                    </Link>
                    <br />
                  </BaseRow>
                ))}
                <BaseDivider />
                {seasonTwo.map((sponsor, idx) => (
                  <BaseRow gutter={[30, 30]} key={`season-2-sponsor-${idx}`}>
                    <Link to={`https://farcaster.id/${sponsor.username}`} target={'_blank'}>
                      <BaseAvatar src={sponsor.pfp} alt={`@${sponsor.username}`} shape="circle" />
                    </Link>
                    {'   '}
                    <Link to={sponsor.url} target={'_blank'}>
                      <LinkText>{sponsor.sponsor}</LinkText>
                    </Link>
                    <br />
                  </BaseRow>
                ))}
              </BaseSpace>
            </S.Card>
          </BaseCol>
        </BaseRow>
      </BaseSpace>
    </>
  );
};

export default SponsorshipPage;
