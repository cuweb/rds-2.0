import { createContext, ComponentType } from 'react'

type LinkComponentType = ComponentType<React.ComponentProps<'a'>>
const DefaultLinkComponent: LinkComponentType = (props) => <a {...props} />

export const LinkContext = createContext<LinkComponentType>(DefaultLinkComponent)
