import React from 'react';

export interface CardFigureProps {
  children: React.ReactNode;
  isRound?: boolean;
}

export const CardFigure = ({ children, isRound }: CardFigureProps) => {
  const className = `cu-card__figure${isRound ? ' cu-card__figure--round' : ''}`;

  return <figure className={className}>{children}</figure>;
};

CardFigure.displayName = 'Card.Figure';
