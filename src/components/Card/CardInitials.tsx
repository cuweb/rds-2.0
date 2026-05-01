export interface CardInitialsProps {
  initials: string;
}

export const CardInitials = ({ initials }: CardInitialsProps) => {
  return (
    <figure className="cu-card__initials">
      <img
        src="https://cu-production.s3.amazonaws.com/rds/assets/graphics/grey-bg.jpg"
        alt=""
        width={200}
        height={200}
      />
      <span className="cu-card__initials-label">{initials}</span>
    </figure>
  );
};

CardInitials.displayName = 'Card.Initials';
