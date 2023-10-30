import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import classNames from 'classnames'

import Icon from '../icon'
import { InputProps, InputRef } from '../types/input'

import './index.scss'

function Input(
  { className, style, allowClear, inputClassName, inputStyle, prefix, suffix, value, defaultValue, onFocus, onBlur, ...extra }: InputProps,
  ref?: React.ForwardedRef<InputRef>
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocus, setIsFocus] = useState(false)

  const setInputValue = useCallback((value: string | number | readonly string[]) => {
    if (!inputRef.current) return

    const newValue = `${value}`
    if (inputRef.current.value === newValue) return

    inputRef.current.value = newValue
  }, [])

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocus(true)
      onFocus?.(e)
    },
    [onFocus]
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocus(false)
      onBlur?.(e)
    },
    [onBlur]
  )

  const handleClear = useCallback(() => {
    setInputValue('')
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (value === undefined) return

    setInputValue(value)
  }, [value])

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [])

  return (
    <div
      className={classNames('rabbit-input-wrapper', 'rabbit-component', isFocus && 'is-focus', extra.disabled && 'is-disabled', className)}
      style={style}>
      {prefix && <span className="rabbit-input-prefix">{prefix}</span>}
      <input
        {...extra}
        className={inputClassName}
        style={inputStyle}
        ref={inputRef}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {allowClear && (
        <span
          className="rabbit-input-clear"
          onClick={handleClear}>
          {allowClear === true ? <Icon type="close" /> : allowClear.clearIcon}
        </span>
      )}
      {suffix && <span className="rabbit-input-suffix">{suffix}</span>}
    </div>
  )
}

export default React.forwardRef<InputRef, InputProps>(Input)
