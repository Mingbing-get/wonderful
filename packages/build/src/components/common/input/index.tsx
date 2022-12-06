import React, { useState, useEffect } from 'react'
import { Input } from '@douyinfe/semi-ui'

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
      onChange={val => setValue(val)}
      onBlur={handleBlur}
    />
  )
}
