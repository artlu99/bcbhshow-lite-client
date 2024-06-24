import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import { NightTimePicker } from '@app/components/header/components/settingsDropdown/settingsOverlay/nightModeSettings/NightTimePicker/NightTimePicker';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { setNightMode, setNightTime } from '@app/store/slices/nightModeSlice';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const NightModeSettings: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const nightModeState = useAppSelector((state) => state.nightMode);
  const isNightMode = nightModeState.isNightMode;
  const nightTime = nightModeState.nightTime;

  const handleChange = (isNightMode: boolean) => {
    dispatch(setNightMode(isNightMode));
  };

  const handleNightTime = (nightTime: number[]) => {
    dispatch(setNightTime(nightTime));
  };

  return (
    <>
      <SwitchContainer>
        <span>{t('common.auto')}</span>
        <BaseSwitch checkedChildren="On" unCheckedChildren="Off" checked={isNightMode} onChange={handleChange} />
      </SwitchContainer>
      {isNightMode && <NightTimePicker nightTime={nightTime} setNightTime={handleNightTime} />}
    </>
  );
};

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
