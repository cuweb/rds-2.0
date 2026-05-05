import { addDays, differenceInMinutes, format, isAfter, isBefore, parse } from 'date-fns';

export interface HoursStatus {
  variant: 'success' | 'warning' | 'error';
  label: string;
}

const formatTime = (d: Date) => format(d, 'h:mm a');

/**
 * Compute a Status-ready `{ variant, label }` from operating hours.
 *
 * Variant rules:
 *   - error   — current time is before open or after close
 *   - warning — within 60 minutes of close
 *   - success — open with more than 60 minutes remaining
 *
 * `open` and `close` are 24h strings like `'07:00'` and `'20:00'`. Assumes
 * close is later than open on the same day; venues that wrap past midnight
 * aren't modelled here yet.
 */
export const formatHoursStatus = (
  open: string,
  close: string,
  now: Date = new Date(),
): HoursStatus => {
  const reference = new Date(now);
  reference.setHours(0, 0, 0, 0);
  const openDate = parse(open, 'HH:mm', reference);
  const closeDate = parse(close, 'HH:mm', reference);

  if (isBefore(now, openDate)) {
    return { variant: 'error', label: `Opens at ${formatTime(openDate)}` };
  }

  if (isAfter(now, closeDate) || now.getTime() === closeDate.getTime()) {
    const tomorrowOpen = addDays(openDate, 1);
    return { variant: 'error', label: `Opens tomorrow at ${formatTime(tomorrowOpen)}` };
  }

  if (differenceInMinutes(closeDate, now) <= 60) {
    return { variant: 'warning', label: `Closes at ${formatTime(closeDate)}` };
  }

  return { variant: 'success', label: `Open until ${formatTime(closeDate)}` };
};
