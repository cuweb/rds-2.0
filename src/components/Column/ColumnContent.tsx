import React from 'react';

export interface ColumnContentProps {
  children: React.ReactNode;
  isFirst?: boolean;
}

export const ColumnContent = ({ children, isFirst = false }: ColumnContentProps) => {
  return <div className={isFirst ? 'is-first' : undefined}>{children}</div>;
};

ColumnContent.displayName = 'Column.Content';
