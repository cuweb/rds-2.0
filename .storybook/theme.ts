import { create } from 'storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'RDS 2.0',
  brandUrl: 'https://carleton.ca',

  // Colors
  colorPrimary: '#bf112b',
  colorSecondary: '#0d3d6b',

  // UI
  appBg: '#f5f5f5',
  appContentBg: '#ffffff',
  appBorderColor: '#e0e0e0',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: '"Fira Code", "Consolas", monospace',

  // Toolbar
  barBg: '#ffffff',
  barTextColor: '#4a4a4a',
  barSelectedColor: '#bf112b',
});
