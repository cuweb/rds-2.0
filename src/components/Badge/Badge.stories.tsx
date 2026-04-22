import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const colorOptions = [
  'grey',
  'white',
  'black80',
  'white80',
  'green',
  'red',
  'yellow',
  'blue',
  'purple',
  'teal',
] as const;

const radiusOptions = ['sm', 'md', 'lg', 'full', 'none'] as const;

const meta: Meta<typeof Badge> = {
  title: 'Components/Elements/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: colorOptions,
    },
    rounded: {
      control: 'inline-radio',
      options: radiusOptions,
    },
    href: {
      control: 'text',
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    text: 'Badge Example',
    href: 'https://github.com/cuweb/rds-2.0',
    rounded: 'full',
    color: 'grey',
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {colorOptions.map((color) => (
        <Badge key={color} text={color} color={color} />
      ))}
    </div>
  ),
};

export const AllRadii: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {radiusOptions.map((rounded) => (
        <Badge key={rounded} text={rounded} rounded={rounded} />
      ))}
    </div>
  ),
};
