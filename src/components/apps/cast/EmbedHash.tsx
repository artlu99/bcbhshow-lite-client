import { CastObject } from '@app/api/feed-types';
import { Cast } from '@app/components/apps/cast/Cast';
import { castByHashQuery } from '@app/queries/queries';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function EmbedHash({ hash, containerLevel }: { hash: string; containerLevel: number }) {
  const [cast, setCast] = useState<CastObject>();

  const chQuery = useQuery(castByHashQuery(hash));
  useEffect(() => {
    setCast(chQuery.data?.cast);
  }, [chQuery]);

  if (!cast) return null;

  return (
    <Cast
      level={containerLevel + 1}
      castHash={cast.hash}
      title={' '}
      date={cast.timestamp}
      description={cast.text}
      embeds={cast.embeds ?? []}
      displayName={cast.author.display_name}
      fid={cast.author.fid}
      fname={cast.author.username ?? cast.author.display_name ?? cast?.author.fid.toString() ?? '<unknown>'}
      avatar={cast.author.pfp_url}
      parentHash={cast.parent_hash}
      threadHash={cast.thread_hash}
      parentUrl={cast.parent_url}
      replies={cast.replies.count}
      recasts={cast.reactions.recasts_count}
      likes={cast.reactions.likes_count}
      recastooors={cast.reactions.recasts.map((r) => r.fid)}
      likooors={cast.reactions.likes.map((l) => l.fid)}
      tags={[]}
    />
  );
}
