import React, { useRef, useEffect } from 'react'
import classNames from 'classnames'
import { SelectValueType } from '../types/select'
import { SelectPanelProps } from '../types/selectPanel'
import Option from './option'

import './index.scss'

export default function Panel<T extends SelectValueType>({ wrapperClassName, value, wrapperStyle, options, onClickItem }: SelectPanelProps<T>) {
  const selectWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!selectWrapperRef.current) return

    const selectOption = selectWrapperRef.current.getElementsByClassName('is-select')[0]
    if (!selectOption) return

    const selectWrapperRect = selectWrapperRef.current.getBoundingClientRect()
    const topDiff = selectOption.getBoundingClientRect().top - selectWrapperRect.top
    selectWrapperRef.current.scrollTop = topDiff - selectWrapperRect.height / 2
  }, [selectWrapperRef.current])

  return (
    <div
      ref={selectWrapperRef}
      className={classNames('rabbit-select-wrapper', 'rabbit-component', wrapperClassName)}
      style={wrapperStyle}>
      {options.map((item) => (
        <Option
          className={classNames({ 'is-select': value === item.value })}
          {...item}
          key={item.value}
          onClick={(value) => onClickItem?.(item)}
        />
      ))}
    </div>
  )
}
