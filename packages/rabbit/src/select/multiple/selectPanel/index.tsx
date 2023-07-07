import React from 'react'
import classNames from 'classnames'
import { SelectValueType } from '../../../types/select'
import { SelectPanelProps } from '../../../types/selectPanel'
import Option from './option'

import './index.scss'

interface Props<T extends SelectValueType> extends Omit<SelectPanelProps<T>, 'value' | 'onClickItem'> {
  value: T[]
  onClickItem?: (item: T, checked?: boolean) => void
}

export default function Panel<T extends SelectValueType>({ wrapperClassName, value, wrapperStyle, options, onClickItem }: Props<T>) {
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
