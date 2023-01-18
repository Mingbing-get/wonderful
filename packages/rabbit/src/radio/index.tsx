import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import Group from './group'
import { useRadio } from './context'

import './index.scss'

type Props = {
  className?: string,
  style?: React.CSSProperties,
  disabled?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  children: string,
  onChange?: (checked: boolean) => void
}

function Radio({
  className,
  style,
  disabled,
  checked,
  defaultChecked,
  children,
  onChange
}: Props, ref?: React.ForwardedRef<HTMLDivElement>) {
  const [_checked, setChecked] = useState<boolean>(false)
  const { value, triggerChange, addValue } = useRadio()
  const preChecked = useRef<boolean>(false)

  useEffect(() => {
    if (defaultChecked === undefined) return
    preChecked.current = defaultChecked
    defaultChecked && addValue?.(children)
    setChecked(defaultChecked)
  }, [])

  useEffect(() => {
    if (checked === undefined || preChecked.current === checked) return
    preChecked.current = checked
    checked && addValue?.(children)
    setChecked(checked)
  }, [checked])

  useEffect(() => {
    if (value === children) {
      preChecked.current = true
      setChecked(true)
    }
  }, [])

  useEffect(() => {
    if ((value === children) === preChecked.current || !addValue) return

    setChecked(!preChecked.current)
    onChange?.(!preChecked.current)
    preChecked.current = !preChecked.current
  }, [value])

  function handleClick() {
    if (disabled) return

    preChecked.current = !_checked
    onChange?.(!_checked)
    triggerChange?.(children, !_checked)
    setChecked(!_checked)
  }

  return (
    <div ref={ref} className={classNames('rabbit-radio-wrapper', className)} style={style} onClick={handleClick}>
      <div className={classNames('radio-control', _checked && 'is-checked', disabled && 'is-disabled')}></div>
      <span>{children}</span>
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, Props>(Radio)

export { Group }