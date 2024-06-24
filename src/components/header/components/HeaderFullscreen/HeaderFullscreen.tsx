import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { RequireFullscreen } from '@app/components/common/RequireFullscreen/RequireFullscreen';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import { useEffect, useRef } from 'react';

export const HeaderFullscreen: React.FC = () => {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    rootRef.current = document.getElementById('root');
  }, []);

  return (
    <RequireFullscreen component={rootRef}>
      {(isFullscreen) => (
        <HeaderActionWrapper>
          <BaseButton
            type={isFullscreen ? 'ghost' : 'text'}
            icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          />
        </HeaderActionWrapper>
      )}
    </RequireFullscreen>
  );
};
