import {
  BlockOutlined,
  CheckCircleOutlined,
  CompassOutlined,
  LayoutOutlined,
  MinusCircleOutlined,
  RightOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { HubReactionType } from '@app/api/hubble-http-types';
import { getFidWithFallback } from '@app/auth/fids';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseDivider } from '@app/components/common/BaseDivider/BaseDivider';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BaseTree } from '@app/components/common/BaseTree/BaseTree';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import {
  allChannelsQuery,
  allPowerBadgeUsersQuery,
  botOrNotLabelsQuery,
  channelByIdQuery,
  followingByFidQuery,
  getVotesQuery,
  hubReactionsByFidQuery,
  userFollowingChannelsQuery,
} from '@app/queries/queries';
import { useNeynarContext } from '@neynar/react';
import { useQueryClient } from '@tanstack/react-query';
import { MegaphoneIcon, PinIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useNeynarContext();
  const fid = getFidWithFallback(user);

  const client = useQueryClient();
  client.prefetchQuery(allPowerBadgeUsersQuery());
  client.prefetchQuery(channelByIdQuery());
  client.prefetchQuery(allChannelsQuery());
  client.prefetchQuery(userFollowingChannelsQuery(fid));
  client.prefetchQuery(followingByFidQuery(fid));
  client.prefetchQuery(hubReactionsByFidQuery(fid, HubReactionType.LIKE));
  client.prefetchQuery(hubReactionsByFidQuery(fid, HubReactionType.RECAST));
  client.prefetchQuery(botOrNotLabelsQuery());
  client.prefetchQuery(getVotesQuery());

  return (
    <>
      <PageTitle>{t('common.landing')}</PageTitle>
      <BaseSpace direction="vertical" size="middle" style={{ display: 'flex' }}>
        <BaseRow gutter={[30, 30]}>
          <BaseCol id="top-left" xs={24} lg={12}>
            <S.Card title={t('landingPage.leftCardTitle')}>
              Curation cast action:{' '}
              <Link to={'https://warpcast.com/artlu/0x4e64979b'} target="_blank">
                https://warpcast.com/artlu/0x4e64979b
              </Link>
              <BaseTree
                autoExpandParent={true}
                expandedKeys={['zen-mode', 'channels']}
                showLine={true}
                showIcon={true}
                switcherIcon={<RightOutlined />}
                treeData={[
                  {
                    title: <Link to="/votes">up/down community curation 👍 / 👎</Link>,
                    key: 'cast-action',
                    icon: <MegaphoneIcon />,
                  },
                  {
                    title: <span>channel-centric UX</span>,
                    key: 'channels',
                    icon: <PinIcon size={14} />,
                    children: [
                      {
                        title: <Link to="/curated-channels">curated cozy channels</Link>,
                        key: 'cozy',
                        icon: <CheckCircleOutlined />,
                      },
                      {
                        title: (
                          <span>
                            fast channel search, incl. <i>new channels</i>
                          </span>
                        ),
                        key: 'farcaster-channels',
                        icon: <CompassOutlined />,
                      },
                    ],
                  },
                  {
                    title: <Link to="/external/decent-bookmarks">Decent Bookmarks: cross-client + portable</Link>,
                    key: 'decent-bookmarks',
                    icon: <LayoutOutlined />,
                  },
                  {
                    title: <Link to={'/home'}>Zen mode toggles</Link>,
                    key: 'zen-mode',
                    icon: <MinusCircleOutlined />,
                    children: [
                      {
                        title: (
                          <span>
                            displaynames + PFPs hidden <i>by default</i>
                          </span>
                        ),
                        key: 'pfp',
                      },
                      {
                        title: (
                          <span>
                            🤖 bot-or-not shown in feed <i>by default</i>
                          </span>
                        ),
                        key: 'bot-or-not',
                      },
                    ],
                  },
                  {
                    title: <span>native Japanese, Spanish, German 🌐</span>,
                    key: 'i18n',
                    icon: <SettingOutlined />,
                  },
                  {
                    title: <span>FOSS 💜 + freemium model</span>,
                    key: 'foss',
                    icon: <BlockOutlined />,
                  },
                ]}
              />
            </S.Card>
          </BaseCol>
          <BaseCol id="top-right" xs={24} lg={12}>
            <S.Card title={t('landingPage.rightCardTitle')}>
              6/11/2024
              <br />
              Zenigame's
              <Link to={`https://fcshelf.zenigame.net/${fid}`} target="_blank">
                viewer
              </Link>
              for other people's followed channels
              <br />
              <Link to={'https://warpcast.com/leeknowlton.eth/0xb965d75c'} target="_blank">
                https://warpcast.com/leeknowlton.eth/0xb965d75c
              </Link>
            </S.Card>
          </BaseCol>
        </BaseRow>
        <BaseRow gutter={[30, 30]} justify={'center'}>
          <BaseCol id="bottom-left" xs={24} lg={18}>
            <S.Card title={t('landingPage.bottomCardTitle')}>
              <div>
                <BaseSpace wrap>
                  Muchas gracias a
                  <Link to={`https://farcaster.id/vale-parody`} target={'_blank'}>
                    @vale-parody
                  </Link>
                  por su ayuda y apoyo!
                </BaseSpace>
                <BaseDivider />
                <BaseSpace wrap>
                  <Link to={`https://farcaster.id/wakkin`} target={'_blank'}>
                    @wakkin
                  </Link>{' '}
                  さん、サポートしていただき本当にありがとうございます!
                </BaseSpace>
                <BaseDivider />
                <BaseSpace>
                  <Link to={`https://farcaster.id/luca1111`} target={'_blank'}>
                    @luca1111
                  </Link>{' '}
                  スクリーンショット付きのNotionドキュメントを含む追加のサポートを提供します。(また、校正等追加のサポートを提供してくれた
                  @Luca1111 に感謝します。)
                </BaseSpace>
              </div>
            </S.Card>
          </BaseCol>
        </BaseRow>
      </BaseSpace>
    </>
  );
};

export default LandingPage;
