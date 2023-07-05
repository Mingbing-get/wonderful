import React, { forwardRef, ForwardedRef } from 'react'
import classNames from 'classnames'

import './index.scss'

import { SelectTriggerProps } from '../types/selectTrigger'

function SelectTrigger({ placeholder, className, style, children, suffix, disabled, ...extra }: SelectTriggerProps, ref?: ForwardedRef<HTMLSpanElement>) {
  return (
    <span
      {...extra}
      ref={ref}
      className={classNames('rabbit-select-trigger', 'rabbit-component', disabled && 'is-disabled', className)}
      style={style}>
      {children ? children : <span className="trigger-placeholder">{placeholder}</span>}
      <span className="trigger-suffix">{suffix}</span>
    </span>
  )
}

export default forwardRef<HTMLSpanElement, SelectTriggerProps>(SelectTrigger)
