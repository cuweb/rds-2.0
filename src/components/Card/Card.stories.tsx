import type { Meta, StoryObj } from '@storybook/react-vite';
import { Column } from '../Column/Column';
import { Main } from '../Main/Main';
import { Card } from './Card';

import { NewsData } from '../../data/NewsData';
import { EventData } from '../../data/EventData';

const meta: Meta = {
  title: 'Components/Elements/Card',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const NewsCards: Story = {
  render: () => (
    <Main>
      <Column cols="3">
        {NewsData.slice(0, 24).map((item) => (
            <Card key={`news-${item.id}`}>
                <Card.Figure>
                    <img src={item.image} alt={item.alt} width="600" height="400" />
                </Card.Figure>
                <Card.Header
                    title={item.title}
                    link={item.link}
                    date={item.date}
                    readTime="7"
                />
                <Card.Body>
                    <Card.Excerpt text={item.excerpt} />
                </Card.Body>
            </Card>
        ))}
      </Column>
    </Main>
  ),
};

export const EventCards: Story = {
  render: () => (
    <Main>
      <Column cols="3">
        {EventData.slice(0, 24).map((item) => (
            <Card key={`event-${item.id}`}>
                <Card.Figure>
                    <img src={item.image} alt={item.alt} width="600" height="400" />
                </Card.Figure>
                <Card.DateThumb startDate={item.startDate} endDate={item.endDate} />
                <Card.Header title={item.title} link={item.link} />
                <Card.Body>
                    <Card.EventMeta
                        startDateTime={item.startDate}
                        endDateTime={item.endDate}
                        onCampus={item.on_campus}
                        onCampusBuilding={item.on_campus_building}
                        onCampusRoomNumber={item.on_campus_room_number}
                        eventAddress={item.event_address}
                    />
                </Card.Body>
            </Card>
        ))}
      </Column>
    </Main>
  ),
};