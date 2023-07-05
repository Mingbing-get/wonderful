import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import Group from './group'
import { useCheckbox } from './context'
import { CheckboxProps } from '../types/checkbox'

import './index.scss'

function Checkbox(
  { className, disabled, checked, halfChecked, defaultChecked, value, children, onChange, ...extra }: CheckboxProps,
  ref?: React.ForwardedRef<HTMLDivElement>
) {
  const [_checked, setChecked] = useState<boolean>(false)
  const { value: values, triggerChange, addValue } = useCheckbox()
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
    if (!value) return
    if (values?.includes(value)) {
      preChecked.current = true
      setChecked(true)
    }
  }, [])

  useEffect(() => {
    if (!value || !!values?.includes(value) === preChecked.current || !addValue) return

    setChecked(!preChecked.current)
    onChange?.(!preChecked.current)
    preChecked.current = !preChecked.current
  }, [values])

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled) return

    preChecked.current = !_checked
    onChange?.(!_checked)
    value && triggerChange?.(value, !_checked)
    setChecked(!_checked)
  }

  return (
    <div
      ref={ref}
      className={classNames('rabbit-checkbox-wrapper', 'rabbit-component', className)}
      {...extra}
      onClick={handleClick}>
      <div className={classNames('checkbox-control', _checked && 'is-checked', halfChecked && 'is-half-checked', disabled && 'is-disabled')}></div>
      <span>{children}</span>
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, CheckboxProps>(Checkbox)

export { Group }
