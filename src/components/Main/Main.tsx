import React from 'react'

export interface MainProps {
  children: React.ReactNode
}

export const Main = ({ children }: MainProps) => {
    return (
      <main>
        <div className="alignfull has-global-padding is-layout-constrained">
          {children}
        </div>
      </main>
  )
}
