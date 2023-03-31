import React, { useState, useEffect } from 'react'
import { InputNumber } from '../../../../../rabbit/src'

type Props = {
  value?: number
  suffix?: string
  style?: React.CSSProperties
  onChange?: (value?: number) => void
}

export default function({
  value,
  suffix,
  style,
  onChange
}: Props) {
  const [_value, setValue] = useState(value)

  useEffect(() => setValue(value), [value])

  function handleBlur() {
    onChange?.(_value)
  }

  return (
    <InputNumber
      style={style}
      suffix={suffix}
      value={_value}
      onChange={val => setValue(val as number)}
      onBlur={handleBlur}
    />
  )
}
