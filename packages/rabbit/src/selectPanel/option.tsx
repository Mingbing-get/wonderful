import React, { useCallback } from 'react'
import classNames from 'classnames'

import { SelectOptionType, SelectValueType } from '../types/select'

export default function Option<T extends SelectValueType>({ className, style, value, label, prefix, suffix, onClick }: SelectOptionType<T>) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()

      onClick?.(value)

      return false
    },
    [onclick, value]
  )

  return (
    <div
      className={classNames('rabbit-select-option', className)}
      style={style}
      onClick={handleClick}>
      <span className="rabbit-select-option-prefix">{prefix}</span>
      <span>{label || value}</span>
      <span className="rabbit-select-option-suffix">{suffix}</span>
    </div>
  )
}
