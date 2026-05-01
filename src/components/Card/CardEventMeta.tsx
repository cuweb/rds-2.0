import { isSameDay, parse, format, getDate } from 'date-fns';
import { Icon } from '../Icon';

export interface CardEventMetaProps {
  startDateTime: string;
  endDateTime: string;
  onCampus: boolean;
  onCampusBuilding?: string | null;
  onCampusRoomNumber?: string | null;
  eventAddress?: string;
}

const ICON_SIZE = 20;

const toIso = (raw: string) => raw.replace(' ', 'T');
const toIsoDate = (raw: string) => raw.split(' ')[0];

const formatTime = (date: Date) => {
  const hours = date.getHours() % 12 || 12;
  const minutes = format(date, 'mm');
  const ampm = format(date, 'a');
  return `${hours}:${minutes} ${ampm}`;
};

export const CardEventMeta = ({
  startDateTime,
  endDateTime,
  onCampus,
  onCampusBuilding,
  onCampusRoomNumber,
  eventAddress,
}: CardEventMetaProps) => {
  const startDate = parse(startDateTime, 'yyyy-MM-dd HH:mm:ss', new Date());
  const endDate = parse(endDateTime, 'yyyy-MM-dd HH:mm:ss', new Date());

  const isEventSameDay = isSameDay(startDate, endDate);

  const startMonth = format(startDate, 'MMMM');
  const startDay = getDate(startDate);
  const endMonth = format(endDate, 'MMMM');
  const endDay = getDate(endDate);

  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);

  const location = onCampus ? `${onCampusRoomNumber} ${onCampusBuilding}` : eventAddress;

  return (
    <ul className="cu-card__event-meta">
      <li>
        {isEventSameDay ? (
          <>
            <Icon name="clock" size={ICON_SIZE} title="When" />
            <time dateTime={toIso(startDateTime)}>
              {startMonth} {startDay}, {startTime}
            </time>
            {' — '}
            <time dateTime={toIso(endDateTime)}>{endTime}</time>
          </>
        ) : (
          <>
            <Icon name="calendar-days" size={ICON_SIZE} title="When" />
            <time dateTime={toIsoDate(startDateTime)}>
              {startMonth} {startDay}
            </time>
            {' — '}
            <time dateTime={toIsoDate(endDateTime)}>
              {endMonth} {endDay}
            </time>
          </>
        )}
      </li>
      <li>
        <Icon name="location-dot" size={ICON_SIZE} title="Where" />
        {location}
      </li>
    </ul>
  );
};

CardEventMeta.displayName = 'Card.EventMeta';
