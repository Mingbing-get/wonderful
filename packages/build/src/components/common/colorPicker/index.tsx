import React, { useState, useEffect } from 'react'
import { Button, Popover, BaseColorPicker } from '../../../../../rabbit/src'

import './index.scss'

type Props = {
  value?: string
  onChange: (value?: string) => void
}

export default function ColorPicker({ value, onChange }: Props) {
  const [color, setColor] = useState(value)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (value === color) return
    setColor(value)
  }, [value])

  function handleConfirm() {
    setVisible(false)
    onChange(color)
  }

  function handleCancel() {
    setVisible(false)
    setColor(value)
  }

  return (
    <div className="color-picker-wrapper">
      <Popover
        visible={visible}
        onVisibleChange={setVisible}
        className="color-picker-popover"
        content={
          <div>
            <BaseColorPicker
              color={color}
              onChange={setColor}
            />
            <div className="color-picker-popover-bottom">
              <Button
                type="primary"
                onClick={handleConfirm}>
                确定
              </Button>
              <Button onClick={handleCancel}>取消</Button>
            </div>
          </div>
        }>
        <div
          className="color-picker-display"
          style={{ backgroundColor: color }}
          onClick={() => setVisible(true)}></div>
      </Popover>
    </div>
  )
}
