import React, { useCallback, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import Input from '../input'
import Icon from '../icon'
import Popover from '../popover'
import Option from './option'

import { SelectOptionType, SelectProps, SelectValueType } from '../types/select'
import './index.scss'

export default function Select<T extends SelectValueType>({ 
  defaultValue,
  value,
  options,
  className,
  style,
  placeholder,
  disabled,
  wrapperClassName,
  wrapperStyle,
  onChange
}: SelectProps<T>) {
  const [visible, setVisible] = useState(false)
  const [_value, setValue] = useState<T>()
  const selectWrapperRef = useRef<HTMLDivElement>(null)
  const initRef = useRef(false)

  useEffect(() => setValue(defaultValue), [])

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      if (value === undefined) return
    }

    setValue(old => {
      if (value === old) return old

      return value
    })
  }, [value])

  useEffect(() => {
    if (!visible || !selectWrapperRef.current) return

    const selectOption = selectWrapperRef.current.getElementsByClassName('is-select')[0]
    if (!selectOption) return

    const selectWrapperRect = selectWrapperRef.current.getBoundingClientRect()
    const topDiff = selectOption.getBoundingClientRect().top - selectWrapperRect.top
    selectWrapperRef.current.scrollTop = topDiff - selectWrapperRect.height / 2
  }, [visible])

  const handleClick = useCallback(({ value, onClick }: SelectOptionType<T>) => {
    if (value === _value) return

    onChange?.(value)
    setValue(value)
    setVisible(false)
    onClick?.(value)
  }, [_value, onChange])

  const findLabelByValue = useCallback((value?: T) => {
    if (value === undefined) return
    const currentOption = options.find(item => item.value === value)
    return currentOption?.label || currentOption?.value
  }, [options])

  if (disabled) {
    return (
      <Input
        placeholder={placeholder}
        className={classNames('rabbit-select', className)}
        style={style}
        value={findLabelByValue(_value)}
        readOnly
        disabled
        suffix={
          <Icon type='arrowDownFill' className={classNames('icon-arrow-down-fill', visible && 'rotate-180')} />
        }
      />
    )
  }

  return (
    <Popover
      widthFollowTarget
      arrow="small"
      className='rabbit-select-popover'
      trigger='focus'
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <div ref={selectWrapperRef} className={classNames('rabbit-select-wrapper', wrapperClassName)} style={wrapperStyle}>
          {
            options.map(item => (
              <Option
                className={classNames({ 'is-select': _value === item.value })}
                {...item}
                key={item.value}
                onClick={value => handleClick(item)}
              />
            ))
          }
        </div>
      } 
    >
      <Input
        placeholder={placeholder}
        className={classNames('rabbit-select', className)}
        style={style}
        value={findLabelByValue(_value)}
        readOnly
        suffix={
          <Icon type='arrowDownFill' className={classNames('icon-arrow-down-fill', visible && 'rotate-180')} />
        }
      />
    </Popover>
  )
}
