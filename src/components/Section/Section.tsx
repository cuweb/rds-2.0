import React from 'react';
import './styles.scss';

import { maxWidthClasses } from '../../utils/propClasses';
type maxWidthKeys = keyof typeof maxWidthClasses;

export interface SectionProps {
  children?: React.ReactNode;
  as?: 'section' | 'div';
  isGrey?: boolean;
  maxWidth?: maxWidthKeys;
}

export const Section = ({
  children,
  as = 'section',
  isGrey,
  maxWidth = 'aligncontent',
}: SectionProps) => {
  const SectionWrapper = as;
  const sectionBackground = isGrey ? 'grey' : 'white';
  const sectionWidth = maxWidth ? maxWidthClasses[maxWidth] : '';

  return (
    <SectionWrapper
      className={`cu-section cu-section--${sectionBackground} ${sectionWidth} has-global-padding is-layout-constrained`}
    >
      {children}
    </SectionWrapper>
  );
};
