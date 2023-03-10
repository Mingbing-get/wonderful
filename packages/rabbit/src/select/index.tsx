import React, { useCallback, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import Input from '../input'
import Icon from '../icon'
import Popover from '../popover'
import Option from './option'

import './index.scss'
import { InputRef } from 'rc-input'

export type ValueType = number | string;
export type OptionType<T extends ValueType = ValueType> = {
  value: T;
  label?: string;
  prefix?: React.ReactElement;
  suffix?: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
  [k: string]: any;
  onClick?: (value: T) => void;
}

type Props<T extends ValueType> = {
  defaultValue?: T;
  value?: T;
  options: OptionType<T>[];
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  onChange?: (value?: T) => void;
}

export default function Select<T extends ValueType>({ 
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
}: Props<T>) {
  const [visible, setVisible] = useState(false)
  const [_value, setValue] = useState<T>()
  const selectWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => setValue(defaultValue), [])

  useEffect(() => {
    if (value === _value) return
    setValue(value)
  }, [value])

  useEffect(() => {
    if (!visible || !selectWrapperRef.current) return

    const selectOption = selectWrapperRef.current.getElementsByClassName('is-select')[0]
    if (!selectOption) return

    const selectWrapperRect = selectWrapperRef.current.getBoundingClientRect()
    const topDiff = selectOption.getBoundingClientRect().top - selectWrapperRect.top
    selectWrapperRef.current.scrollTop = topDiff - selectWrapperRect.height / 2
  }, [visible])

  const handleClick = useCallback(({ value, onClick }: OptionType<T>) => {
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
