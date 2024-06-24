import { BaseDivider } from '@app/components/common/BaseDivider/BaseDivider';
import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import {
  setHideDownvoted,
  setOnlyShowRatioAboveThreshold,
  setOnlyShowUpvoted,
  setRatioThreshold,
  setShowMainFeed,
  setShowOnlyCuratedChannels,
  setShowOnlyFarcaptcha,
  setShowOnlyFollowing,
  unsetHideDownvoted,
  unsetOnlyShowRatioAboveThreshold,
  unsetOnlyShowUpvoted,
  unsetShowMainFeed,
  unsetShowOnlyCuratedChannels,
  unsetShowOnlyFarcaptcha,
  unsetShowOnlyFollowing,
} from '@app/store/slices/signalToNoiseSlice';
import { useZustand } from '@app/store/zustand';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const FeedSettings: React.FC = () => {
  const { pathname } = useLocation();
  const isHomeFeed = pathname.startsWith('/home');
  const { t } = useTranslation();

  const {
    numCasts,
    numMainFeedCasts,
    numFollowingCasts,
    numCuratedChannelsCasts,
    numFarcaptchas,
    numCastsWithUpvotes,
    numCastsWithDownvotes,
    numCastsAboveThreshold,
    numCastsAfterFiltering,
  } = useZustand();

  const dispatch = useAppDispatch();
  const signalToNoiseState = useAppSelector((state) => state.signalToNoise);
  const showMainFeed = signalToNoiseState.showMainFeed;
  const showOnlyFollowing = signalToNoiseState.showOnlyFollowing;
  const showOnlyCuratedChannels = signalToNoiseState.showOnlyCuratedChannels;
  const showOnlyFarcaptcha = signalToNoiseState.showOnlyFarcaptcha;
  const onlyShowUpvoted = signalToNoiseState.onlyShowUpvoted;
  const hideDownvoted = signalToNoiseState.hideDownvoted;
  const onlyShowRatioAboveThreshold = signalToNoiseState.onlyShowRatioAboveThreshold;
  const ratioThreshold = signalToNoiseState.ratioThreshold;

  const handleChangeMainFeed = (showMainFeed: boolean) => {
    dispatch(showMainFeed ? setShowMainFeed() : unsetShowMainFeed());
  };
  const handleChangeOnlyFollowing = (showOnlyFollowing: boolean) => {
    dispatch(showOnlyFollowing ? setShowOnlyFollowing() : unsetShowOnlyFollowing());
  };
  const handleChangeOnlyCuratedChannels = (showOnlyCuratedChannels: boolean) => {
    dispatch(showOnlyCuratedChannels ? setShowOnlyCuratedChannels() : unsetShowOnlyCuratedChannels());
  };
  const handleChangeOnlyFarcaptcha = (showOnlyFarcaptcha: boolean) => {
    dispatch(showOnlyFarcaptcha ? setShowOnlyFarcaptcha() : unsetShowOnlyFarcaptcha());
  };
  const handleChangeOnlyUpvoted = (onlyShowUpvoted: boolean) => {
    dispatch(onlyShowUpvoted ? setOnlyShowUpvoted() : unsetOnlyShowUpvoted());
  };
  const handleChangeHideDownvoted = (hideDownvoted: boolean) => {
    dispatch(hideDownvoted ? setHideDownvoted() : unsetHideDownvoted());
  };
  const handleChangeOnlyShowRatioAboveThreshold = (onlyShowRatioAboveThreshold: boolean) => {
    dispatch(onlyShowRatioAboveThreshold ? setOnlyShowRatioAboveThreshold() : unsetOnlyShowRatioAboveThreshold());
  };
  const handleChangeRatioThreshold = (ratioThreshold: number) => {
    dispatch(setRatioThreshold(ratioThreshold));
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
      <BaseDivider />
      <SwitchContainer>
        <span>{t('Only Upvoted')}</span> {numCastsWithUpvotes}
        <BaseSwitch
          checkedChildren={t('On')}
          unCheckedChildren={t('Off')}
          checked={onlyShowUpvoted}
          onChange={handleChangeOnlyUpvoted}
        />
      </SwitchContainer>
      <br />
      <SwitchContainer>
        <span>{t('Hide Downvoted')}</span> {numCastsWithDownvotes}
        <BaseSwitch
          checkedChildren={t('On')}
          unCheckedChildren={t('Off')}
          checked={hideDownvoted}
          onChange={handleChangeHideDownvoted}
        />
      </SwitchContainer>
      <br />
      <SwitchContainer>
        <span>{t('Only Show Ratio > Threshold ')}</span> {numCastsAboveThreshold}
        <BaseSwitch
          checkedChildren={t('On')}
          unCheckedChildren={t('Off')}
          checked={onlyShowRatioAboveThreshold}
          onChange={handleChangeOnlyShowRatioAboveThreshold}
        />
      </SwitchContainer>
      <BaseInput
        type="number"
        value={ratioThreshold}
        onChange={(e) => handleChangeRatioThreshold(Number(e.target.value))}
      />
    </>
  );
};

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
