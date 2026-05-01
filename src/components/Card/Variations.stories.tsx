import type { Meta, StoryObj } from '@storybook/react-vite';
import { Column } from '../Column/Column';
import { Main } from '../Main/Main';
import { Section } from '../Section/Section';
import { Card } from './Card';
import { Status } from '../Status/Status';

import { NewsData } from '../../data/NewsData';
import { EventData } from '../../data/EventData';
import { IconData } from '../../data/IconData';
import { PeopleData } from '../../data/PeopleData';
import { StatData } from '../../data/StatData';
import { VideoData } from '../../data/VideoData';

const meta: Meta = {
  title: 'Components/Layout/Card',
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
const page = NewsData[1];
const featured = NewsData[2];
const icon = IconData[0];
const person = PeopleData[0];
const hours = NewsData[3];
const wave = NewsData[0];
const stat = StatData[0];
const video = VideoData[0];

export const All: Story = {
  render: () => (
    <Main>
        <Column cols="2">
            <Card>
                <Card.Figure>
                    <img src={news.image} alt={news.alt} width="400" height="300" />
                </Card.Figure>
                <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
                <Card.Footer>
                    <a href={news.link} className="cu-button cu-button--red cu-button--small">
                    Read more
                    </a>
                </Card.Footer>
            </Card>

            <Card>
                <Card.Figure>
                    <img src={news.image} alt={news.alt} width="400" height="300" />
                </Card.Figure>
                <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
                <Card.Footer>
                    <a href={news.link} className="cu-button cu-button--red cu-button--small">
                    Read more
                    </a>
                </Card.Footer>
            </Card>
        </Column>
        
        {/* <Column cols="3">
            <Card>
                <Card.Figure>
                    <img src={news.image} alt={news.alt} width="400" height="300" />
                </Card.Figure>
                <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
                <Card.Footer>
                    <a href={news.link} className="cu-button cu-button--red cu-button--small">
                    Read more
                    </a>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Figure>
                    <img src={news.image} alt={news.alt} width="400" height="300" />
                </Card.Figure>
                <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
                <Card.Footer>
                    <a href={news.link} className="cu-button cu-button--red cu-button--small">
                    Read more
                    </a>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Figure>
                    <img src={news.image} alt={news.alt} width="400" height="300" />
                </Card.Figure>
                <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
                <Card.Footer>
                    <a href={news.link} className="cu-button cu-button--red cu-button--small">
                    Read more
                    </a>
                </Card.Footer>
            </Card>
        </Column> */}

        {/* <Column cols="2">
            <Card>
            <Card.Figure>
                <img src={news.image} alt={news.alt} width="400" height="300" />
            </Card.Figure>
            <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
            <Card.Body>
                <Card.Excerpt text={EXCERPT} />
            </Card.Body>
            <Card.Footer>
                <a href={news.link} className="cu-button cu-button--red cu-button--small">
                Read more
                </a>
            </Card.Footer>
            </Card>
            <Card>
            <Card.Figure>
                <img src={news.image} alt={news.alt} width="400" height="300" />
            </Card.Figure>
            <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
            <Card.Body>
                <Card.Excerpt text={EXCERPT} />
            </Card.Body>
            <Card.Footer>
                <a href={news.link} className="cu-button cu-button--red cu-button--small">
                Read more
                </a>
            </Card.Footer>
            </Card>
        </Column> */}
        
        {/* <Column cols="4">
            <Card>
            <Card.Figure>
                <img src={news.image} alt={news.alt} width="400" height="300" />
            </Card.Figure>
            <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
            <Card.Body>
                <Card.Excerpt text={EXCERPT} />
            </Card.Body>
            <Card.Footer>
                <a href={news.link} className="cu-button cu-button--red cu-button--small">
                Read more
                </a>
            </Card.Footer>
            </Card>
            <Card>
            <Card.Figure>
                <img src={news.image} alt={news.alt} width="400" height="300" />
            </Card.Figure>
            <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
            <Card.Body>
                <Card.Excerpt text={EXCERPT} />
            </Card.Body>
            <Card.Footer>
                <a href={news.link} className="cu-button cu-button--red cu-button--small">
                Read more
                </a>
            </Card.Footer>
            </Card>
            <Card>
            <Card.Figure>
                <img src={news.image} alt={news.alt} width="400" height="300" />
            </Card.Figure>
            <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
            <Card.Body>
                <Card.Excerpt text={EXCERPT} />
            </Card.Body>
            <Card.Footer>
                <a href={news.link} className="cu-button cu-button--red cu-button--small">
                Read more
                </a>
            </Card.Footer>
            </Card>
            <Card>
            <Card.Figure>
                <img src={news.image} alt={news.alt} width="400" height="300" />
            </Card.Figure>
            <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
            <Card.Body>
                <Card.Excerpt text={EXCERPT} />
            </Card.Body>
            <Card.Footer>
                <a href={news.link} className="cu-button cu-button--red cu-button--small">
                Read more
                </a>
            </Card.Footer>
            </Card>
        </Column> */}

        {/* <div style={{ height: '800px' }} /> */}
        
        {/* <Column cols="3"> */}
            {/* News card — figure + date + read time */}
            {/* <Card>
                <Card.Figure>
                    <img src={news.image} alt={news.alt} width="400" height="300" />
                </Card.Figure>
                <Card.Header title={news.title} datePrefix="Published on" date={news.date} readTime="7" />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
                <Card.Footer>
                    <a href={news.link} className="cu-button cu-button--red cu-button--small">
                    Read more
                    </a>
                </Card.Footer>
            </Card> */}

            {/* Event card — figure + date thumb + event meta */}
            {/* <Card>
                <Card.Figure>
                    <img src={event.image} alt={event.alt} width={400} height={175} />
                </Card.Figure>
                <Card.DateThumb startDate={event.startDate} endDate={event.endDate} />
                <Card.Header title={event.title} />
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
                <Card.Footer>
                    <a href={event.link} className="cu-button cu-button--red cu-button--small">
                    More info
                    </a>
                </Card.Footer>
            </Card> */}

            {/* Page card — date below title */}
            {/* <Card>
                <Card.Header
                    title={page.title}
                    date={page.date}
                    datePrefix="Modified on "
                    datePosition="bottom"
                />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
                <Card.Footer>
                    <a href={page.link} className="cu-button cu-button--red cu-button--small">
                    Read more
                    </a>
                </Card.Footer>
            </Card> */}

            {/* Featured card — small image thumb, no hover */}
            {/* <Card noHover>
                <Card.ImageThumb>
                    <img src={featured.image} alt={featured.alt} width="200" height="133" />
                </Card.ImageThumb>
                <Card.Header title={featured.title} />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
                <Card.Footer>
                    <a href={featured.link} className="cu-button cu-button--red cu-button--small">
                    Get informed
                    </a>
                </Card.Footer>
            </Card> */}

            {/* Icon card */}
            {/* <Card>
                <Card.IconThumb icon={icon.icon} />
                <Card.Header title={icon.title} />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
                <Card.Footer>
                    <a href={icon.link} className="cu-button cu-button--red cu-button--small">
                    More info
                    </a>
                </Card.Footer>
            </Card> */}

            {/* People card — round figure, centered */}
            {/* <Card isCenter>
                <Card.Figure isRound>
                    <img src={person.image} alt={person.alt} width={280} height={280} />
                </Card.Figure>
                <Card.Header title={`${person.firstName} ${person.lastName}`} />
                <Card.Body>
                    <Card.PeopleMeta jobTitle={person.jobTitle} phone={person.phone}>
                    <a href={`mailto:${person.email}`}>{person.email}</a>
                    </Card.PeopleMeta>
                </Card.Body>
                <Card.Footer>
                    <a href={person.link} className="cu-button cu-button--red cu-button--small">
                    More info
                    </a>
                </Card.Footer>
            </Card> */}

            {/* Hours card — Status component */}
            {/* <Card>
                <Card.Figure>
                    <img src={hours.image} alt={hours.alt} width="400" height="300" />
                </Card.Figure>
                <Card.Header title={hours.title} />
                <Card.Body>
                    <Card.Content>
                    <Status variant="success">Open today until 8:00 PM</Status>
                    </Card.Content>
                </Card.Body>
                <Card.Footer>
                    <a href={hours.link} className="cu-button cu-button--red cu-button--small">
                    Read more
                    </a>
                </Card.Footer>
            </Card> */}

            {/* Wave card — grey background with decorative wave */}
            {/* <Card isGrey hasWave>
                <Card.Header title={wave.title} />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
                <Card.Footer>
                    <a href={wave.link} className="cu-button cu-button--red cu-button--small">
                    Read more
                    </a>
                </Card.Footer>
            </Card> */}

            {/* Stat card — left border, no hover */}
            {/* <Card leftBorder noHover>
                <Card.Stats stat={stat.stat} desc={stat.desc} />
            </Card> */}

            {/* Video card */}
            {/* <Card noHover>
                <Card.Video source={video.source} />
                <Card.Header title={video.title} />
            </Card> */}

            {/* Primary card — simplest variant */}
            {/* <Card>
                <Card.Header title="How to Write for the Web" />
                <Card.Body>
                    <Card.Excerpt text={EXCERPT} />
                </Card.Body>
                <Card.Footer>
                    <a
                    href="https://carleton.ca/webservices"
                    className="cu-button cu-button--red cu-button--small"
                    >
                    More info
                    </a>
                </Card.Footer>
            </Card> */}
        {/* </Column> */}
    </Main>
  ),
};
