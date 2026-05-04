import type { ProviderDefinition, ProviderName } from './types';

const youtube: ProviderDefinition = {
  name: 'youtube',
  matches: (url) => /(?:youtube\.com|youtu\.be)/i.test(url),
  parseId: (url) => {
    const short = url.match(/youtu\.be\/([\w-]{11})/i);
    if (short) return short[1];
    const watch = url.match(/[?&]v=([\w-]{11})/i);
    if (watch) return watch[1];
    const embed = url.match(/youtube\.com\/embed\/([\w-]{11})/i);
    if (embed) return embed[1];
    return null;
  },
  buildEmbedUrl: (id) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
  buildThumbnailUrl: (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  buildOEmbedUrl: (url) =>
    `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
};

const vimeo: ProviderDefinition = {
  name: 'vimeo',
  matches: (url) => /vimeo\.com/i.test(url),
  parseId: (url) => {
    const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    return m ? m[1] : null;
  },
  buildEmbedUrl: (id) => `https://player.vimeo.com/video/${id}?autoplay=1`,
  buildOEmbedUrl: (url) => `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`,
};

// TED's oEmbed endpoint exists but its CORS headers are unreliable from the browser.
// Expect useOEmbed to surface a CORS error for TED URLs; consumers should pass
// thumbnail/title manually or proxy the oEmbed call server-side.
const ted: ProviderDefinition = {
  name: 'ted',
  matches: (url) => /ted\.com\/talks/i.test(url),
  parseId: (url) => {
    const m = url.match(/ted\.com\/talks\/([\w_]+)/i);
    return m ? m[1] : null;
  },
  buildEmbedUrl: (id) => `https://embed.ted.com/talks/${id}`,
  buildOEmbedUrl: (url) =>
    `https://www.ted.com/services/v1/oembed.json?url=${encodeURIComponent(url)}`,
};

const PROVIDERS: ProviderDefinition[] = [youtube, vimeo, ted];

export const detectProvider = (url: string): ProviderDefinition | null => {
  for (const p of PROVIDERS) {
    if (p.matches(url)) return p;
  }
  return null;
};

export const getProvider = (name: ProviderName): ProviderDefinition | null =>
  PROVIDERS.find((p) => p.name === name) ?? null;

export const PROVIDER_NAMES: ProviderName[] = PROVIDERS.map((p) => p.name);
