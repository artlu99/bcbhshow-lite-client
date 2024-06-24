import { httpApi } from '@app/api/http.api';

interface MetadataRequest {
  url: string;
}

export interface OgMetadata {
  ogTitle: string;
  ogDescription: string;
  ogImage: {
    type: 'image/png' | 'image/jpeg';
    url: string;
  }[];
  twitterCard: string;
  twitterImage: {
    alt: string;
    url: string;
  }[];
}

export interface StevePolymorphicEmbedMetadata {
  content?: 'website' | 'image' | 'null';
  res?: OgMetadata;
  url?: string;
  message?: string;
}

export const getMetadata = async (metadataPayload: MetadataRequest): Promise<StevePolymorphicEmbedMetadata> =>
  httpApi.post<StevePolymorphicEmbedMetadata>('getMetadata', { ...metadataPayload }).then(({ data }) => data);
