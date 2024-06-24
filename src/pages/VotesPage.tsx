import { getFidWithFallback } from '@app/auth/fids';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import { followingByFidQuery, getVotesQuery } from '@app/queries/queries';
import { useNeynarContext } from '@neynar/react';
import { useQuery } from '@tanstack/react-query';
import { sort } from 'radash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const VotesPage: React.FC = () => {
  const { t } = useTranslation();

  const { user } = useNeynarContext();
  const fid = getFidWithFallback(user);

  const ffQuery = useQuery(followingByFidQuery(fid));
  const memodFollowing = useMemo(() => {
    if (ffQuery.isLoading || ffQuery.error) return null;
    return (ffQuery.data?.result?.users ?? []).map((l) => Number(l.fid));
  }, [ffQuery.isLoading, ffQuery.error, ffQuery.data]);

  const gvQuery = useQuery(getVotesQuery());
  const memodVotes = useMemo(() => (gvQuery.data?.results ?? []).filter((v) => v.votedFid !== fid), [fid, gvQuery]);

  const bestAccounts = sort(
    (memodVotes ?? []).filter((v) => v.action === 'upvote'),
    (v) => v.cnt,
    true,
  ).map((v) => ({
    fid: v.votedFid,
    cnt: v.cnt,
  }));
  const controversialAccounts = sort(
    (memodVotes ?? []).filter((v) => v.action === 'downvote'),
    (v) => v.cnt,
    true,
  ).map((v) => ({
    fid: v.votedFid,
    cnt: v.cnt,
  }));

  return (
    <>
      <PageTitle>{t('sidebar.votes')}</PageTitle>
      <BaseSpace direction="vertical" size="middle" style={{ display: 'flex' }}>
        <BaseRow gutter={[30, 30]}>
          <BaseCol id="top-left" xs={24} lg={12}>
            <S.Card title={t('votes.leftCardTitle')}>
              <BaseCol>
                {bestAccounts
                  .filter((ba) => !(memodFollowing ?? []).includes(ba.fid))
                  .slice(0, 5)
                  .map((a, idx) => (
                    <BaseRow key={`best-${a}-${idx}`}>
                      <span>
                        <Link to={`https://vasco.wtf/fid/${a.fid}`} target="_blank">
                          @{a.fid}
                        </Link>{' '}
                        ({a.cnt}
                        {idx === 0 ? ' 👍' : ''})
                      </span>
                      <br />
                    </BaseRow>
                  ))}
              </BaseCol>
            </S.Card>
          </BaseCol>
          <BaseCol id="top-right" xs={24} lg={12}>
            <S.Card title={t('votes.rightCardTitle')}>
              <BaseCol>
                {controversialAccounts
                  .filter((ca) => (memodFollowing ?? []).includes(ca.fid))
                  .slice(0, 5)
                  .map((a, idx) => (
                    <BaseRow key={`cont-${a}-${idx}`}>
                      <span>
                        <Link to={`https://vasco.wtf/fid/${a.fid}`} target="_blank">
                          @{a.fid}
                        </Link>{' '}
                        ({a.cnt}
                        {idx === 0 ? ' 👎' : ''})
                      </span>
                      <br />
                    </BaseRow>
                  ))}
              </BaseCol>
            </S.Card>
          </BaseCol>
        </BaseRow>
        <BaseRow gutter={[30, 30]} justify={'center'}>
          <BaseCol id="bottom-left" xs={24} lg={18}>
            <S.Card title={t('votes.title')}>
              <BaseCol>
                <BaseRow>
                  <Link to={'https://warpcast.com/artlu/0x4e64979b'} target="_blank">
                    {t('votes.cast-action')}
                  </Link>
                </BaseRow>
                <BaseRow>{t('votes.instruction')}</BaseRow>
                <BaseRow>
                  h/t{' '}
                  <Link to={'https://warpcast.com/~/channel/poop'} target="_blank">
                    /poop 💩
                  </Link>
                </BaseRow>
                <BaseRow>hmu if ur a dev interested in free access to anonymized, composable curation data</BaseRow>
              </BaseCol>
            </S.Card>
          </BaseCol>
        </BaseRow>
      </BaseSpace>
    </>
  );
};

export default VotesPage;
