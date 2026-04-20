import React from 'react'

export interface ArticleProps {
  children?: React.ReactNode
  content?: string
}

export const Article = ({ children, content }: ArticleProps) => {
  if (content) {
    return <article dangerouslySetInnerHTML={{ __html: content }} />
  }

  return <article>{children}</article>
}
