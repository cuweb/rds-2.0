# Video cards in WordPress (vanilla JS)

**Use this when:** you want the same lite-embed video card the React library ships with, but rendered from PHP — typically inside a Gutenberg block, Timber template, or theme template part.

The React `<Card>` + `<Card.VideoFigure>` and the WordPress integration share an identical DOM contract. PHP renders the markup, the bundled vanilla script wires up the click-to-play behaviour. No React, no jQuery, no other runtime dependency.

## What you get

- A facade card that looks identical to every other RDS card (same wrapper, padding, shadow, hover).
- The figure region shows a poster image with a play button overlay.
- On click, the poster is replaced in-place with a native `<iframe>` (autoplay).
- Without JS, the figure is a real link to the video — accessible fallback for free.
- YouTube thumbnails are derived from the URL — no API call.
- Vimeo / TED thumbnails come from WordPress's built-in oEmbed cache — no extra deps.

## 1. Enqueue the script and CSS

The package ships:

| File | Purpose |
|---|---|
| `dist/vanilla-js/videoCard.js` | Browser-ready IIFE. Auto-attaches on `DOMContentLoaded`. ~1.5 KB minified. |
| `dist/vanilla-js/videoCard.mjs` | ES module variant of the same script for modern setups. |
| `dist/components/Card/styles.css` | Card styles (includes the video figure variant). |
| `dist/style.css` | Full library stylesheet. |

If your theme already loads the full RDS stylesheet, you only need the script. Otherwise enqueue the per-component CSS:

```php
add_action( 'wp_enqueue_scripts', function () {
    $rds = get_template_directory_uri() . '/vendor/cuweb/rds-2.0/dist';

    wp_enqueue_style(
        'rds-card',
        $rds . '/components/Card/styles.css',
        [],
        '0.4.0'
    );

    wp_enqueue_script(
        'rds-video-card',
        $rds . '/vanilla-js/videoCard.js',
        [],
        '0.4.0',
        true // load in footer
    );
} );
```

The script is idempotent — it tags wired figures with `data-rds-video-card-wired` and skips them on re-init. If your block adds cards dynamically (e.g. after an AJAX render), call `RDSVideoCard.initVideoCards(container)` from your block's view script.

## 2. The markup contract

Every video card must follow this shape so the script can find and enhance it. The data attributes live on the `<figure>` (not the outer `<div>`):

```html
<div class="cu-card">
  <figure class="cu-card__figure cu-card__figure--video"
          data-rds-video-card
          data-embed-url="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0"
          data-provider="youtube">
    <a class="cu-card__figure-link"
       href="https://www.youtube.com/watch?v=ScMzIvxBSi4"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="Play video: Welcome to Carleton">
      <img class="cu-card__figure-poster"
           src="https://i.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg"
           alt=""
           loading="lazy"
           data-fallbacks="https://i.ytimg.com/vi/ScMzIvxBSi4/sddefault.jpg,https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg,https://i.ytimg.com/vi/ScMzIvxBSi4/default.jpg">
      <span class="cu-card__figure-play" aria-hidden="true">
        <!-- play SVG, copy from CardVideoFigure.tsx if you need it inline -->
      </span>
    </a>
  </figure>
  <header class="cu-card__header">
    <h3 class="cu-card__header-title">Welcome to Carleton</h3>
  </header>
</div>
```

Required attributes:

| Attribute | Where | Why |
|---|---|---|
| `data-rds-video-card` | figure | selector the script queries for |
| `data-embed-url` | figure | iframe `src` used after click |
| `data-provider` | figure | emitted on the `rds:video-play` custom event |
| `href` on `.cu-card__figure-link` | link | JS-off fallback target |
| `aria-label="Play video: <Title>"` on link | link | the script extracts the title for the iframe's accessible name |
| `data-fallbacks` on `<img>` | poster (YouTube only) | ordered list of replacement URLs on `error` |

The `data-provider` attribute is informational — the script doesn't branch on it. Use it for analytics or styling.

## 3. PHP helper

Drop this into your theme or plugin. It accepts a video URL and returns the full markup:

