export type ProviderName = 'youtube' | 'vimeo' | 'ted';

export interface OEmbedData {
  thumbnail?: string;
  title?: string;
  author?: string;
  provider: ProviderName;
  duration?: number;
}

export interface UseOEmbedResult {
  data: OEmbedData | null;
  loading: boolean;
  error: Error | null;
}

export interface ProviderDefinition {
  name: ProviderName;
  matches: (url: string) => boolean;
  parseId: (url: string) => string | null;
  buildEmbedUrl: (id: string) => string;
  buildThumbnailUrl?: (id: string) => string;
  buildOEmbedUrl?: (url: string) => string;
}
