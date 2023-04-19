import React, { useMemo, useState, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import { RadioProvider, RadioContext } from './context'

import Checkbox from '.'

import './group.scss'

export type ValueType = string | number

export type OptionType = {
  label?: string,
  value: ValueType,
  disabled?: boolean,
}

type BaseProps<T extends ValueType> = {
  className?: string,
  style?: React.CSSProperties,
  value?: T,
  defaultValue?: T,
  onChange?: (value?: T) => void
}

type Props<T extends ValueType> = (BaseProps<T> & {
  options: OptionType[]
}) | (BaseProps<T> & {
  children: React.ReactNode
})

function Group<T extends ValueType>({
  className,
  style,
  value,
  defaultValue,
  onChange,
  ...extra
}: Props<T>, ref?: React.ForwardedRef<HTMLDivElement>) {
  const [_value, setValue] = useState<ValueType>()

  useEffect(() => {
    if (!defaultValue) return
    setValue(defaultValue)
  }, [])

  useEffect(() => {
    if (!value) return
    setValue(value)
  }, [value])

  const { options: _options, useOptions, children: _children } = useMemo(() => {
    const options = (extra as any).options
    if (options) return { options: options as OptionType[], useOptions: true }

    const children = (extra as any).children as React.ReactNode

    return { options: [], useOptions: false, children }
  }, [extra])

  const handleChange = useCallback((key: ValueType, val: boolean) => {
    if ((key === _value) === val) return
    if (val) {
      setValue(key)
      onChange?.(key as T)
    } else {
      setValue(undefined)
      onChange?.(undefined)
    }
  }, [_value, onChange])

  const providerValue: RadioContext = useMemo(() => ({
    value: _value,
    addValue: (val) => {
      if (_value === val) return
      setValue(val)
    },
    triggerChange: handleChange
  }), [_value, handleChange])

  return (
    <RadioProvider value={providerValue} >
      <div ref={ref} className={classNames('rabbit-radio-group-wrapper', useOptions && 'use-options', className)} style={style}>
        {
          useOptions ? _options.map(item => (
            <Checkbox
              key={item.value}
              disabled={item.disabled}
              value={item.value}
            >
              {item.label || `${item.value}`}
            </Checkbox>
          ))
          :
          _children
        }
      </div>
    </RadioProvider>
  )
}

export default React.forwardRef<HTMLDivElement, Props<ValueType>>(Group)
