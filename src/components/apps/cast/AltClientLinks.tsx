import {
  degencastLink,
  farquestLink,
  herocastLink,
  recasterLink,
  supercastLink,
  warpcastLink,
  wildcardLink,
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
  const maybeWildcardLink = mobileOnly ? undefined : wildcardLink({ fid: castFid, hash: castHash });

  return (
    <S.Description>
      <Link to={warpcastLink({ hash: castHash })} target="_blank">
        [Warpcast]
      </Link>{' '}
      <Link to={supercastLink({ hash: castHash })} target="_blank">
        [supercast]
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
      {maybeWildcardLink && (
        <Link to={maybeWildcardLink} target="_blank">
          {' '}
          [Wildcard]
        </Link>
      )}
    </S.Description>
  );
};
