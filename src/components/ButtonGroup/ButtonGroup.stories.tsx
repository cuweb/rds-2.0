import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';

const gapOptions = ['sm', 'md', 'lg'] as const;
const alignOptions = ['start', 'center', 'end'] as const;

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Elements/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'inline-radio',
      options: alignOptions,
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const buttons = (
  <>
    <Button title="Primary Red" />
    <Button title="Dark Grey" color="dark-grey" />
    <Button title="Light Grey" color="grey" />
  </>
);

export const Primary: Story = {
  render: (args) => <ButtonGroup {...args}>{buttons}</ButtonGroup>,
};

export const Centered: Story = {
  args: {
    align: 'center',
  },
  render: (args) => <ButtonGroup {...args}>{buttons}</ButtonGroup>,
};

export const AllGaps: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      {gapOptions.map((gap) => (
        <ButtonGroup key={gap}>
          {buttons}
        </ButtonGroup>
      ))}
    </div>
  ),
};
