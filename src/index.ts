// Main library entry — re-exports all components

// Import base styles so Vite extracts them to dist/style.css
import './styles/main.scss';

// Layouts
export { Article } from './components/Article/Article';
export { Aside } from './components/Aside/Aside';
export { Body } from './components/Body/Body';
export { Column } from './components/Column/Column';
export { Main } from './components/Main/Main';
export { Section } from './components/Section/Section';
