import type { Meta, StoryObj } from '@storybook/react-vite';
import { Column } from '../Column/Column';
import { Main } from '../Main/Main';
import { Card } from './Card';

import { NewsData } from '../../data/NewsData';

const meta: Meta<typeof Card> = {
  title: 'Components/Elements/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const EXCERPT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra laoreet lobortis. In hac habitasse platea dictumst. Nulla porta posuere est, aliquam mollis mi accumsan id. Morbi mauris ex, gravida eu sodales sed, tempor vel mauris.';

export const Primary: Story = {
  render: (args) => (
    <Main>
      <Card {...args}>
        <Card.Header title="How to Write for the Web" />
        <Card.Body>
          <Card.Excerpt text={EXCERPT} />
        </Card.Body>
      </Card>
    </Main>
  ),
};

export const NewsCard: Story = {
  render: (args) => (
    <Main>
      <Column cols="2">
        {NewsData.slice(0, 2).map(({ id, link, title, image, alt, date }) => (
          <Card key={id} {...args}>
            <Card.Figure>
              <img src={image} alt={alt} width="400" height="300" />
            </Card.Figure>
            <Card.Header title={title} date={date} readTime="7" />
            <Card.Body>
              <Card.Excerpt text={EXCERPT} />
            </Card.Body>
          </Card>
        ))}
      </Column>
    </Main>
  ),
};
