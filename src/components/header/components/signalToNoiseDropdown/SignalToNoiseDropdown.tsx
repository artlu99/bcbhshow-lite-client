import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { FilterIcon } from '@app/components/common/icons/FilterIcon';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import { SignalToNoiseOverlay } from '@app/components/header/components/signalToNoiseDropdown/signalToNoiseOverlay/SignalToNoiseOverlay/SignalToNoiseOverlay';
import { useResponsive } from '@app/hooks/useResponsive';
import { useRef, useState } from 'react';
import * as S from '../../Header.styles';

export const SignalToNoiseDropdown: React.FC = () => {
  const [isOpened, setOpened] = useState(false);

  const { isTablet } = useResponsive();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  return (
    <BasePopover content={<SignalToNoiseOverlay />} trigger="click" onOpenChange={setOpened}>
      <HeaderActionWrapper>
        {isTablet ? (
          <S.StNButton />
        ) : (
          <BaseButton type={isOpened ? 'ghost' : 'text'} icon={<FilterIcon />} onClick={() => setOpened(!isOpened)} />
        )}
        <div ref={ref} />
      </HeaderActionWrapper>
    </BasePopover>
  );
};
