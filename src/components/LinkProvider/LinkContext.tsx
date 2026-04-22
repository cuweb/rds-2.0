import { createContext, ComponentType, ComponentProps } from 'react'

export type LinkComponent = ComponentType<ComponentProps<'a'>>

// eslint-disable-next-line jsx-a11y/anchor-has-content -- children flows through {...props}
const DefaultLink: LinkComponent = (props) => <a {...props} />

export const LinkContext = createContext<LinkComponent>(DefaultLink)
