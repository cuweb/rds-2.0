import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const colorOptions = ['red', 'grey', 'dark-grey', 'black', 'white'] as const;

const meta: Meta<typeof Button> = {
  title: 'Components/Elements/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: colorOptions,
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
    },
    onClick: { action: 'clicked' },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    title: 'Primary Red',
    color: 'red',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Download',
    color: 'dark-grey',
    icon: 'circle-down',
  },
};

export const Small: Story = {
  args: {
    title: 'Download',
    color: 'dark-grey',
    icon: 'circle-down',
    isSmall: true,
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {colorOptions.map((color) => (
        <Button key={color} title={color} color={color} />
      ))}
    </div>
  ),
};
