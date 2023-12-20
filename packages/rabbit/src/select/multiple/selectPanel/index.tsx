import React from 'react'
import classNames from 'classnames'
import { SelectValueType, SelectOptionType } from '../../../types/select'
import { SelectPanelProps } from '../../../types/selectPanel'
import Option from './option'

import './index.scss'

interface Props<T extends SelectValueType, O extends SelectOptionType<T>> extends Omit<SelectPanelProps<T, O>, 'value' | 'onClickItem'> {
  value: T[]
  onClickItem?: (item: T, checked?: boolean) => void
}

export default function Panel<T extends SelectValueType, O extends SelectOptionType<T>>({
  wrapperClassName,
  value,
  wrapperStyle,
  options,
  onClickItem,
}: Props<T, O>) {
  return (
    <div
      className={classNames('rabbit-multiple-select-panel', 'rabbit-component', wrapperClassName)}
      style={wrapperStyle}>
      {options.map((item) => (
        <Option
          {...item}
          checked={value.includes(item.value)}
          key={item.value}
          onChange={onClickItem}
        />
      ))}
    </div>
  )
}
