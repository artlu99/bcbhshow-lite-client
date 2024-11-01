import { BaseDivider } from '@app/components/common/BaseDivider/BaseDivider';
import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import {
  setShowMainFeed,
  setShowOnlyCuratedChannels,
  setShowOnlyFarcaptcha,
  setShowOnlyFollowing,
  setShowOnlySassy,
  unsetShowMainFeed,
  unsetShowOnlyCuratedChannels,
  unsetShowOnlyFarcaptcha,
  unsetShowOnlyFollowing,
  unsetShowOnlySassy,
} from '@app/store/slices/signalToNoiseSlice';
import { useZustand } from '@app/store/zustand';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const FeedSettings: React.FC = () => {
  const { pathname } = useLocation();
  const isHomeFeed = pathname.startsWith('/home');
  const isForYouFeed = pathname.startsWith('/foryou');
  const { t } = useTranslation();

  const {
    numCasts,
    numMainFeedCasts,
    numFollowingCasts,
    numSassyCasts,
    numCuratedChannelsCasts,
    numFarcaptchas,
    numCastsAfterFiltering,
  } = useZustand();

  const dispatch = useAppDispatch();
  const signalToNoiseState = useAppSelector((state) => state.signalToNoise);
  const showMainFeed = signalToNoiseState.showMainFeed;
  const showOnlyFollowing = signalToNoiseState.showOnlyFollowing;
  const showOnlySassy = signalToNoiseState.showOnlySassy;
  const showOnlyCuratedChannels = signalToNoiseState.showOnlyCuratedChannels;
  const showOnlyFarcaptcha = signalToNoiseState.showOnlyFarcaptcha;

  const handleChangeMainFeed = (showMainFeed: boolean) => {
    dispatch(showMainFeed ? setShowMainFeed() : unsetShowMainFeed());
  };
  const handleChangeOnlyFollowing = (showOnlyFollowing: boolean) => {
    dispatch(showOnlyFollowing ? setShowOnlyFollowing() : unsetShowOnlyFollowing());
  };
  const handleChangeOnlySassy = (showOnlySassy: boolean) => {
    dispatch(showOnlySassy ? setShowOnlySassy() : unsetShowOnlySassy());
  };
  const handleChangeOnlyCuratedChannels = (showOnlyCuratedChannels: boolean) => {
    dispatch(showOnlyCuratedChannels ? setShowOnlyCuratedChannels() : unsetShowOnlyCuratedChannels());
  };
  const handleChangeOnlyFarcaptcha = (showOnlyFarcaptcha: boolean) => {
    dispatch(showOnlyFarcaptcha ? setShowOnlyFarcaptcha() : unsetShowOnlyFarcaptcha());
  };

  return (
    <>
      {numCasts} Casts pulled from Protocol
      <br />
      {numCastsAfterFiltering} Casts after filtering
      <BaseDivider />
      {isHomeFeed ? (
        <>
          <SwitchContainer>
            <span>{t('Only Curated Channels')}</span> {numCuratedChannelsCasts}
            <BaseSwitch
              checkedChildren={t('On')}
              unCheckedChildren={t('Off')}
              checked={showOnlyCuratedChannels}
              onChange={handleChangeOnlyCuratedChannels}
            />
          </SwitchContainer>
          <BaseDivider />
        </>
      ) : isForYouFeed ? (
        <>
          <SwitchContainer>
            <span>{t('Only Following')}</span> {numFollowingCasts}
            <BaseSwitch
              checkedChildren={t('On')}
              unCheckedChildren={t('Off')}
              checked={showOnlyFollowing}
              onChange={handleChangeOnlyFollowing}
            />
          </SwitchContainer>
          <br />
          <SwitchContainer>
            <span>{t('Only Curated Channels')}</span> {numCuratedChannelsCasts}
            <BaseSwitch
              checkedChildren={t('On')}
              unCheckedChildren={t('Off')}
              checked={showOnlyCuratedChannels}
              onChange={handleChangeOnlyCuratedChannels}
            />
          </SwitchContainer>
          <BaseDivider />
        </>
      ) : (
        <>
          <SwitchContainer>
            <span>{t('Main Feed')}</span> {numMainFeedCasts}
            <BaseSwitch
              checkedChildren={t('On')}
              unCheckedChildren={t('Off')}
              checked={showMainFeed}
              onChange={handleChangeMainFeed}
            />
          </SwitchContainer>
          <br />
          <SwitchContainer>
            <span>{t('Only Following')}</span> {numFollowingCasts}
            <BaseSwitch
              checkedChildren={t('On')}
              unCheckedChildren={t('Off')}
              checked={showOnlyFollowing}
              onChange={handleChangeOnlyFollowing}
            />
          </SwitchContainer>
          <BaseDivider />
          <SwitchContainer>
            <span>{t('Only Sassy')}</span> {numSassyCasts}
            <BaseSwitch
              checkedChildren={t('On')}
              unCheckedChildren={t('Off')}
              checked={showOnlySassy}
              onChange={handleChangeOnlySassy}
            />
          </SwitchContainer>
          <BaseDivider />
        </>
      )}
      <SwitchContainer>
        <span>{t('Farcaptcha')}</span> {numFarcaptchas}
        <BaseSwitch
          checkedChildren={t('On')}
          unCheckedChildren={t('Off')}
          checked={showOnlyFarcaptcha}
          onChange={handleChangeOnlyFarcaptcha}
        />
      </SwitchContainer>
    </>
  );
};

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
