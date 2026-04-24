import type { SVGProps } from 'react';
import { iconMap, type IconName } from '@cuweb/rds-icons';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number | string;
  title?: string;
}

export const Icon = ({ name, size = '1em', title, ...rest }: IconProps) => {
  const Component = iconMap[name];
  if (!Component) return null;

  const a11yProps = title
    ? ({ role: 'img', 'aria-label': title } as const)
    : ({ 'aria-hidden': true } as const);

  return (
    <Component width={size} height={size} focusable={false} {...a11yProps} {...rest}>
      {title ? <title>{title}</title> : null}
    </Component>
  );
};
