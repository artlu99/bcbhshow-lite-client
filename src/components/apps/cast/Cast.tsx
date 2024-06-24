import { BotOrNotResult } from '@app/api/botOrNot.api';
import { Curation } from '@app/api/curation.api';
import { EmbedObject } from '@app/api/feed-types';
import { AltClientLinks } from '@app/components/apps/cast/AltClientLinks';
import { Embed } from '@app/components/apps/cast/Embed';
import { Reactions } from '@app/components/apps/cast/Reactions';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { BaseDivider } from '@app/components/common/BaseDivider/BaseDivider';
import { BaseHashTag, IHashTag } from '@app/components/common/BaseHashTag/BaseHashTag';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { Dates } from '@app/constants/Dates';
import { MAX_THREAD_DEPTH } from '@app/constants/config/config';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { allChannelsQuery } from '@app/queries/queries';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Cast.styles';

export interface CastProps {
  level: number;
  castHash: string;
  displayName?: string;
  fid: number;
  fname: string;
  embeds: EmbedObject[];
  hasPowerBadge?: boolean;
  botOrNotResult?: BotOrNotResult;
  date: number;
  title: string;
  description?: string;
  avatar?: string;
  parentHash: string | null;
  threadHash?: string;
  parentUrl?: string;
  replies: number;
  recasts: number;
  likes: number;
  recastooors: number[];
  likooors: number[];
  tags: IHashTag[];
  curation?: { upvotes: Curation[]; downvotes: Curation[] };
  className?: string;
  url?: string;
}

export const Cast: React.FC<CastProps> = ({
  level,
  castHash,
  date,
  title,
  description,
  displayName,
  fid,
  fname,
  embeds,
  hasPowerBadge,
  botOrNotResult,
  avatar,
  parentHash,
  threadHash,
  parentUrl,
  replies,
  recasts,
  recastooors,
  likes,
  likooors,
  tags,
  curation,
  className,
  url,
}) => {
  const [allLikooors, setAllLikooors] = useState(likooors);
  const [allRecastooors, setAllRecastooors] = useState(recastooors);

  const zenModeState = useAppSelector((state) => state.zenMode);
  const showReactions = zenModeState.showReactions;
  const showAltClientLinks = zenModeState.showAltClientLinks;
  const showImageOnly = zenModeState.showImageOnly;
  const showPFPs = zenModeState.showPFPs;
  const showPowerBadges = zenModeState.showPowerBadges;
  const showDisplayNames = zenModeState.showDisplayNames;
  const showUserNames = zenModeState.showUserNames;
  const showBotOrNotIndicator = zenModeState.showBotOrNotIndicator;

  const acQuery = useQuery(allChannelsQuery());
  const memodAcData = useMemo(() => {
    if (acQuery.isLoading || acQuery.error) return null;
    return acQuery.data?.result?.channels ?? [];
  }, [acQuery.isLoading, acQuery.error, acQuery.data]);

  if (level > MAX_THREAD_DEPTH) return null;

  threadHash ? 'this cast is in a thread' : parentHash ? 'this cast is a reply' : undefined;

  const linkTo = (memodAcData ?? []).find((ac) => ac.url === parentUrl)?.id;

  return showImageOnly || title.length > 0 ? (
    <S.Wrapper className={className}>
      <S.Header>
        {showPFPs && !!avatar && <BaseAvatar src={avatar} alt={fname} size={43} />}
        <S.AuthorWrapper>
          {fname && (
            <BaseTooltip title={`FID: ${fid}`} placement={'topLeft'}>
              <S.Author>
                {showDisplayNames ? displayName ?? fname : null}
                {showPowerBadges && hasPowerBadge ? ' ⚡ ' : ' '}
                {showUserNames ? (
                  <span>{`@${fname}`}</span>
                ) : (
                  <BaseTooltip title={`@${fname}`} placement={'right'}>
                    {showDisplayNames ? '' : 'anon'}
                  </BaseTooltip>
                )}
              </S.Author>
            </BaseTooltip>
          )}
          <S.DateTime>{Dates.format(date, 'L')}</S.DateTime>
          {showBotOrNotIndicator &&
            botOrNotResult &&
            (botOrNotResult.summary ? (
              <BasePopover content={botOrNotResult.summary} trigger="hover">
                <S.BotOrNotWrapper>
                  🤖|👶: {botOrNotResult.label ?? '<unknown>'}, Farcaptcha: {`${botOrNotResult.farcaptcha}`}
                </S.BotOrNotWrapper>
              </BasePopover>
            ) : (
              <S.BotOrNotWrapper>🤖|👶: {botOrNotResult.label ?? '<unknown>'}</S.BotOrNotWrapper>
            ))}
        </S.AuthorWrapper>
      </S.Header>
      <S.InfoWrapper>
        <S.InfoHeader>
          <S.Title>{title}</S.Title>
        </S.InfoHeader>
        <S.Description>
          {url ? (
            <Link to={url} target="_blank">
              {description}
            </Link>
          ) : (
            description
          )}
        </S.Description>
        {embeds && embeds.length > 0 ? (
          <>
            {embeds.map((e, index) => {
              return <Embed embedObject={e} key={`${castHash}-embed-${index}`} level={level} />;
            })}
          </>
        ) : null}
      </S.InfoWrapper>
      {showReactions || showAltClientLinks ? (
        <>
          <BaseDivider />
          <S.InfoWrapper>
            <Reactions
              castHash={castHash}
              castFid={fid}
              replies={replies}
              recasts={recasts}
              likes={likes}
              curation={curation}
              allLikooors={allLikooors}
              setAllLikooors={setAllLikooors}
              allRecastooors={allRecastooors}
              setAllRecastooors={setAllRecastooors}
            />
            {showAltClientLinks && <AltClientLinks castFid={fid} castHash={castHash} />}
          </S.InfoWrapper>
        </>
      ) : null}
      <S.TagsWrapper>
        {tags.map((tag) =>
          linkTo ? (
            <Link to={`/~/channel/${linkTo}`}>
              <BaseHashTag key={tag.bgColor} title={tag.title} bgColor={tag.bgColor} />
            </Link>
          ) : (
            <BaseHashTag key={tag.bgColor} title={tag.title} bgColor={tag.bgColor} />
          ),
        )}
      </S.TagsWrapper>
    </S.Wrapper>
  ) : null;
};
