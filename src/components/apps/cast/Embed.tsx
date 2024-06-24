import { EmbedObject } from '@app/api/feed-types';
import { EmbedHash } from '@app/components/apps/cast/EmbedHash';
import { EmbedUrl } from '@app/components/apps/cast/EmbedUrl';

export const Embed = ({ embedObject, level }: { embedObject: EmbedObject; level: number }) =>
  embedObject.url ? (
    <EmbedUrl url={embedObject.url} />
  ) : (
    <EmbedHash hash={embedObject.cast_id?.hash ?? '0xdead'} containerLevel={level} />
  );
