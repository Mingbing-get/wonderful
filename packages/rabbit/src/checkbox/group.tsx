import React, { useMemo, useState, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import { CheckboxProvider, CheckboxContext } from './context'
import { CheckboxGroupProps, CheckboxValueType, CheckboxOptionType } from '../types/checkbox'

import Checkbox from '.'

import './group.scss'

function Group<T extends CheckboxValueType>({
  className,
  style,
  value,
  defaultValue,
  onChange,
  ...extra
}: CheckboxGroupProps<T>, ref?: React.ForwardedRef<HTMLDivElement>) {
  const [_value, setValue] = useState<CheckboxValueType[]>([])

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
    if (options) return { options: options as CheckboxOptionType[], useOptions: true }

    const children = (extra as any).children as React.ReactNode

    return { options: [], useOptions: false, children }
  }, [extra])

  const handleChange = useCallback((key: CheckboxValueType, val: boolean) => {
    const newValue = [..._value]
    if (val && !newValue.includes(key)) {
      newValue.push(key)
    }
    if (!val) {
      const index = newValue.findIndex(item => item === key)
      if (index !== -1) {
        newValue.splice(index, 1)
      }
    }

    setValue(newValue)
    onChange?.(newValue as T[])
  }, [_value, onChange])

  const providerValue: CheckboxContext = useMemo(() => ({
    value: _value,
    addValue: (val) => {
      if (_value.includes(val)) return
      setValue(oldVal => [...oldVal, val])
    },
    triggerChange: handleChange
  }), [_value, handleChange])

  return (
    <CheckboxProvider value={providerValue} >
      <div ref={ref} className={classNames('rabbit-checkbox-group-wrapper', useOptions && 'use-options', className)} style={style}>
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
    </CheckboxProvider>
  )
}

export default React.forwardRef<HTMLDivElement, CheckboxGroupProps<CheckboxValueType>>(Group)
