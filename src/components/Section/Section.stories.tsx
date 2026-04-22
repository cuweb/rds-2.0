import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';
import { MultiParagraph } from '../../data/storyContent';

const meta: Meta<typeof Section> = {
  title: 'Components/Layout/Section',
  component: Section,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'inline-radio',
      options: ['section', 'div'],
    },
    maxWidth: {
      control: 'select',
      options: ['aligncontent', 'alignwide', 'alignfull'],
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Primary: Story = {
  args: {
    children: <MultiParagraph count={2} />,
  },
};
