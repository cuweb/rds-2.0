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
const ICON_COLOR = '#f48c90';

export const CardEventMeta = ({
  startDateTime,
  endDateTime,
  onCampus,
  onCampusBuilding,
  onCampusRoomNumber,
  eventAddress,
}: CardEventMetaProps) => {
  const startDate = parse(startDateTime, 'yyyy-MM-dd HH:mm:ss', new Date());
  const startMonth = format(startDate, 'MMMM');
  const startDay = getDate(startDate);
  const startHours = startDate.getHours() % 12 || 12;
  const startMinutes = format(startDate, 'mm');
  const startAmPm = format(startDate, 'a');

  const endDate = parse(endDateTime, 'yyyy-MM-dd HH:mm:ss', new Date());
  const endMonth = format(endDate, 'MMMM');
  const endDay = getDate(endDate);
  const endHours = endDate.getHours() % 12 || 12;
  const endMinutes = format(endDate, 'mm');
  const endAmPm = format(endDate, 'a');

  const startTime = `${startHours}:${startMinutes} ${startAmPm}`;
  const endTime = `${endHours}:${endMinutes} ${endAmPm}`;

  const isEventSameDay = isSameDay(startDate, endDate);

  return (
    <ul className="cu-card__event-meta">
      <li>
        {!isEventSameDay ? (
          <>
            <Icon name="calendar-days" size={ICON_SIZE} color={ICON_COLOR} />
            {`${startMonth} ${startDay} — ${endMonth} ${endDay}`}
          </>
        ) : (
          <>
            <Icon name="clock" size={ICON_SIZE} color={ICON_COLOR} />
            {`${startTime} — ${endTime}`}
          </>
        )}
      </li>
      <li>
        <Icon name="location-dot" size={ICON_SIZE} color={ICON_COLOR} />
        {onCampus ? `${onCampusRoomNumber} ${onCampusBuilding}` : eventAddress}
      </li>
    </ul>
  );
};

CardEventMeta.displayName = 'Card.EventMeta';
