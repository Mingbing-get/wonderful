import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'
import { Button, Popover  } from '@douyinfe/semi-ui'

import './index.scss'

type Props = {
  value?: string,
  onChange: (value?: string) => void
}

export default function ColorPicker({
  value,
  onChange
}: Props) {
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
    <div className='color-picker-wrapper'>
      <Popover
        showArrow
        visible={visible}
        position='top'
        trigger='custom'
        className='color-picker-popover'
        content={
          (
            <div>
              <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
              <div className='color-picker-popover-bottom'>
                <Button theme='solid' size='small' type='primary' onClick={handleConfirm}>确定</Button>
                <Button theme='solid' size='small' type='secondary' onClick={handleCancel}>取消</Button>
              </div>
            </div>
          )
        }
      >
        <div
          className='color-picker-display'
          style={{ backgroundColor: color }}
          onClick={() => setVisible(true)}
        ></div>
      </Popover>
    </div>
  )
}
