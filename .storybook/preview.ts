import type { Preview } from '@storybook/react-vite';
import '../src/styles/main.scss';
// Dev-only: override --rds--asset-* to point at public/_assets served by Vite at /_assets
import '../src/styles/auto/_assets-dev.scss';

const unwrapRender = (code: string): string => {
  if (!code) return code;
  const match = code.match(
    /^\s*\{[\s\S]*?render:\s*\(?[\w,\s]*\)?\s*=>\s*([\s\S]+?)\s*,?\s*\}\s*$/,
  );
  if (!match) return code;
  let inner = match[1].trim();
  if (inner.startsWith('(') && inner.endsWith(')')) {
    inner = inner.slice(1, -1).trim();
  }
  const lines = inner.split('\n');
  const indents = lines
    .filter((l) => l.trim())
    .map((l) => l.match(/^ */)?.[0].length ?? 0);
  const minIndent = indents.length ? Math.min(...indents) : 0;
  return lines
    .map((l) => l.slice(minIndent))
    .join('\n')
    .trim();
};

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
    docs: {
      source: {
        transform: unwrapRender,
      },
    },
    options: {
      storySort: {
        order: [
          'Overview',
          ['About RDS', 'Getting Started', 'Changelog', 'Stylebook'],
          'Templates',
          'Components',
          'Layouts',
          '*',
        ],
      },
    },
  },
};

export default preview;
