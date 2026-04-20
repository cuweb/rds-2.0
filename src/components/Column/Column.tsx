import React from 'react'
import { ColumnContent } from './ColumnContent'
import { gridColumnClasses } from '../../utils/propClasses'
import './styles.scss'

type gridColumnKeys = keyof typeof gridColumnClasses

export interface ColumnProps {
  children: React.ReactNode
  cols?: gridColumnKeys
}

export const ColumnWrapper = ({ children, cols = '1' }: ColumnProps) => {
  return (
    <div className={`cu-column cu-column--${gridColumnClasses[cols]}`}>
      {children}
    </div>
  )
}

export const Column = Object.assign(ColumnWrapper, {
  Content: ColumnContent,
})

ColumnWrapper.displayName = 'Column'
