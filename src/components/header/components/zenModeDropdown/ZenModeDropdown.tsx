import { MinusCircleOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import { ZenModeOverlay } from '@app/components/header/components/zenModeDropdown/zenModeOverlay/ZenModeOverlay/ZenModeOverlay';
import { useResponsive } from '@app/hooks/useResponsive';
import { useRef, useState } from 'react';
import * as S from '../../Header.styles';

export const ZenModeDropdown: React.FC = () => {
  const [isOpened, setOpened] = useState(false);

  const { isTablet } = useResponsive();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  return (
    <BasePopover content={<ZenModeOverlay />} trigger="click" onOpenChange={setOpened}>
      <HeaderActionWrapper>
        {isTablet ? (
          <S.ZMButton />
        ) : (
          <BaseButton
            type={isOpened ? 'ghost' : 'text'}
            icon={<MinusCircleOutlined />}
            onClick={() => setOpened(!isOpened)}
          />
        )}
        <div ref={ref} />
      </HeaderActionWrapper>
    </BasePopover>
  );
};
