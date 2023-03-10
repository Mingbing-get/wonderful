import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import classNames from 'classnames'

import Input, { Props as InputProps } from '../input'
import Icon from '../icon'

import './index.scss'
import { InputRef } from 'rc-input'

type Props = Omit<InputProps, 'onChange' | 'defaultValue' | 'value'> & {
  defaultValue?: number,
  value?: number;
  step?: number | null;
  min?: number;
  max?: number;
  showStepBtn?: boolean;
  onChange?: (value?: number) => void;
}

const numberReg = /^(-|\d)\d*$/
const floatReg = /^(-|\d)\d*\.?\d*$/

function InputNumber({
  defaultValue,
  value,
  step = 1,
  min,
  max,
  showStepBtn = true,
  suffix,
  className,
  onChange,
  onBlur,
  ...extra
}: Props, ref: React.ForwardedRef<InputRef>) {
  const [_value, setValue] = useState<number>()
  const preValue = useRef<number>()

  const curReg = useMemo(() => {
    if (step === null) return floatReg

    if (floatReg.test(`${step}`)) return floatReg

    return numberReg
  }, [step])

  useEffect(() => {
    if (preValue.current === value) return
    setValue(value)
    preValue.current = value
  }, [value])

  useEffect(() => {
    if (defaultValue === undefined) return
    setValue(defaultValue)
    preValue.current = defaultValue
  }, [])

  const handleChange = useCallback((val?: string | number) => {
    if (extra.disabled) return
    
    setValue(val as number)
    onChange?.(val as number)
    preValue.current = val as number
  }, [onChange, curReg, extra.disabled])

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const newValue = setValueUsePrevent(_value)
    setValue(newValue)
    onChange?.(newValue)
    preValue.current = newValue
    onBlur?.(e)
  }

  function setValueUsePrevent(value?: number) {
    if (value && !curReg.test(`${value}`) || value as any === '') return undefined

    let newValue = Number(value)
    if (min !== undefined && newValue) {
      newValue = Math.max(min, newValue)
    }
    if (max !== undefined && newValue) {
      newValue = Math.min(max, newValue)
    }

    return isNaN(newValue) ? undefined : (
      step === null ? newValue : Math.round(newValue / step) * step
    )
  }

  return (
    <Input
      ref={ref}
      {...extra}
      className={classNames('rabbit-number-wrapper', className)}
      value={_value}
      onChange={e => handleChange(e.target.value)}
      onBlur={handleBlur}
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
            showStepBtn && (
              <div className='rabbit-step-wrapper'>
                <Icon type='arrowUp' onClick={() => handleChange((_value || 0) + (step || 1))} />
                <Icon type='arrowDown' onClick={() => handleChange((_value || 0) - (step || 1))} />
              </div>
            )
          }
        </>
      }
    />
  )
}

export default React.forwardRef<InputRef, Props>(InputNumber)
