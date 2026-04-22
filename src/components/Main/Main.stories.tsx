import type { Meta, StoryObj } from '@storybook/react-vite';
import { Main } from './Main';
import { MultiParagraph } from '../../data/storyContent';

const meta: Meta<typeof Main> = {
  title: 'Components/Layout/Main',
  component: Main,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Main>;

export const Primary: Story = {
  args: {
    children: <MultiParagraph count={2} />,
  },
};
