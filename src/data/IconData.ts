import type { IconName } from '@cuweb/rds-icons';

export interface IconDataItem {
  id: number;
  link: string;
  title: string;
  excerpt: string;
  icon: IconName;
}

export const IconData: IconDataItem[] = [
  {
    id: 1,
    link: '#',
    title: 'Library Resources',
    excerpt: 'Readers skim first, so lead with purpose, trim filler, and make every heading earn its click.',
    icon: 'book',
  },
  {
    id: 2,
    link: '#',
    title: 'Student Services',
    excerpt: 'Accessibility starts early: strong contrast, clear focus states, and components that behave with keyboards.',
    icon: 'users',
  },
  {
    id: 3,
    link: '#',
    title: 'Campus Maps',
    excerpt: 'Modern design systems thrive when tokens, docs, and testing pipelines evolve together instead of in silos.',
    icon: 'map',
  },
  {
    id: 4,
    link: '#',
    title: 'Academic Calendar',
    excerpt: 'Block-first workflows move faster when patterns are opinionated, reusable, and easy for editors to trust.',
    icon: 'calendar-days',
  },
  {
    id: 5,
    link: '#',
    title: 'Research Support',
    excerpt: 'Container queries let components respond to their own space, reducing brittle page-level breakpoint hacks.',
    icon: 'abacus',
  },
  {
    id: 6,
    link: '#',
    title: 'Campus Directory',
    excerpt: 'Lean typings, strict unions, and shared utility types can prevent regressions without slowing feature work.',
    icon: 'address-book',
  },
  {
    id: 7,
    link: '#',
    title: 'Residence Services',
    excerpt: 'Teams now tokenize spacing, motion, and elevation so themes stay consistent across apps and CMS surfaces.',
    icon: 'apartment',
  },
  {
    id: 8,
    link: '#',
    title: 'Important Deadlines',
    excerpt: 'Responsive sources, smart placeholders, and precise dimensions are still the quickest route to faster pages.',
    icon: 'alarm-clock',
  },
  {
    id: 9,
    link: '#',
    title: 'Student Life',
    excerpt: 'Most interfaces improve when local state stays local and shared state is promoted only when the pain is real.',
    icon: 'balloons',
  },
  {
    id: 10,
    link: '#',
    title: 'Athletics and Recreation',
    excerpt: 'Automated axe checks catch repeat issues early, but pairing them with manual audits finds the deeper gaps.',
    icon: 'basketball-hoop',
  },
  {
    id: 11,
    link: '#',
    title: 'Sustainability Initiatives',
    excerpt: 'Validation, hint text, and error states belong in shared primitives so teams stop reinventing basic UX.',
    icon: 'atom',
  },
  {
    id: 12,
    link: '#',
    title: 'Campus Newsroom',
    excerpt: 'Choose rendering strategy by content freshness, not trend cycles, and measure outcomes before switching.',
    icon: 'newspaper',
  },
];
