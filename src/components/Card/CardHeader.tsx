/* eslint-disable react-hooks/static-components -- LinkComponent is injected via context, stable across renders */
import { useLinkContext } from '../LinkProvider/useLinkContext';

export interface CardHeaderProps {
  title: string;
  link?: string;
  extraText?: string;
  as?: 'h2' | 'h3';
  date?: string | Date;
  datePrefix?: string;
  readTime?: string;
  position?: 'top' | 'bottom';
}

export const CardHeader = ({
  title = 'No title available',
  link,
  extraText,
  as = 'h2',
  date,
  datePrefix,
  readTime,
  position = 'top',
}: CardHeaderProps) => {
  const LinkComponent = useLinkContext();
  const HeaderComponent = as;
  const formattedDate = date
    ? new Date(date).toLocaleString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      })
    : null;

  return (
    <header className="cu-card__header">
      {((date && position === 'top') || (readTime && position === 'top')) && (
        <div className="cu-card__header-meta">
          {date && (
            <time className="cu-card__header-time">
              {datePrefix && `${datePrefix} `}
              {formattedDate}
            </time>
          )}
          {readTime && (
            <p
              className={`cu-card__header-readtime${date ? ' cu-card__header-readtime--with-divider' : ''}`}
            >
              {readTime} minute read
            </p>
          )}
        </div>
      )}

      {extraText && !date && (
        <div className="cu-card__header-extra">
          <p>{extraText}</p>
        </div>
      )}

      <HeaderComponent className="cu-card__header-title">
        {link ? <LinkComponent href={link}>{title}</LinkComponent> : title}
      </HeaderComponent>

      {((date && position === 'bottom') || (readTime && position === 'bottom')) && (
        <div className="cu-card__header-meta">
          {date && (
            <time className="cu-card__header-time">
              {datePrefix && `${datePrefix} `}
              {formattedDate}
            </time>
          )}
          {readTime && (
            <p
              className={`cu-card__header-readtime${date ? ' cu-card__header-readtime--with-divider' : ''}`}
            >
              {readTime} minute read
            </p>
          )}
        </div>
      )}
    </header>
  );
};

CardHeader.displayName = 'Card.Header';
