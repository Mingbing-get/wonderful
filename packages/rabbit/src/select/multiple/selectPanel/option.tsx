import React from 'react'
import classNames from 'classnames'

import Checkbox from '../../../checkbox'
import { SelectOptionType, SelectValueType } from '../../../types/select'

interface Props<T extends SelectValueType> extends Omit<SelectOptionType<T>, 'onClick'> {
  checked?: boolean
  onChange?: (value: T, checked?: boolean) => void
}

export default function Option<T extends SelectValueType>({ className, style, value, label, checked, prefix, suffix, onChange }: Props<T>) {
  return (
    <div
      className={classNames('rabbit-multiple-select-option', className)}
      style={style}>
      <Checkbox
        checked={checked}
        onChange={(val) => onChange?.(value, val)}
      />
      <span className="rabbit-select-option-prefix">{prefix}</span>
      <span>{label || value}</span>
      <span className="rabbit-select-option-suffix">{suffix}</span>
    </div>
  )
}
