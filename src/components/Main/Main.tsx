import React from 'react';
import './styles.scss';

export interface MainProps {
  children: React.ReactNode;
  hasPadding?: boolean;
}

export const Main = ({ children, hasPadding = true }: MainProps) => {
  return (
    <main className={`cu-main ${hasPadding ? 'cu-main--padding' : ''}`}>
      <div className="alignfull has-global-padding is-layout-constrained">{children}</div>
    </main>
  );
};
