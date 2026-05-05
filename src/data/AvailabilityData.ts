import type { StatusVariant } from '../components/Status/Status';

// Web-dev resources / environments with availability state.
// `state` maps directly to a Status variant — registry default labels (Available /
// Limited availability / Unavailable) drive the visible text unless a story
// overrides via children.
export const AvailabilityData: Array<{
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
    title: 'Staging Environment',
    image: 'https://picsum.photos/seed/avail1/600/400',
    alt: 'Server racks with status lights',
    excerpt: 'Pre-production mirror of the main app. Auto-deploys from the develop branch on every merge.',
    state: 'success',
  },
  {
    id: 2,
    link: '#',
    title: 'API Sandbox',
    image: 'https://picsum.photos/seed/avail2/600/400',
    alt: 'Developer reading API documentation',
    excerpt: 'Read-only public endpoint with seed data. Rate-limited to 100 requests per minute per anonymous client.',
    state: 'success',
  },
  {
    id: 3,
    link: '#',
    title: 'Beta Feature: AI Code Assist',
    image: 'https://picsum.photos/seed/avail3/600/400',
    alt: 'Code editor with inline suggestions',
    excerpt: 'Inline completions powered by an internal LLM gateway. Currently capped at 50 invited teams while we tune latency.',
    state: 'warning',
  },
  {
    id: 4,
    link: '#',
    title: 'Code Playground',
    image: 'https://picsum.photos/seed/avail4/600/400',
    alt: 'Web-based IDE with split panels',
    excerpt: 'Browser-based scratchpad for trying snippets against the latest design-system bundle. No login, no persistence.',
    state: 'success',
  },
  {
    id: 5,
    link: '#',
    title: 'Demo Dataset Mirror',
    image: 'https://picsum.photos/seed/avail5/600/400',
    alt: 'Database visualisation dashboard',
    excerpt: 'Anonymised production dataset for local development. The replication job runs nightly; expect a few hours of staleness.',
    state: 'warning',
  },
  {
    id: 6,
    link: '#',
    title: 'Internal Component Storybook',
    image: 'https://picsum.photos/seed/avail6/600/400',
    alt: 'Component library catalog interface',
    excerpt: 'Visual catalog for unreleased components. Currently offline while the design tokens migration finishes.',
    state: 'error',
  },
];
