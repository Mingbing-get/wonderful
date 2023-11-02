import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import Input from '../../input'
import InputNumber from '../../inputNumber'
import { defaultColor } from './opacityBar'
import { toColorObject, isHex, colorObjectToHex } from './utils'

interface Props {
  style?: React.CSSProperties
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export default function DisplayValue({ style, className, value, onChange }: Props) {
  const colorValue = useMemo(() => {
    if (!value) return defaultColor

    return toColorObject(value) || defaultColor
  }, [value])

  const handleChangeHex = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      if (v === value || !isHex(v)) return

      onChange?.(v)
    },
    [value, onChange]
  )

  const handleChangeChannel = useCallback(
    (channel: 'r' | 'g' | 'b' | 'a', v: number = 0) => {
      if (typeof v !== 'number' || v === colorValue[channel]) return

      onChange?.(colorObjectToHex({ ...colorValue, [channel]: v }))
    },
    [colorValue, onChange]
  )

  return (
    <div
      className={classNames(className, 'rabbit-base-color-display')}
      style={style}>
      <div className="rabbit-base-color-display-item is-lang">
        <Input
          value={value || '#ff0000'}
          onBlur={handleChangeHex}
        />
        <span className="rabbit-base-color-display-label">HEX</span>
      </div>
      <div className="rabbit-base-color-display-item">
        <InputNumber
          value={colorValue.r}
          min={0}
          max={255}
          showStepBtn={false}
          onChange={(v) => handleChangeChannel('r', v)}
        />
        <span className="rabbit-base-color-display-label">R</span>
      </div>
      <div className="rabbit-base-color-display-item">
        <InputNumber
          value={colorValue.g}
          min={0}
          max={255}
          showStepBtn={false}
          onChange={(v) => handleChangeChannel('g', v)}
        />
        <span className="rabbit-base-color-display-label">G</span>
      </div>
      <div className="rabbit-base-color-display-item">
        <InputNumber
          value={colorValue.b}
          min={0}
          max={255}
          showStepBtn={false}
          onChange={(v) => handleChangeChannel('b', v)}
        />
        <span className="rabbit-base-color-display-label">B</span>
      </div>
      <div className="rabbit-base-color-display-item">
        <InputNumber
          value={colorValue.a === undefined ? 255 : colorValue.a}
          min={0}
          max={255}
          showStepBtn={false}
          onChange={(v) => handleChangeChannel('a', v)}
        />
        <span className="rabbit-base-color-display-label">A</span>
      </div>
    </div>
  )
}
