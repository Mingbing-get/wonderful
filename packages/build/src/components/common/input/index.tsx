import React, { useState, useEffect } from 'react'
import { Input } from '../../../../../rabbit/src'

type Props = {
  value?: number | string
  suffix?: string
  onChange?: (value?: number | string) => void
}

export default function ({
  value,
  suffix,
  onChange
}: Props) {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue(_value)
  }, [value])

  function handleBlur() {
    onChange?.(_value)
  }

  return (
    <Input
      suffix={suffix}
      value={_value}
      onChange={e => setValue(e.target.value)}
      onBlur={handleBlur}
    />
  )
}
