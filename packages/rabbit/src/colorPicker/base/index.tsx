import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'

import { BaseColorPickerProps } from './type'
import SelectArea from './selectArea'
import ColorBlock from './colorBlock'
import HsvBar from './hsvBar'
import OpacityBar from './opacityBar'
import DisplayValue from './displayValue'
import ShortcutRender from './shortcutRender'
import { toHex } from './utils'

import './index.scss'

export default function BaseColorPicker({ value, onChange, shortcutList, className, style }: BaseColorPickerProps) {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue(value ? toHex(value) : undefined)
  }, [value])

  const handleChange = useCallback(
    (color: string) => {
      setValue(color)
      onChange?.(color)
    },
    [onChange]
  )

  return (
    <div
      className={classNames('rabbit-base-color-picker-wrapper rabbit-component', className)}
      style={style}>
      <SelectArea
        value={_value}
        onChange={handleChange}
      />
      <div className="rabbit-base-center">
        <ColorBlock
          className="rabbit-base-color-current"
          color={_value || '#f00'}
        />
        <div className="rabbit-base-color-bar-group">
          <HsvBar
            value={_value}
            onChange={handleChange}
          />
          <OpacityBar
            value={_value}
            onChange={handleChange}
          />
        </div>
      </div>
      <DisplayValue
        value={_value}
        onChange={handleChange}
      />
      <ShortcutRender
        value={_value}
        shortcutList={shortcutList}
        onPickColor={handleChange}
      />
    </div>
  )
}
