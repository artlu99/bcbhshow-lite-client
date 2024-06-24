import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { first } from 'radash';
import { useQuery } from '@tanstack/react-query';
import { StevePolymorphicEmbedMetadata } from '@app/api/metadata.api';
import fallbackPhoto from '@app/assets/photo.svg';
import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { metadataQuery } from '@app/queries/queries';

export function EmbedUrl({ url }: { url: string }) {
  const [isEmbedShown, setIsEmbedShown] = useState(false);
  const [result, setResult] = useState<StevePolymorphicEmbedMetadata | undefined>({});

  const zenModeState = useAppSelector((state) => state.zenMode);
  const showEmbeds = zenModeState.showEmbeds;

  useEffect(() => {
    setIsEmbedShown(showEmbeds);
  }, [showEmbeds]);

  const mdQuery = useQuery(metadataQuery(url));
  useEffect(() => {
    setResult(mdQuery.data);
  }, [mdQuery]);

  if (!result) return null;

  if (result.content === 'website') {
    const data = result.res;
    if (!data) return null;

    const previewImage = first(data.ogImage) ? data.ogImage[0].url : fallbackPhoto;
    return (
      <BasePopover content={data.ogTitle ?? data.ogDescription ?? url} trigger="hover">
        <Link to={url} target="_blank">
          {isEmbedShown ? <BaseImage src={previewImage} alt={url} preview={false} /> : url}
        </Link>
      </BasePopover>
    );
  } else if (result.content === 'image') {
    return isEmbedShown ? (
      <BaseImage src={url} alt={url} preview={false} />
    ) : (
      <div onClick={() => setIsEmbedShown(true)}>[image]</div>
    );
  } else {
    return null;
  }
}
