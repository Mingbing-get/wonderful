import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import Group from './group'
import { useRadio } from './context'
import { RadioProps } from '../types/radio'

import './index.scss'

function Radio({
  className,
  style,
  value,
  disabled,
  checked,
  defaultChecked,
  children,
  onChange
}: RadioProps, ref?: React.ForwardedRef<HTMLDivElement>) {
  const [_checked, setChecked] = useState<boolean>(false)
  const { value: _value, triggerChange, addValue } = useRadio()
  const preChecked = useRef<boolean>(false)

  useEffect(() => {
    if (defaultChecked === undefined) return
    preChecked.current = defaultChecked
    defaultChecked && value && addValue?.(value)
    setChecked(defaultChecked)
  }, [])

  useEffect(() => {
    if (checked === undefined || preChecked.current === checked) return
    preChecked.current = checked
    checked && value && addValue?.(value)
    setChecked(checked)
  }, [checked])

  useEffect(() => {
    if (value && _value === value) {
      preChecked.current = true
      setChecked(true)
    }
  }, [])

  useEffect(() => {
    if (!value || (_value === value) === preChecked.current || !addValue) return

    setChecked(!preChecked.current)
    onChange?.(!preChecked.current)
    preChecked.current = !preChecked.current
  }, [_value])

  function handleClick() {
    if (disabled) return

    preChecked.current = !_checked
    onChange?.(!_checked)
    value && triggerChange?.(value, !_checked)
    setChecked(!_checked)
  }

  return (
    <div ref={ref} className={classNames('rabbit-radio-wrapper', className)} style={style} onClick={handleClick}>
      <div className={classNames('radio-control', _checked && 'is-checked', disabled && 'is-disabled')}></div>
      <span>{children}</span>
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, RadioProps>(Radio)

export { Group }