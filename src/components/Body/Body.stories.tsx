import type { Meta, StoryObj } from '@storybook/react-vite';
import { Body } from './Body';

const meta: Meta<typeof Body> = {
  title: 'Components/Template Parts/Body',
  component: Body,
  tags: ['autodocs', '!test'],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    a11y: {
      test: 'off',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Body>;

export const Primary: Story = {
  args: {
    children: 'Body component',
    className: 'cu-utils--alignfull',
  },
};
