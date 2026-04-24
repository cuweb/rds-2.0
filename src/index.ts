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
export { CookieBanner } from './components/CookieBanner/CookieBanner';
export type { CookieBannerProps } from './components/CookieBanner/CookieBanner';
export { DepartmentBar } from './components/DepartmentBar/DepartmentBar';
export type { DepartmentBarProps } from './components/DepartmentBar/DepartmentBar';
export { Footer } from './components/Footer/Footer';
export type { FooterProps } from './components/Footer/Footer';
export { FooterStandard } from './components/FooterStandard/FooterStandard';
export type { FooterStandardProps } from './components/FooterStandard/FooterStandard';
export type { FooterType } from './data/FooterData';

// Icon — the Icon component lives here; icon names, map, and list come from the
// private @cuweb/rds-icons peer dependency. Consumers import named
// icons directly from that package.
export { Icon } from './components/Icon/Icon';
export type { IconProps } from './components/Icon';
export type { IconName } from '@cuweb/rds-icons';

// LinkProvider
export { LinkProvider } from './components/LinkProvider/index';
