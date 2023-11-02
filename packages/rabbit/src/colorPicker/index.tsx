import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'

import BaseColorPicker from './base'
import Popover from '../popover'
import { ColorPickerProps } from '../types/colorPicker'

import './index.scss'

export default function ColorPicker({ className, style, value, children, onChange, ...extra }: ColorPickerProps) {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue(value)
  }, [value])

  const handleChange = useCallback(
    (newColor?: string) => {
      setValue(newColor)
      onChange?.(newColor)
    },
    [onChange]
  )

  return (
    <Popover
      className="rabbit-color-picker-popover-wrapper rabbit-component"
      placement="top"
      arrow="small"
      content={
        <BaseColorPicker
          value={_value}
          onChange={handleChange}
        />
      }>
      <div
        className={classNames('rabbit-color-picker-wrapper  rabbit-component', className)}
        style={style}
        {...extra}>
        {children || (
          <div
            style={{ backgroundColor: _value }}
            className="color-picker-display"
          />
        )}
      </div>
    </Popover>
  )
}
