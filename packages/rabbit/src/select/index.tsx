import React, { useCallback, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import Input from '../input'
import Popover from '../popover'
import Option from './option'

import './index.scss'

export type ValueType = number | string;
export type OptionType<T> = {
  value: T;
  label?: React.ReactNode;
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
  wrapperClassName,
  wrapperStyle,
  onChange
}: Props<T>) {
  const [visible, setVisible] = useState(false)
  const [_value, setValue] = useState<T>()
  const preValue = useRef<T>()

  useEffect(() => setValue(defaultValue), [])

  useEffect(() => {
    if (preValue.current === value) return

    preValue.current = value
    setValue(value)
  }, [value])

  useEffect(() => {
    if (_value === value) return
    onChange?.(_value)
  }, [_value, onChange])

  const handleClick = useCallback(({ value, onClick }: OptionType<T>) => {
    if (value === _value) return

    setValue(value)
    setVisible(false)
    onClick?.(value)
  }, [_value])

  return (
    <Popover
      arrow="small"
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <div className={classNames('rabbit-select-wrapper', wrapperClassName)} style={wrapperStyle}>
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
        className={classNames('rabbit-select', className)}
        style={style}
        value={_value}
        readonly
        suffix={
          <span className={classNames('rabbit-select-arrow', { 'rotate-180': visible })} />
        }
      />
    </Popover>
  )
}
