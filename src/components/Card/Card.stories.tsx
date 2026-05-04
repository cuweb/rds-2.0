import type { Meta, StoryObj } from '@storybook/react-vite';
import { Column } from '../Column/Column';
import { Main } from '../Main/Main';
import { Card } from './Card';

import { NewsData } from '../../data/NewsData';
import { EventData } from '../../data/EventData';
import { PeopleData } from '../../data/PeopleData';
import { PageData } from '../../data/PageData';
import { VideoData } from '../../data/VideoData';

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

export const PeopleCards: Story = {
  render: () => (
    <Main>
      <Column cols="3">
        {PeopleData.slice(0, 24).map((item) => (
            <Card key={`people-${item.id}`} isCenter>
                <Card.Figure isRound>
                    <img src={item.image} alt={item.alt} width={280} height={280} />
                </Card.Figure>
                <Card.Header title={`${item.firstName} ${item.lastName}`} link={item.link} />
                <Card.Body>
                <Card.PeopleMeta jobTitle={item.jobTitle} phone={item.phone}>
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                </Card.PeopleMeta>
                </Card.Body>
            </Card>
        ))}
      </Column>
    </Main>
  ),
};

export const PageCards: Story = {
  render: () => (
    <Main>
      <Column cols="3">
        {PageData.slice(0, 24).map((item) => (
            <Card key={`page-${item.id}`}>
                <Card.Header
                    title={item.title}
                    link={item.link}
                    date={item.date}
                    datePrefix="Modified on "
                    datePosition="bottom"
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

export const VideoCards: Story = {
  render: () => (
    <Main>
      <Column cols="3">
        {VideoData.slice(0, 24).map((item) => (
            <Card key={`video-${item.id}`}>
                <Card.Video source={item.source} />
                <Card.Header title={item.title} />
            </Card>
        ))}
      </Column>
    </Main>
  ),
};