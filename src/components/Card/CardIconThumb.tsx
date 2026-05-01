import { Icon } from '../Icon';
import type { IconName } from '../Icon';

export interface CardIconThumbProps {
  icon?: IconName;
}

export const CardIconThumb = ({ icon }: CardIconThumbProps) => {
  // 'file-x' icon variants are mapped to their non-x base icon
  const modifiedIcon = (
    icon && icon.startsWith('file-') && icon.endsWith('x')
      ? icon.substring(0, icon.length - 1)
      : icon
  ) as IconName | undefined;

  return (
    <figure className="cu-card__icon-thumb">
      {modifiedIcon && <Icon name={modifiedIcon} size={48} color="#E91C24" />}
    </figure>
  );
};

CardIconThumb.displayName = 'Card.IconThumb';
