import React, { useCallback } from 'react'
import classNames from 'classnames'

import { OptionType, ValueType } from './index'

import './index.scss'

export default function Option<T extends ValueType>({
  className,
  style,
  value,
  label,
  prefix,
  suffix,
  onClick
 }: OptionType<T>) {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()

    onClick?.(value)

    return false
  }, [onclick, value])

  return (
    <div className={classNames('rabbit-select-option', className)} style={style} onClick={handleClick}>
      <span className='rabbit-select-option-prefix'></span>
      <span>{label || value}</span>
      <span className='rabbit-select-option-suffix'></span>
    </div>
  )
}