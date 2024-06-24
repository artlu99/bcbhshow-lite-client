import { BaseDivider } from '@app/components/common/BaseDivider/BaseDivider';
import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import {
  setHideBotOrNotIndicator,
  setHideDisplayNames,
  setHideEmbeds,
  setHidePFPs,
  setHidePowerBadges,
  setHideReactions,
  setHideUserNames,
  setShowBotOrNotIndicator,
  setShowDisplayNames,
  setShowEmbeds,
  setShowPFPs,
  setShowPowerBadges,
  setShowReactions,
  setShowUserNames,
} from '@app/store/slices/zenModeSlice';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const DisplaySettings: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const zenModeState = useAppSelector((state) => state.zenMode);
  const showEmbeds = zenModeState.showEmbeds;
  const showReactions = zenModeState.showReactions;
  const showPFPs = zenModeState.showPFPs;
  const showPowerBadges = zenModeState.showPowerBadges;
  const showDisplayNames = zenModeState.showDisplayNames;
  const showUserNames = zenModeState.showUserNames;
  const showBotOrNotIndicator = zenModeState.showBotOrNotIndicator;

  const handleChangeEmbeds = (showEmbeds: boolean) => {
    dispatch(showEmbeds ? setShowEmbeds() : setHideEmbeds());
  };
  const handleChangeReactions = (showReactions: boolean) => {
    dispatch(showReactions ? setShowReactions() : setHideReactions());
  };
  const handleChangePFPs = (showPFPs: boolean) => {
    dispatch(showPFPs ? setShowPFPs() : setHidePFPs());
  };
  const handleChangePowerBadges = (showPowerBadges: boolean) => {
    dispatch(showPowerBadges ? setShowPowerBadges() : setHidePowerBadges());
  };
  const handleChangeDisplayNames = (showDisplayNames: boolean) => {
    dispatch(showDisplayNames ? setShowDisplayNames() : setHideDisplayNames());
  };
  const handleChangeUserNames = (showUserNames: boolean) => {
    dispatch(showUserNames ? setShowUserNames() : setHideUserNames());
  };
  const handleChangeBotOrNotIndicator = (showBotOrNotIndicator: boolean) => {
    dispatch(showBotOrNotIndicator ? setHideBotOrNotIndicator() : setShowBotOrNotIndicator());
  };

  return (
    <>
      <SwitchContainer>
        <span>{t('Embeds')}</span>{' '}
        <BaseSwitch
          checkedChildren={t('On')}
          unCheckedChildren={t('Off')}
          checked={showEmbeds}
          onChange={handleChangeEmbeds}
        />
      </SwitchContainer>
      <BaseDivider />
      <SwitchContainer>
        <span>{t('Reactions')}</span>{' '}
        <BaseSwitch
          checkedChildren={t('On')}
          unCheckedChildren={t('Off')}
          checked={showReactions}
          onChange={handleChangeReactions}
        />
      </SwitchContainer>
      <BaseDivider />
      <SwitchContainer>
        <span>{t('PFPs')}</span>{' '}
        <BaseSwitch
          checkedChildren={t('On')}
          unCheckedChildren={t('Off')}
          checked={showPFPs}
          onChange={handleChangePFPs}
        />
      </SwitchContainer>
      <BaseDivider />
      <SwitchContainer>
        <span>{t('Power Badge')}</span>{' '}
        <BaseSwitch
          checkedChildren={t('On')}
          unCheckedChildren={t('Off')}
          checked={showPowerBadges}
          onChange={handleChangePowerBadges}
        />
      </SwitchContainer>
      <BaseDivider />
      <SwitchContainer>
        <span>{t('Display Name')}</span>{' '}
        <BaseSwitch
          checkedChildren={t('On')}
          unCheckedChildren={t('Off')}
          checked={showDisplayNames}
          onChange={handleChangeDisplayNames}
        />
      </SwitchContainer>
      <BaseDivider />
      <SwitchContainer>
        <span>{t('User Name')}</span>{' '}
        <BaseSwitch
          checkedChildren={t('On')}
          unCheckedChildren={t('Off')}
          checked={showUserNames}
          onChange={handleChangeUserNames}
        />
      </SwitchContainer>
      <BaseDivider />
      <SwitchContainer>
        <span>{t('Bot-or-Not')}</span>{' '}
        <BaseSwitch
          checkedChildren={t('On')}
          unCheckedChildren={t('Off')}
          checked={showBotOrNotIndicator}
          onChange={handleChangeBotOrNotIndicator}
        />
      </SwitchContainer>
    </>
  );
};

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
