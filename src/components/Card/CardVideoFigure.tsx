import { useState, type MouseEvent } from 'react';
import { detectProvider } from '../../utils/video/providers';
import { useOEmbed } from '../../utils/video/useOEmbed';
import type { ProviderName } from '../../utils/video/types';

const YT_THUMB_QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault', 'default'] as const;

const buildYtThumbUrl = (id: string, quality: string) =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`;

export interface CardVideoFigureProps {
  url: string;
  thumbnail?: string;
  title?: string;
  provider?: ProviderName;
  skipNetwork?: boolean; /** Skip oEmbed network calls; only resolve via deterministic fast paths (e.g. YouTube). */
  onPlay?: () => void; /** Fired when the user activates the card. The figure still swaps in the iframe internally. */
}

export const CardVideoFigure = ({
  url,
  thumbnail: thumbnailProp,
  title,
  provider: providerOverride,
  skipNetwork,
  onPlay,
}: CardVideoFigureProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ytIndex, setYtIndex] = useState(0);

  const providerDef = detectProvider(url);
  const providerName: ProviderName | undefined = providerOverride ?? providerDef?.name;
  const videoId = providerDef?.parseId(url) ?? null;
  const embedUrl = providerDef && videoId ? providerDef.buildEmbedUrl(videoId) : null;

  const isYouTube = providerName === 'youtube';
  // For non-YouTube providers, fetch oEmbed only when no manual thumbnail was provided.
  // YouTube is fully synchronous (deterministic URL).
  const needsOEmbed = !thumbnailProp && !isYouTube;
  const auto = useOEmbed(needsOEmbed ? url : undefined, { skipNetwork });

  const ytThumb =
    isYouTube && videoId
      ? buildYtThumbUrl(videoId, YT_THUMB_QUALITIES[ytIndex] ?? 'default')
      : null;
  const posterSrc = thumbnailProp ?? ytThumb ?? auto.data?.thumbnail ?? undefined;
  const fallbacksAttr =
    isYouTube && videoId && !thumbnailProp
      ? YT_THUMB_QUALITIES.slice(1)
          .map((q) => buildYtThumbUrl(videoId, q))
          .join(',')
      : undefined;

  const handleImgError = () => {
    if (!isYouTube || thumbnailProp) return;
    if (ytIndex < YT_THUMB_QUALITIES.length - 1) {
      setYtIndex((i) => i + 1);
    }
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!embedUrl) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    setIsPlaying(true);
    onPlay?.();
  };

  const figureClass = [
    'cu-card__figure',
    'cu-card__figure--video',
    isPlaying && 'cu-card__figure--playing',
  ]
    .filter(Boolean)
    .join(' ');

  const accessibleLabel = title ? `Play video: ${title}` : 'Play video';

  return (
    <figure
      className={figureClass}
      data-rds-video-card
      data-embed-url={embedUrl ?? undefined}
      data-provider={providerName}
    >
      {isPlaying && embedUrl ? (
        <iframe
          className="cu-card__figure-iframe"
          src={embedUrl}
          title={title ?? 'Video player'}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <a
          className="cu-card__figure-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={accessibleLabel}
          onClick={handleClick}
        >
          {posterSrc ? (
            <img
              className="cu-card__figure-poster"
              src={posterSrc}
              alt=""
              loading="lazy"
              data-fallbacks={fallbacksAttr}
              onError={handleImgError}
            />
          ) : auto.loading ? (
            <span className="cu-card__figure-skeleton" aria-hidden="true" />
          ) : (
            <span className="cu-card__figure-placeholder" aria-hidden="true" />
          )}
          <span className="cu-card__figure-play" aria-hidden="true">
            <svg viewBox="0 0 68 48" focusable="false">
              <path
                className="cu-card__figure-play-bg"
                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
              />
              <path className="cu-card__figure-play-arrow" d="M 45,24 27,14 27,34" />
            </svg>
          </span>
        </a>
      )}
    </figure>
  );
};

CardVideoFigure.displayName = 'Card.VideoFigure';
