import type { StatusVariant } from '../components/Status/Status';

// Web-dev infrastructure components with operational state.
// `state` maps directly to a Status variant — registry default labels
// (Operational / Degraded / Outage / Maintenance) drive the visible text.
export const SystemData: Array<{
  id: number;
  link: string;
  title: string;
  image: string;
  alt: string;
  excerpt: string;
  state: StatusVariant;
}> = [
  {
    id: 1,
    link: '#',
    title: 'API Gateway',
    image: 'https://picsum.photos/seed/system1/600/400',
    alt: 'Network topology diagram on a monitor',
    excerpt: 'Routes incoming requests to backend services. Rate-limited per consumer key, with circuit breakers around upstream timeouts.',
    state: 'success',
  },
  {
    id: 2,
    link: '#',
    title: 'Authentication Service',
    image: 'https://picsum.photos/seed/system2/600/400',
    alt: 'Security key on a keyboard',
    excerpt: 'OAuth + SAML SSO provider for first-party apps. Session tokens rotate every 30 minutes via background refresh.',
    state: 'success',
  },
  {
    id: 3,
    link: '#',
    title: 'CDN — US-East Region',
    image: 'https://picsum.photos/seed/system3/600/400',
    alt: 'World map with network edge nodes',
    excerpt: 'Serves static assets from the closest edge to North American users. Cache TTL is 24 hours with on-demand purge.',
    state: 'warning',
  },
  {
    id: 4,
    link: '#',
    title: 'Primary Database Cluster',
    image: 'https://picsum.photos/seed/system4/600/400',
    alt: 'Database server rack with status LEDs',
    excerpt: 'Postgres 15 with two read replicas and a hot standby. Read traffic auto-balances; writes go to the primary.',
    state: 'error',
  },
  {
    id: 5,
    link: '#',
    title: 'Build Pipeline',
    image: 'https://picsum.photos/seed/system5/600/400',
    alt: 'CI/CD dashboard showing pipeline stages',
    excerpt: 'CI/CD orchestrator running test, build, and deploy stages on every pull request and main-branch merge.',
    state: 'success',
  },
  {
    id: 6,
    link: '#',
    title: 'Search Index',
    image: 'https://picsum.photos/seed/system6/600/400',
    alt: 'Search results overlay on a screen',
    excerpt: 'Full-text and faceted search across the public site. Re-indexed weekly, with incremental updates every 15 minutes.',
    state: 'info',
  },
];
