import React, { useMemo, useState, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import { RadioProvider, RadioContext } from './context'

import Checkbox from '.'
import { RadioGroupProps, RadioValueType, RadioOptionType } from '../types/radio'

import './group.scss'

function Group<T extends RadioValueType>(
  { className, style, value, defaultValue, onChange, ...extra }: RadioGroupProps<T>,
  ref?: React.ForwardedRef<HTMLDivElement>
) {
  const [_value, setValue] = useState<RadioValueType>()

  useEffect(() => {
    if (!defaultValue) return
    setValue(defaultValue)
  }, [])

  useEffect(() => {
    if (!value) return
    setValue(value)
  }, [value])

  const {
    options: _options,
    useOptions,
    children: _children,
  } = useMemo(() => {
    const options = (extra as any).options
    if (options) return { options: options as RadioOptionType[], useOptions: true }

    const children = (extra as any).children as React.ReactNode

    return { options: [], useOptions: false, children }
  }, [extra])

  const handleChange = useCallback(
    (key: RadioValueType, val: boolean) => {
      if ((key === _value) === val) return
      if (val) {
        setValue(key)
        onChange?.(key as T)
      } else {
        setValue(undefined)
        onChange?.(undefined)
      }
    },
    [_value, onChange]
  )

  const providerValue: RadioContext = useMemo(
    () => ({
      value: _value,
      addValue: (val) => {
        if (_value === val) return
        setValue(val)
      },
      triggerChange: handleChange,
    }),
    [_value, handleChange]
  )

  return (
    <RadioProvider value={providerValue}>
      <div
        ref={ref}
        className={classNames('rabbit-radio-group-wrapper', 'rabbit-component', useOptions && 'use-options', className)}
        style={style}>
        {useOptions
          ? _options.map((item) => (
              <Checkbox
                key={item.value}
                disabled={item.disabled}
                value={item.value}>
                {item.label || `${item.value}`}
              </Checkbox>
            ))
          : _children}
      </div>
    </RadioProvider>
  )
}

export default React.forwardRef<HTMLDivElement, RadioGroupProps<RadioValueType>>(Group)
