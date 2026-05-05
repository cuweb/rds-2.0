export interface CardStatsProps {
  stat: string;
  desc: string;
  reverse?: boolean;
}

export const CardStats = ({ stat, desc, reverse }: CardStatsProps) => {
  const className = `cu-card__stats${reverse ? ' cu-card__stats--reverse' : ''}`;

  const truncatedDesc = desc && desc.length > 80 ? `${desc.substring(0, 80)}...` : desc;
  const truncatedStat = stat && stat.length > 60 ? `${stat.substring(0, 60)}...` : stat;

  return (
    <div className={className}>
      <p className="cu-card__stats-desc">{truncatedDesc}</p>
      <p className="cu-card__stats-stat">{truncatedStat}</p>
    </div>
  );
};

CardStats.displayName = 'Card.Stats';
