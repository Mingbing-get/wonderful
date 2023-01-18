import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import Group from './group'
import { useCheckbox } from './context'

import './index.scss'

type Props = {
  className?: string,
  style?: React.CSSProperties,
  disabled?: boolean,
  checked?: boolean,
  halfChecked?: boolean,
  defaultChecked?: boolean,
  children: string,
  onChange?: (checked: boolean) => void
}

function Checkbox({
  className,
  style,
  disabled,
  checked,
  halfChecked,
  defaultChecked,
  children,
  onChange
}: Props, ref?: React.ForwardedRef<HTMLDivElement>) {
  const [_checked, setChecked] = useState<boolean>(false)
  const { value, triggerChange, addValue } = useCheckbox()
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
    if (value?.includes(children)) {
      preChecked.current = true
      setChecked(true)
    }
  }, [])

  useEffect(() => {
    if (!!value?.includes(children) === preChecked.current || !addValue) return

    setChecked(!preChecked.current)
    onChange?.(!preChecked.current)
    preChecked.current = !preChecked.current
  }, [value])

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled) return

    preChecked.current = !_checked
    onChange?.(!_checked)
    triggerChange?.(children, !_checked)
    setChecked(!_checked)
  }

  return (
    <div ref={ref} className={classNames('rabbit-checkbox-wrapper', className)} style={style} onClick={handleClick}>
      <div className={classNames('checkbox-control', _checked && 'is-checked', halfChecked && 'is-half-checked', disabled && 'is-disabled')}></div>
      <span>{children}</span>
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, Props>(Checkbox)

export { Group }