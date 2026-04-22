import { FC, ReactNode } from 'react';
import { LinkContext, LinkComponent } from './LinkContext';

export interface LinkProviderProps {
  component: LinkComponent;
  children: ReactNode;
}

export const LinkProvider: FC<LinkProviderProps> = ({ component, children }) => (
  <LinkContext.Provider value={component}>{children}</LinkContext.Provider>
);

export { useLinkContext } from './useLinkContext';
export { LinkContext } from './LinkContext';
export type { LinkComponent } from './LinkContext';
