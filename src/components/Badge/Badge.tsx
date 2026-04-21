import { useLinkContext } from '../LinkProvider/useLinkContext'
import { borderRadiusClasses } from '../../utils/propClasses'
import './styles.scss'

type borderRadiusKeys = keyof typeof borderRadiusClasses

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string
  link?: string
  rounded?: borderRadiusKeys
  color?: 'grey' | 'white' | 'black80' | 'white80' | 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'teal'
  noWordBreak?: boolean
}

export const Badge = ({
  text,
  link,
  rounded = 'md',
  color = 'grey',
  ...rest
}: BadgeProps) => {
  const LinkComponent = useLinkContext()

  const content = (
    <span className="">{text}</span>
  )

  if (link) {
    return (
      <LinkComponent
        href={link}
        className={`cu-badge cu-badge--${color} cu-badge--radius-${rounded}`}
        {...rest}
      >
        {content}
      </LinkComponent>
    )
  }

  return (
    <span className={`cu-badge cu-badge--${color} cu-badge--radius-${rounded}`} {...rest}>
      {text}
    </span>
  )
}
