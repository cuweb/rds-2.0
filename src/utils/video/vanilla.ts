/**
 * Vanilla JS companion for <Card.VideoFigure>.
 *
 * Renders no DOM of its own — it enhances markup that matches the rds-2.0
 * Card.VideoFigure contract:
 *
 *   <div class="cu-card">
 *     <figure class="cu-card__figure cu-card__figure--video"
 *             data-rds-video-card
 *             data-embed-url="..."
 *             data-provider="...">
 *       <a class="cu-card__figure-link" href="<canonical-url>" aria-label="Play video: ...">
 *         <img class="cu-card__figure-poster" src="..." data-fallbacks="url1,url2,url3">
 *         <span class="cu-card__figure-play"><!-- icon --></span>
 *       </a>
 *     </figure>
 *     <header class="cu-card__header">
 *       <h3 class="cu-card__header-title">Title</h3>
 *     </header>
 *   </div>
 *
 * On DOMContentLoaded, every `[data-rds-video-card]` is wired up:
 *   - Clicks on the inner link replace it with an autoplaying <iframe>.
 *   - Cmd/Ctrl/Shift/middle-clicks fall through to the canonical link target.
 *   - Poster <img> elements with `data-fallbacks` walk the list on `onerror`.
 *
 * Build target: dist/videoCard.{js,mjs}. No dependencies, no React.
 */

const WIRED_ATTR = 'data-rds-video-card-wired';

const swapToIframe = (
  figure: HTMLElement,
  embedUrl: string,
  link: HTMLAnchorElement,
  title: string | null,
): void => {
  const iframe = document.createElement('iframe');
  iframe.className = 'cu-card__figure-iframe';
  iframe.src = embedUrl;
  iframe.title = title || 'Video player';
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.setAttribute('allowfullscreen', '');

  link.replaceWith(iframe);
  figure.classList.add('cu-card__figure--playing');

  figure.dispatchEvent(
    new CustomEvent('rds:video-play', {
      bubbles: true,
      detail: { embedUrl, provider: figure.getAttribute('data-provider') },
    }),
  );
};

const wireFallbacks = (img: HTMLImageElement): void => {
  const list = img.getAttribute('data-fallbacks');
  if (!list) return;
  const fallbacks = list
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  let i = 0;
  img.addEventListener('error', () => {
    if (i >= fallbacks.length) return;
    img.src = fallbacks[i++];
  });
};

const extractTitleFromLink = (link: HTMLAnchorElement): string | null => {
  const label = link.getAttribute('aria-label');
  if (!label) return null;
  return label.replace(/^Play video:\s*/i, '').trim() || null;
};

const wireCard = (figure: HTMLElement): void => {
  if (figure.hasAttribute(WIRED_ATTR)) return;
  figure.setAttribute(WIRED_ATTR, '');

  const embedUrl = figure.getAttribute('data-embed-url');
  const link = figure.querySelector<HTMLAnchorElement>('.cu-card__figure-link');
  const title = link ? extractTitleFromLink(link) : null;

  figure
    .querySelectorAll<HTMLImageElement>('img[data-fallbacks]')
    .forEach((img) => wireFallbacks(img));

  if (!link || !embedUrl) return;

  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    if ('button' in event && event.button === 1) return;
    event.preventDefault();
    swapToIframe(figure, embedUrl, link, title);
  });
};

/** Wire up every `[data-rds-video-card]` in the given root (default: document). Idempotent. */
export const initVideoCards = (root: ParentNode = document): void => {
  root.querySelectorAll<HTMLElement>('[data-rds-video-card]').forEach((figure) => wireCard(figure));
};

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initVideoCards());
  } else {
    initVideoCards();
  }
}
