import type { Meta, StoryObj } from '@storybook/react-vite';
import { FooterStandard } from './FooterStandard';

const meta: Meta<typeof FooterStandard> = {
  title: 'Components/Layout/FooterStandard',
  component: FooterStandard,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['standard', 'athletics', 'futureFunder'],
    },
  },
  parameters: {
    layout: 'fullscreen',
    controls: {
      sort: 'requiredFirst',
    },
  },
};
export default meta;
type Story = StoryObj<typeof FooterStandard>;

export const Standard: Story = {
  render: (args) => <FooterStandard {...args} />,
};
Standard.args = { type: 'standard' };

export const Athletics: Story = {
  render: (args) => <FooterStandard {...args} />,
};
Athletics.args = { type: 'athletics' };

export const FutureFunder: Story = {
  render: (args) => <FooterStandard {...args} />,
};
FutureFunder.args = { type: 'futureFunder' };
