import { useEffect, useState } from 'react';
import { detectProvider } from './providers';
import type { OEmbedData, UseOEmbedResult } from './types';

const cache = new Map<string, OEmbedData>();
const inflight = new Map<string, Promise<OEmbedData>>();

export interface UseOEmbedOptions {
  /** Skip network calls; only resolve via deterministic fast paths (e.g. YouTube). */
  skipNetwork?: boolean;
}

const fetchOEmbed = async (url: string, signal: AbortSignal): Promise<OEmbedData> => {
  const provider = detectProvider(url);
  if (!provider) {
    throw new Error(`Unsupported video URL: ${url}`);
  }

  const id = provider.parseId(url);
  if (!id) {
    throw new Error(`Could not parse video ID from URL: ${url}`);
  }

  // Fast path: YouTube thumbnail URL is deterministic.
  // Skip the oEmbed call unless we need title/author later.
  if (provider.name === 'youtube' && provider.buildThumbnailUrl) {
    return {
      provider: 'youtube',
      thumbnail: provider.buildThumbnailUrl(id),
    };
  }

  if (!provider.buildOEmbedUrl) {
    throw new Error(`Provider ${provider.name} has no oEmbed endpoint`);
  }

  const res = await fetch(provider.buildOEmbedUrl(url), { signal });
  if (!res.ok) {
    throw new Error(`oEmbed request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as {
    thumbnail_url?: string;
    title?: string;
    author_name?: string;
    duration?: number;
  };

  return {
    provider: provider.name,
    thumbnail: json.thumbnail_url,
    title: json.title,
    author: json.author_name,
    duration: json.duration,
  };
};

const initialFor = (url: string | undefined, skipNetwork: boolean): UseOEmbedResult => {
  if (!url) return { data: null, loading: false, error: null };
  const cached = cache.get(url);
  if (cached) return { data: cached, loading: false, error: null };
  return { data: null, loading: !skipNetwork, error: null };
};

export const useOEmbed = (url: string | undefined, options?: UseOEmbedOptions): UseOEmbedResult => {
  const skipNetwork = !!options?.skipNetwork;
  const [state, setState] = useState<UseOEmbedResult>(() => initialFor(url, skipNetwork));

  // Reset state synchronously during render when url or skipNetwork changes.
  // See https://react.dev/reference/react/useState#storing-information-from-previous-renders
  const [trackedUrl, setTrackedUrl] = useState(url);
  const [trackedSkip, setTrackedSkip] = useState(skipNetwork);
  if (url !== trackedUrl || skipNetwork !== trackedSkip) {
    setTrackedUrl(url);
    setTrackedSkip(skipNetwork);
    setState(initialFor(url, skipNetwork));
  }

  useEffect(() => {
    if (!url) return;
    if (cache.has(url)) return;
    if (skipNetwork) return;

    const controller = new AbortController();

    let promise = inflight.get(url);
    if (!promise) {
      promise = fetchOEmbed(url, controller.signal);
      inflight.set(url, promise);
      // Clean up the inflight entry when the request settles. The trailing
      // .catch swallows the rejection on this chain so an aborted fetch
      // doesn't surface as an unhandled rejection — each subscriber below
      // attaches its own .then/.catch on the underlying `promise`.
      promise.finally(() => inflight.delete(url)).catch(() => {});
    }

    promise
      .then((result) => {
        if (controller.signal.aborted) return;
        cache.set(url, result);
        setState({ data: result, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        if (err instanceof Error && err.name === 'AbortError') return;
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      });

    return () => {
      controller.abort();
    };
  }, [url, skipNetwork]);

  return state;
};

/** Test-only: clear the in-memory oEmbed cache. */
export const __clearOEmbedCache = () => {
  cache.clear();
  inflight.clear();
};
