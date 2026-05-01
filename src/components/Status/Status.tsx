import React from 'react';
import './styles.scss';

export type StatusVariant = 'success' | 'error' | 'warning' | 'info';

export interface StatusProps {
  children?: React.ReactNode;
  variant?: StatusVariant;
}

export const Status = ({ children, variant = 'success' }: StatusProps) => {
  return (
    <span className={`cu-status cu-status--${variant}`}>
      <span className="cu-status__dot" aria-hidden="true" />
      {children}
    </span>
  );
};

Status.displayName = 'Status';
