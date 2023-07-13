import React, { useCallback, useEffect, useState } from 'react'
import { SketchPicker, ColorResult } from 'react-color'
import classNames from 'classnames'

import Popover from '../popover'
import { ColorPickerProps } from '../types/colorPicker'

import './index.scss'

export default function ColorPicker({ className, style, value, children, onChange, ...extra }: ColorPickerProps) {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue(value)
  }, [value])

  const handleChange = useCallback(
    (newColor: ColorResult) => {
      setValue(newColor.hex)
      onChange?.(newColor.hex)
    },
    [onChange]
  )

  return (
    <Popover
      className="rabbit-color-picker-popover-wrapper rabbit-component"
      placement="top"
      arrow="small"
      content={
        <SketchPicker
          color={_value}
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
