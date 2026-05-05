export interface CardExcerptProps {
  text?: string;
  hasMore?: boolean;
  truncateOnMobile?: boolean;
}

export const CardExcerpt = ({ text, hasMore, truncateOnMobile }: CardExcerptProps) => {
  const className = `cu-card__excerpt${truncateOnMobile ? ' cu-card__excerpt--truncate-mobile' : ''}`;

  return (
    <p className={className}>
      {text && text.length > 170 ? `${text.substring(0, 150)}...` : text}
      {hasMore && <span className="cu-card__excerpt-more"> More</span>}
    </p>
  );
};

CardExcerpt.displayName = 'Card.Excerpt';
