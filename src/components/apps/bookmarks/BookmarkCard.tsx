import { DecentBookmark } from '@app/api/decent-bookmarks.api';
import { CastObject } from '@app/api/feed-types';
import { AltClientLinks } from '@app/components/apps/cast/AltClientLinks';
import * as S from '@app/components/apps/cast/Cast.styles';
import { Embed } from '@app/components/apps/cast/Embed';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { Dates } from '@app/constants/Dates';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { castByHashQuery } from '@app/queries/queries';
import { prettyHash } from '@app/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface BookmarkCardProps {
  bookmark: DecentBookmark;
}
export const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
  const [castObject, setCastObject] = useState<CastObject>();

  const chQuery = useQuery(castByHashQuery(bookmark.hash));
  useEffect(() => {
    setCastObject(chQuery.data?.cast);
  }, [chQuery]);

  const zenModeState = useAppSelector((state) => state.zenMode);
  const showEmbeds = zenModeState.showEmbeds;
  const showAltClientLinks = zenModeState.showAltClientLinks;

  return (
    <S.Wrapper>
      <S.Header>
        <BaseAvatar src={castObject?.author.pfp_url} alt="author" size={43} />
        <S.AuthorWrapper>
          <S.Author>
            {castObject?.author.display_name ?? bookmark.username}
            {castObject && castObject.author.username ? ` @${castObject.author.username}` : null}
          </S.Author>

          <S.DateTime>{Dates.format(castObject?.timestamp ?? bookmark.timestamp, 'L')}</S.DateTime>
        </S.AuthorWrapper>
      </S.Header>
      {showEmbeds && castObject?.embeds && castObject?.embeds.length > 0 ? (
        <>
          {castObject?.embeds.map((e, index) => {
            return <Embed embedObject={e} key={`${castObject?.hash}-embed-${index}`} level={0} />;
          })}
        </>
      ) : null}
      <S.InfoWrapper>
        <S.InfoHeader>
          <S.Title>{castObject?.text ?? prettyHash(bookmark.hash)}</S.Title>
        </S.InfoHeader>
        <S.Description>
          {castObject?.replies.count ?? 0} Replies {castObject?.reactions.recasts_count ?? 0} Recasts{' '}
          {castObject?.reactions.likes_count ?? 0} Likes <br />
          {showAltClientLinks && <AltClientLinks castFid={bookmark.fid} castHash={bookmark.hash} />}
        </S.Description>
      </S.InfoWrapper>
    </S.Wrapper>
  );
};
