import {
  degencastLink,
  farquestLink,
  fireflyLink,
  herocastLink,
  recasterLink,
  supercastLink,
  warpcastLink,
} from '@app/constants/altClients';
import { useResponsive } from '@app/hooks/useResponsive';
import { Link } from 'react-router-dom';
import * as S from './Cast.styles';

export interface AltClientLinksProps {
  castFid: number;
  castHash: string;
}
export const AltClientLinks: React.FC<AltClientLinksProps> = ({ castHash, castFid }) => {
  const { mobileOnly } = useResponsive();
  const maybeFarquestLink = farquestLink({ fid: castFid, hash: castHash });
  const maybeRecasterLink = mobileOnly ? recasterLink({ hash: castHash }) : undefined;
  const maybeHerocastLink = mobileOnly ? undefined : herocastLink({ hash: castHash });

  return (
    <S.Description>
      <Link to={warpcastLink({ hash: castHash })} target="_blank">
        [Warpcast]
      </Link>{' '}
      <Link to={supercastLink({ hash: castHash })} target="_blank">
        [supercast]
      </Link>{' '}
      <Link to={fireflyLink({ hash: castHash })} target="_blank">
        [Firefly]
      </Link>
      {maybeFarquestLink && (
        <Link to={maybeFarquestLink} target="_blank">
          {' '}
          [far.quest Pro]
        </Link>
      )}
      {maybeRecasterLink && (
        <Link to={maybeRecasterLink} target="_blank">
          {' '}
          [Recaster]
        </Link>
      )}{' '}
      <Link to={degencastLink({ hash: castHash })} target="_blank">
        [Degencast]
      </Link>
      {maybeHerocastLink && (
        <Link to={maybeHerocastLink} target="_blank">
          {' '}
          [Herocast]
        </Link>
      )}
    </S.Description>
  );
};
