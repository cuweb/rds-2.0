import type { Meta, StoryObj } from '@storybook/react-vite';
import { Column } from '../Column/Column';
import { Main } from '../Main/Main';
import { Card } from './Card';

import { NewsData } from '../../data/NewsData';

const meta: Meta = {
  title: 'Components/Elements/Card',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

const EXCERPT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra laoreet lobortis. In hac habitasse platea dictumst. Nulla porta posuere est, aliquam mollis mi accumsan id.';

export const NewsCards: Story = {
  render: () => (
    <Main>
      <Column cols="3">
        {NewsData.slice(0, 3).map((item) => (
            <Card key={`c2-${item.id}`}>
                <Card.Figure>
                    <img src={item.image} alt={item.alt} width="400" height="300" />
                </Card.Figure>
                <Card.Header
                    title={item.title}
                    link={item.link}
                    date={item.date}
                    readTime="7"
                />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
            </Card>
        ))}
      </Column>
    </Main>
  ),
};