import { FeedSettings } from '@app/components/header/components/signalToNoiseDropdown/signalToNoiseOverlay/FeedSettings';
import * as S from './SignalToNoiseOverlay.styles';

export const SignalToNoiseOverlay: React.FC = ({ ...props }) => {
  return (
    <S.SignalToNoiseOverlayMenu {...props}>
      <FeedSettings />
    </S.SignalToNoiseOverlayMenu>
  );
};
