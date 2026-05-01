import { getDate, parse, format, isSameDay } from 'date-fns';

export interface CardDateThumbProps {
  as?: 'h2' | 'h3';
  startDate: string;
  endDate: string;
}

export const CardDateThumb = ({ as = 'h2', startDate, endDate }: CardDateThumbProps) => {
  const DateWrapperComponent = as;

  const eventStartDate = parse(startDate, 'yyyy-MM-dd HH:mm:ss', new Date());
  const eventEndDate = parse(endDate, 'yyyy-MM-dd HH:mm:ss', new Date());

  const eventStartMonth = format(eventStartDate, 'MMM');
  const eventStartDay = getDate(eventStartDate);

  const isMultiDay = !isSameDay(eventStartDate, eventEndDate);

  return (
    <DateWrapperComponent className="cu-card__date-thumb">
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
    </DateWrapperComponent>
  );
};

CardDateThumb.displayName = 'Card.DateThumb';
