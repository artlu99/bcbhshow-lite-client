import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { SignalToNoiseDropdown } from '@app/components/header/components/signalToNoiseDropdown/SignalToNoiseDropdown';
import { ZenModeDropdown } from '@app/components/header/components/zenModeDropdown/ZenModeDropdown';
import { useResponsive } from '@app/hooks/useResponsive';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import * as S from './HeaderSignalToNoise.styles';

export const HeaderSignalToNoise: React.FC = () => {
  const { mobileOnly, isTablet } = useResponsive();

  const { pathname } = useLocation();

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(false);
  }, [pathname]);

  return (
    <>
      {mobileOnly && (
        <>
          <BaseButton
            type={isModalOpen ? 'ghost' : 'text'}
            icon={<S.SignalToNoiseIcon />}
            onClick={() => setModalOpen(true)}
          />
          <S.SignalToNoiseModal
            open={isModalOpen}
            closable={false}
            footer={null}
            onCancel={() => setModalOpen(false)}
            destroyOnClose
          >
            <SignalToNoiseDropdown />
          </S.SignalToNoiseModal>
        </>
      )}

      {isTablet && <SignalToNoiseDropdown />}
      {isTablet && <ZenModeDropdown />}
    </>
  );
};
