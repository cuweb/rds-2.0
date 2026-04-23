// Import base styles so Vite extracts them to dist/style.css
import './styles/main.scss';

// Layouts
export { Article } from './components/Article/Article';
export { Aside } from './components/Aside/Aside';
export { Body } from './components/Body/Body';
export { Column } from './components/Column/Column';
export { Main } from './components/Main/Main';
export { Section } from './components/Section/Section';

// Components
export { Badge } from './components/Badge/Badge';
export { BadgeGroup } from './components/BadgeGroup/BadgeGroup';
export { Button } from './components/Button/Button';
export { ButtonGroup } from './components/ButtonGroup/ButtonGroup';

// Icon
export { Icon } from './components/Icon/Icon';
export type { IconProps, IconName } from './components/Icon';
export { iconList } from './components/Icon/iconList';
export type { IconListEntry } from './components/Icon/iconList';
export * from './components/Icon/generated/registry';

// LinkProvider
export { LinkProvider } from './components/LinkProvider/index';
