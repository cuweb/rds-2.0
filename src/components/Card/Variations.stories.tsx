import type { Meta, StoryObj } from '@storybook/react-vite';
import { Column } from '../Column/Column';
import { Main } from '../Main/Main';
import { Card } from './Card';
import { Icon } from '../Icon/Icon';
// import { Status } from '../Status/Status';

import { NewsData } from '../../data/NewsData';
import { EventData } from '../../data/EventData';
import { PeopleData } from '../../data/PeopleData';
import { IconData } from '../../data/IconData';
// import { StatData } from '../../data/StatData';
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

const EXCERPT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra laoreet lobortis. In hac habitasse platea dictumst. Nulla porta posuere est, aliquam mollis mi accumsan id.';

const news = NewsData[0];
const event = EventData[0];
const person = PeopleData[0];
const page = NewsData[1];
const featured = NewsData[2];
const icon = IconData[0];
// const hours = NewsData[3];
// const wave = NewsData[0];
// const stat = StatData[0];
const video = VideoData[0];

export const Variants: Story = {
  render: () => (
    <Main>
      {/* ───── Card variants (each variant rendered once) ───── */}

      <Column cols="3">
        {/* News card — figure + date + read time */}
        <Card>
          <Card.Figure>
            <img src={news.image} alt={news.alt} width="400" height="300" />
          </Card.Figure>
          <Card.Header
            title={news.title}
            link={news.link}
            datePrefix="Published on"
            date={news.date}
            readTime="7"
          />
          <Card.Body>
            <Card.Excerpt text={EXCERPT} />
          </Card.Body>
        </Card>

        {/* Event card — figure + date thumb + event meta */}
        <Card>
          <Card.Figure>
            <img src={event.image} alt={event.alt} width={400} height={175} />
          </Card.Figure>
          <Card.DateThumb startDate={event.startDate} endDate={event.endDate} />
          <Card.Header title={event.title} link={event.link} />
          <Card.Body>
            <Card.EventMeta
              startDateTime={event.startDate}
              endDateTime={event.endDate}
              onCampus={event.on_campus}
              onCampusBuilding={event.on_campus_building}
              onCampusRoomNumber={event.on_campus_room_number}
              eventAddress={event.event_address}
            />
          </Card.Body>
        </Card>

        {/* People card — round figure, centered */}
        <Card isCenter>
          <Card.Figure isRound>
            <img src={person.image} alt={person.alt} width={280} height={280} />
          </Card.Figure>
          <Card.Header title={`${person.firstName} ${person.lastName}`} link={person.link} />
          <Card.Body>
            <Card.PeopleMeta jobTitle={person.jobTitle} phone={person.phone}>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </Card.PeopleMeta>
          </Card.Body>
        </Card>

        {/* Video card */}
        <Card>
          <Card.VideoFigure url={video.source} title={video.title} />
          <Card.Header title={video.title} />
        </Card>

        {/* Page card — date below title */}
        <Card>
          <Card.Header
            title={page.title}
            link={page.link}
            date={page.date}
            datePrefix="Modified on "
            position="bottom"
          />
          <Card.Body>
            <Card.Excerpt text={EXCERPT} />
          </Card.Body>
        </Card>

        {/* Featured card — small image thumb, no hover */}
        <Card>
          <Card.Figure isSmall>
            <img src={featured.image} alt={featured.alt} width="400" height="300" />
          </Card.Figure>
          <Card.Header
            title={featured.title}
            link={featured.link}
          />
          <Card.Body>
            <Card.Excerpt text={EXCERPT} />
          </Card.Body>
        </Card>

        {/* Icon card */}
        <Card>
          <Card.Figure isIcon>
            <Icon name={icon.icon} size={40} color="var(--rds--color-primary)" />
          </Card.Figure>
          <Card.Header title={icon.title} link={icon.link} />
          <Card.Body>
            <Card.Excerpt text={EXCERPT} />
          </Card.Body>
        </Card>

        {/* Hours card — Status component */}
        {/* <Card>
          <Card.Figure>
            <img src={hours.image} alt={hours.alt} width="400" height="300" />
          </Card.Figure>
          <Card.Header title={hours.title} link={hours.link} />
          <Card.Body>
            <Card.Content>
              <Status variant="success">Open today until 8:00 PM</Status>
            </Card.Content>
          </Card.Body>
        </Card> */}

        {/* Wave card — grey background with decorative wave */}
        {/* <Card isGrey hasWave>
          <Card.Header title={wave.title} link={wave.link} />
          <Card.Body>
            <Card.Excerpt text={EXCERPT} />
          </Card.Body>
        </Card> */}

        {/* Stat card — left border, no hover */}
        {/* <Card leftBorder noHover>
          <Card.Stats stat={stat.stat} desc={stat.desc} />
        </Card> */}
      </Column>
    </Main>
  ),
};
