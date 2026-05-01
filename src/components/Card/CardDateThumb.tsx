import { getDate, parse, format, isSameDay } from 'date-fns';

export interface CardDateThumbProps {
  startDate: string;
  endDate: string;
}

/**
 * Visual-only date stamp. The date should also be present in Card.EventMeta —
 * this thumb is aria-hidden so screen readers aren't given duplicate info.
 */
export const CardDateThumb = ({ startDate, endDate }: CardDateThumbProps) => {
  const eventStartDate = parse(startDate, 'yyyy-MM-dd HH:mm:ss', new Date());
  const eventEndDate = parse(endDate, 'yyyy-MM-dd HH:mm:ss', new Date());

  const eventStartMonth = format(eventStartDate, 'MMM');
  const eventStartDay = getDate(eventStartDate);
  const isMultiDay = !isSameDay(eventStartDate, eventEndDate);

  return (
    <div className="cu-card__date-thumb" aria-hidden="true">
      {isMultiDay ? (
        <>
          <span className="cu-card__date-thumb-month">Multi</span>
          <span className="cu-card__date-thumb-day">Day</span>
        </>
      ) : (
        <>
          <span className="cu-card__date-thumb-month">{eventStartMonth}</span>
          <span className="cu-card__date-thumb-day">{eventStartDay}</span>
        </>
      )}
    </div>
  );
};

CardDateThumb.displayName = 'Card.DateThumb';
