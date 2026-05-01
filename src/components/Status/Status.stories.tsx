import type { Meta, StoryObj } from '@storybook/react-vite';
import { Status } from './Status';

const meta: Meta<typeof Status> = {
  title: 'Components/Status',
  component: Status,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['success', 'error', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Open today until 8:00 PM',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Closed until tomorrow',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Closes in 30 minutes',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Reduced hours this week',
  },
};
