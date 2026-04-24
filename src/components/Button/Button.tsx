import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon';
import './styles.scss';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  color?: 'red' | 'grey' | 'dark-grey' | 'black' | 'white';
  type?: 'button' | 'submit' | 'reset';
  isSmall?: boolean;
  isFull?: boolean;
  isDisabled?: boolean;
}

export interface ButtonTitleProps extends ButtonProps {
  title: string;
  icon?: IconName;
  ariaLabel?: string;
}

export interface ButtonNoTitleProps extends ButtonProps {
  title?: string;
  icon: IconName;
  ariaLabel: string;
}

export const Button = ({
  color = 'red',
  title,
  icon,
  type = 'button',
  isSmall,
  isFull,
  isDisabled,
  ariaLabel,
  ...rest
}: ButtonNoTitleProps | ButtonTitleProps) => {
  const variantClass = isDisabled ? 'cu-button--disabled' : `cu-button--${color}`;
  const sizeClass = isSmall ? 'cu-button--small' : '';
  const widthClass = isFull ? 'cu-button--full' : '';

  return (
    <button
      type={type}
      aria-label={ariaLabel ?? title}
      className={`cu-button ${variantClass} ${sizeClass} ${widthClass}`.trim()}
      disabled={isDisabled}
      {...rest}
    >
      {icon && <Icon className="cu-icon" name={icon} size={isSmall ? 16 : 20} />}
      {title}
    </button>
  );
};
