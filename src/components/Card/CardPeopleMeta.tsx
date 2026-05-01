import React from 'react';

export interface CardPeopleMetaProps {
  children: React.ReactNode;
  jobTitle?: string;
  phone?: string;
}

export const CardPeopleMeta = ({ jobTitle, children, phone }: CardPeopleMetaProps) => {
  return (
    <ul className="cu-card__people-meta">
      {jobTitle && <li className="cu-card__people-meta-job">{jobTitle}</li>}
      {children && (
        <li>
          <strong className="cu-card__people-meta-email">{children}</strong>
        </li>
      )}
      {phone && <li>{phone}</li>}
    </ul>
  );
};

CardPeopleMeta.displayName = 'Card.PeopleMeta';
