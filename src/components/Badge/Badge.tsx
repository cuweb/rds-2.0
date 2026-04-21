import { useLinkContext } from '../LinkProvider/useLinkContext'
import { borderRadiusClasses } from '../../utils/propClasses'
import './styles.scss'

type borderRadiusKeys = keyof typeof borderRadiusClasses

export interface BadgeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string
  href?: string
  rounded?: borderRadiusKeys
  color?: 'grey' | 'white' | 'black80' | 'white80' | 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'teal'
}

export const Badge = ({ text, href, rounded = 'md', color = 'grey', ...rest }: BadgeProps) => {
  const LinkComponent = useLinkContext()
  const classes = `cu-badge cu-badge--${color} cu-badge--radius-${rounded}`

  if (href) {
    return (
      // eslint-disable-next-line react-hooks/static-components -- LinkComponent is injected via context, stable across renders
      <LinkComponent href={href} className={classes} {...rest}>
        {text}
      </LinkComponent>
    )
  }

  return (
    <span className={classes} {...rest}>
      {text}
    </span>
  )
}
