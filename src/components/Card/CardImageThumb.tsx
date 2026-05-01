import React from 'react';

export interface CardImageThumbProps {
  children: React.ReactNode;
  isSquare?: boolean;
}

export const CardImageThumb = ({ children, isSquare }: CardImageThumbProps) => {
  const className = `cu-card__image-thumb${isSquare ? ' cu-card__image-thumb--square' : ''}`;

  return <figure className={className}>{children}</figure>;
};

CardImageThumb.displayName = 'Card.ImageThumb';
