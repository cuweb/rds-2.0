import type { Meta, StoryObj } from '@storybook/react-vite';
import { Main } from '../Main/Main';
import { Section } from '../Section/Section';
import { Column } from '../Column/Column';
import { Aside } from './Aside';
import { MultiParagraph, SampleList } from '../../data/storyContent';

const meta: Meta<typeof Aside> = {
  title: 'Components/Layout/Aside',
  component: Aside,
  tags: ['autodocs'],
  argTypes: {
    topSpace: {
      control: { type: 'number', min: 0 },
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Aside>;

export const Primary: Story = {
  args: {
    children: 'Aside HTML5 tag as component',
  },
};

export const RightSidebar: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'landmark-complementary-is-top-level', enabled: false }],
      },
    },
  },
  render: () => (
    <Main>
      <Section>
        <Column cols="2/3">
          <Column.Content>
            <MultiParagraph count={4} />
          </Column.Content>
          <Aside>
            <MultiParagraph count={1} />
            <SampleList />
          </Aside>
        </Column>
      </Section>
    </Main>
  ),
};

export const LeftSidebarSticky: Story = {
  args: {
    isSticky: true,
    topSpace: 16,
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'landmark-complementary-is-top-level', enabled: false }],
      },
    },
  },
  render: (args) => (
    <Main>
      <Section>
        <Column cols="1/3">
          <Aside {...args}>
            <MultiParagraph count={1} />
            <SampleList />
          </Aside>
          <Column.Content>
            <MultiParagraph count={4} />
          </Column.Content>
        </Column>
      </Section>
    </Main>
  ),
};
