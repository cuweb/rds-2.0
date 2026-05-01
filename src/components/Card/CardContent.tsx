import { ReactNode } from 'react';

export interface CardContentProps {
  children?: ReactNode;
}

export const CardContent = ({ children }: CardContentProps) => {
  return <div className="cu-card__content">{children}</div>;
};

CardContent.displayName = 'Card.Content';