```php
/**
 * Render an RDS video card from a video URL.
 *
 * @param string $url   Canonical video URL (YouTube / Vimeo / TED).
 * @param string $title Optional title rendered under the card.
 * @return string HTML for the card, or empty string if the URL is unsupported.
 */
function rds_video_card( $url, $title = '' ) {
    $card = rds_video_card_resolve( $url );
    if ( ! $card ) {
        return '';
    }

    $title_html = '';
    if ( $title ) {
        $title_html = sprintf(
            '<header class="cu-card__header"><h3 class="cu-card__header-title">%s</h3></header>',
            esc_html( $title )
        );
    }

    $aria_label = $title
        ? sprintf( __( 'Play video: %s', 'rds' ), $title )
        : __( 'Play video', 'rds' );

    $fallbacks_attr = $card['fallbacks']
        ? sprintf( ' data-fallbacks="%s"', esc_attr( implode( ',', $card['fallbacks'] ) ) )
        : '';

    return sprintf(
        '<div class="cu-card">
            <figure class="cu-card__figure cu-card__figure--video" data-rds-video-card data-embed-url="%1$s" data-provider="%2$s">
                <a class="cu-card__figure-link" href="%3$s" target="_blank" rel="noopener noreferrer" aria-label="%4$s">
                    <img class="cu-card__figure-poster" src="%5$s" alt="" loading="lazy"%6$s>
                    <span class="cu-card__figure-play" aria-hidden="true">%7$s</span>
                </a>
            </figure>
            %8$s
        </div>',
        esc_url( $card['embed_url'] ),
        esc_attr( $card['provider'] ),
        esc_url( $url ),
        esc_attr( $aria_label ),
        esc_url( $card['thumbnail'] ),
        $fallbacks_attr,
        rds_video_card_play_icon(),
        $title_html
    );
}

/**
 * Resolve a URL into provider, embed URL, thumbnail, and fallback list.
 * Mirrors src/utils/video/providers.ts.
 */
function rds_video_card_resolve( $url ) {
    if ( preg_match( '~(?:youtu\.be/|[?&]v=|youtube\.com/embed/)([\w-]{11})~i', $url, $m ) ) {
        $id = $m[1];
        return [
            'provider'  => 'youtube',
            'embed_url' => "https://www.youtube.com/embed/{$id}?autoplay=1&rel=0",
            'thumbnail' => "https://i.ytimg.com/vi/{$id}/maxresdefault.jpg",
            'fallbacks' => [
                "https://i.ytimg.com/vi/{$id}/sddefault.jpg",
                "https://i.ytimg.com/vi/{$id}/hqdefault.jpg",
                "https://i.ytimg.com/vi/{$id}/default.jpg",
            ],
        ];
    }

    if ( preg_match( '~vimeo\.com/(?:video/)?(\d+)~i', $url, $m ) ) {
        $id = $m[1];
        // WordPress's oEmbed cache handles the network call + caching.
        $oembed = _wp_oembed_get_object()->get_data( $url );
        return [
            'provider'  => 'vimeo',
            'embed_url' => "https://player.vimeo.com/video/{$id}?autoplay=1",
            'thumbnail' => $oembed && ! empty( $oembed->thumbnail_url ) ? $oembed->thumbnail_url : '',
            'fallbacks' => [],
        ];
    }

    if ( preg_match( '~ted\.com/talks/([\w_]+)~i', $url, $m ) ) {
        $slug = $m[1];
        // TED's oEmbed has unreliable CORS but works server-side.
        $oembed = _wp_oembed_get_object()->get_data( $url );
        return [
            'provider'  => 'ted',
            'embed_url' => "https://embed.ted.com/talks/{$slug}",
            'thumbnail' => $oembed && ! empty( $oembed->thumbnail_url ) ? $oembed->thumbnail_url : '',
            'fallbacks' => [],
        ];
    }

    return null;
}

function rds_video_card_play_icon() {
    return '<svg viewBox="0 0 68 48" focusable="false">
        <path class="cu-card__figure-play-bg" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"/>
        <path class="cu-card__figure-play-arrow" d="M 45,24 27,14 27,34"/>
    </svg>';
}
```

## 4. Use it in a block, template, or shortcode

### Static block — `render.php`

```php
<?php
$url   = $attributes['url']   ?? '';
$title = $attributes['title'] ?? '';
echo rds_video_card( $url, $title );
```

### Theme template

```php
<div class="video-grid">
    <?php
    foreach ( $videos as $video ) {
        echo rds_video_card( $video['source'], $video['title'] );
    }
    ?>
</div>
```

### Shortcode

```php
add_shortcode( 'rds_video', function ( $atts ) {
    $atts = shortcode_atts( [ 'url' => '', 'title' => '' ], $atts );
    return rds_video_card( $atts['url'], $atts['title'] );
} );
```

```
[rds_video url="https://www.youtube.com/watch?v=ScMzIvxBSi4" title="Welcome to Carleton"]
```

## 5. Listening for play events (optional analytics)

The vanilla script dispatches a bubbling `rds:video-play` `CustomEvent` when a user activates a card. Listen for it from any analytics script:

```js
document.addEventListener('rds:video-play', (event) => {
    const { embedUrl, provider } = event.detail;
    // gtag, plausible, matomo, etc.
});
```

The event fires on the `<figure>`, but since it bubbles you can attach a single listener at `document` level.

## Caveats

- **TED in the React app:** the oEmbed endpoint has unreliable CORS, so `useOEmbed` will return an error in the browser. WordPress avoids this by resolving server-side via `_wp_oembed_get_object()`. If you need TED on the React side, pass `thumbnail` manually or proxy the oEmbed call through your own endpoint.
- **YouTube `maxresdefault`:** not every video has a 1280×720 thumbnail. The `data-fallbacks` list walks `sddefault → hqdefault → default` automatically — no extra config needed.
- **Autoplay:** browsers require muted-only autoplay for unmuted iframes. The user click satisfies the autoplay policy on YouTube/Vimeo, so `autoplay=1` works.
