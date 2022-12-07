import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'

import Input, { InputValue } from '../input'

import './index.scss'

type Props = {
  defaultValue?: number,
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: number) => void;
}

const numberReg = /^(-|\d)\d*$/
const floatReg = /^(-|\d)\d*\.?\d*$/

export default function InputNumber({
  defaultValue,
  value,
  step = 1,
  min,
  max,
  prefix,
  suffix,
  className,
  style,
  onChange
}: Props) {
  const [_value, setValue] = useState<number>()
  const preValue = useRef<number>()

  const curReg = useMemo(() => {
    if (!step) return floatReg

    if (!numberReg.test(`${step}`)) return floatReg

    return numberReg
  }, [step])

  useEffect(() => setValue(defaultValue), [])

  useEffect(() => {
    if (preValue.current === value) return
    preValue.current = value
    
    setValueUsePrevent(value)
  }, [value, curReg])

  const handleChange = useCallback((val?: InputValue) => {
    if (setValueUsePrevent(val as number) === 'prevent') return

    onChange?.(Number(val))
  }, [onChange, curReg])

  function setValueUsePrevent(value?: number) {
    if (value && !curReg.test(`${value}`)) return 'prevent'

    let newValue = Number(value)
    if (min !== undefined && newValue) {
      newValue = Math.max(min, newValue)
    }
    if (max !== undefined && newValue) {
      newValue = Math.min(max, newValue)
    }
    setValue(isNaN(newValue) ? undefined : Math.round(newValue / step) * step)
  }

  return (
    <Input
      className={className}
      style={style}
      value={_value}
      onChange={handleChange}
      splitFix
      prefix={prefix}
      suffix={
        suffix && (
          <div className='rabbit-unit-suffix'>
            {suffix}
          </div>
        )
      }
      control={
        step && (
          <div className='rabbit-step-wrapper'>
            <span className='rabbit-step-add' onClick={() => handleChange((_value || 0) + step)} />
            <span className='rabbit-step-reduce' onClick={() => handleChange((_value || 0) - step)} />
          </div>
        )
      }
    />
  )
}
