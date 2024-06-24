import { DisplaySettings } from '@app/components/header/components/zenModeDropdown/zenModeOverlay/DisplaySettings';
import * as S from './ZenModeOverlay.styles';

export const ZenModeOverlay: React.FC = ({ ...props }) => {
  return (
    <S.ZenModeOverlayMenu {...props}>
      <DisplaySettings />
    </S.ZenModeOverlayMenu>
  );
};
