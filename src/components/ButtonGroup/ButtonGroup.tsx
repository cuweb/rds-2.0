import React from 'react';
import { justifyClasses } from '../../utils/propClasses';
import './styles.scss';

export type ButtonGroupGap = 'sm' | 'md' | 'lg';
type ButtonGroupAlign = keyof typeof justifyClasses;

export interface ButtonGroupProps {
  children: React.ReactNode;
  align?: ButtonGroupAlign;
}

export const ButtonGroup = ({ children, align = 'start' }: ButtonGroupProps) => (
  <div className={`cu-buttongroup cu-buttongroup--justify-${align}`}>
    {children}
  </div>
);
