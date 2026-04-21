import React from 'react'
import './styles.scss'

export interface BadgeGroupProps {
  children: React.ReactNode
  isAbsolute?: boolean
  top?: number
  right?: number
  bottom?: number
  left?: number
}

const getPositionStyles = (top?: number, right?: number, bottom?: number, left?: number) => {
  const styles: React.CSSProperties = {}

  if (top !== undefined) {
    styles.top = `${top}px`
  }
  if (right !== undefined) {
    styles.right = `${right}px`
  }
  if (bottom !== undefined) {
    styles.bottom = `${bottom}px`
  }
  if (left !== undefined) {
    styles.left = `${left}px`
  }

  return styles
}

export const BadgeGroup = ({
  children,
  isAbsolute = false,
  top = 0,
  right,
  bottom,
  left = 0,
}: BadgeGroupProps) => {
  const positionStyles = isAbsolute
    ? { position: 'absolute', ...getPositionStyles(top, right, bottom, left) }
    : {};

  return (
    <div className="cu-badge-group" style={positionStyles}>
      {children}
    </div>
  )
}
