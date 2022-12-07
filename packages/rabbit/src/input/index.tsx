import React, { useState, useEffect, useCallback, useRef } from 'react'
import classNames from 'classnames'

import './index.scss'

export type InputValue = number | string;

type Props = {
  defaultValue?: InputValue;
  value?: InputValue;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  readonly?: boolean;
  prefix?: React.ReactNode;
  control?: React.ReactNode;
  suffix?: React.ReactNode;
  splitFix?: boolean;
  onChange?: (value?: InputValue) => void;
}

function Input({
  defaultValue,
  value,
  placeholder,
  className,
  style,
  readonly,
  prefix,
  control,
  suffix,
  splitFix,
  onChange
}: Props, ref?: React.ForwardedRef<HTMLDivElement>){
  const [_value, setValue] = useState<InputValue>()
  const preValue = useRef<InputValue>()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    } else {
      setValue(e.target.value)
    }
  }, [onChange])

  useEffect(() => setValue(defaultValue), [])

  useEffect(() => {
    if (preValue.current === value) return

    preValue.current = value
    setValue(value === undefined ? undefined : `${value}`)
  }, [value])

  return (
    <div
      className={classNames('rabbit-input-wrapper', className, { 'has-prefix': !!prefix, 'has-control': !!control, 'has-suffix': !!suffix, 'split-fix': splitFix })}
      style={style}
      ref={ref}
    >
      {
        prefix && (
          <div className='rabbit-input-prefix'>
            {prefix}
          </div>
        )
      }
      <input
        value={_value || ''}
        placeholder={placeholder}
        onChange={handleChange}
        readOnly={readonly}
      />
      {
        suffix && (
          <div className='rabbit-input-suffix'>
            {suffix}
          </div>
        )
      }
      {
        control && (
          <div className='rabbit-input-control'>
            {control}
          </div>
        )
      }
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, Props>(Input)
