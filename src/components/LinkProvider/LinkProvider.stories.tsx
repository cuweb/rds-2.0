import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { LinkProvider } from './index';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof LinkProvider> = {
  title: 'Components/Utilities/LinkProvider',
  component: LinkProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Injects a framework-specific Link component (Next.js `<Link>`, React Router `<Link>`, etc.) into any child component that renders links. Falls back to a plain `<a>` when no provider wraps the tree.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkProvider>;

const MockRouterLink = ({ children, ...rest }: ComponentProps<'a'>) => (
  <a {...rest} data-mock-router="true">
    {children}
  </a>
);

export const DefaultFallback: Story = {
  name: 'Default (plain anchor)',
  render: () => <Badge text="Default anchor" href="https://carleton.ca" />,
};

export const WithCustomComponent: Story = {
  name: 'With custom Link component',
  render: () => (
    <LinkProvider component={MockRouterLink}>
      <Badge text="Injected router link" href="/docs" />
    </LinkProvider>
  ),
};
