import type { Meta, StoryObj } from '@storybook/react-vite';
import { Article } from './Article';
import { Main } from '../Main/Main';
import { Section } from '../Section/Section';
import { ArticleData as data } from '../../data/ArticleData';
import { MultiParagraph } from '../../data/storyContent';

const meta: Meta<typeof Article> = {
  title: 'Components/Template Parts/Article',
  component: Article,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Article>;

export const Primary: Story = {
  args: {
    children: 'Article HTML5 tag as component',
  },
};

export const WithMainAndSection: Story = {
  render: () => (
    <Main>
      <Section>
        <Article>
          <MultiParagraph count={2} />
        </Article>
      </Section>
    </Main>
  ),
};

export const ContentProp: Story = {
  name: 'Content as a Prop',
  args: {
    content: data,
  },
  render: (args) => (
    <Main>
      <Section>
        <Article {...args} />
      </Section>
    </Main>
  ),
};
