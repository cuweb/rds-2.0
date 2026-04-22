import type { Meta, StoryObj } from '@storybook/react-vite';
import { Main } from '../Main/Main';
import { Column } from './Column';
import { MultiParagraph } from '../../data/storyContent';

const meta: Meta<typeof Column> = {
  title: 'Components/Layout/Column',
  component: Column,
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'inline-radio',
      options: ['1', '2', '3', '4', '1/3', '2/3'],
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Column>;

export const Primary: Story = {
  args: {
    cols: '2',
  },
  render: (args) => (
    <Main>
      <Column {...args}>
        <Column.Content>
          <MultiParagraph count={2} />
        </Column.Content>
        <Column.Content>
          <MultiParagraph count={2} />
        </Column.Content>
        {(args.cols === '3' || args.cols === '4') && (
          <Column.Content>
            <MultiParagraph count={2} />
          </Column.Content>
        )}
        {args.cols === '4' && (
          <Column.Content>
            <MultiParagraph count={2} />
          </Column.Content>
        )}
      </Column>
    </Main>
  ),
};
