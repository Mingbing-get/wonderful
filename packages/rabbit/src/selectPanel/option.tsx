import React, { useCallback } from 'react'
import classNames from 'classnames'

import { SelectOptionType, SelectValueType } from '../types/select'

export default function Option<T extends SelectValueType>({ className, style, value, label, prefix, suffix, onClick, onMouseEnter }: SelectOptionType<T>) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()

      onClick?.(value)
    },
    [onClick, value]
  )

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()

      onMouseEnter?.(value)
    },
    [onMouseEnter, value]
  )

  return (
    <div
      className={classNames('rabbit-select-option', className)}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}>
      <span className="rabbit-select-option-prefix">{prefix}</span>
      <span>{label || value}</span>
      <span className="rabbit-select-option-suffix">{suffix}</span>
    </div>
  )
}
