import classNames from 'classnames'
import React from 'react'

interface Props {
  color: string
  style?: React.CSSProperties
  className?: string
  isChecked?: boolean
  onClick?: (color: string) => void
}

export default function ColorBlock({ color, style, className, isChecked, onClick }: Props) {
  return (
    <div
      className={classNames(className, 'rabbit-color-block', isChecked && 'is-checked')}
      style={{ ...style, backgroundColor: color }}
      onClick={() => onClick?.(color)}
    />
  )
}
