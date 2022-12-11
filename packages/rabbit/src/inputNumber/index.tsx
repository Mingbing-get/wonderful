import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import classNames from 'classnames'

import Input from '../input'
import Icon from '../icon'

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
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
  onChange,
  onBlur
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

  const handleChange = useCallback((val?: string | number) => {
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
      className={classNames('rabbit-number-wrapper', className)}
      style={style}
      value={_value}
      onChange={e => handleChange(e.target.value)}
      onBlur={onBlur}
      prefix={prefix}
      suffix={
        <>
          {
            suffix && (
              <>
                <div className='rabbit-unit-suffix'>
                  {suffix}
                </div>
              </>
            )
          }
          {
            step && (
              <div className='rabbit-step-wrapper'>
                <Icon type='arrowUp' onClick={() => handleChange((_value || 0) + step)} />
                <Icon type='arrowDown' onClick={() => handleChange((_value || 0) - step)} />
              </div>
            )
          }
        </>
      }
    />
  )
}
