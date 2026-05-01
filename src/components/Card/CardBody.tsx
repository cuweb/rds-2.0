import React from 'react';

export interface CardBodyProps {
  children: React.ReactNode;
}

export const CardBody = ({ children }: CardBodyProps) => {
  return <div className="cu-card__body">{children}</div>;
};

CardBody.displayName = 'Card.Body';
