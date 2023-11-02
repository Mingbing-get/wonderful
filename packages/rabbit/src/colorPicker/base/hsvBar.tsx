import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import { defaultHsv } from './selectArea'
import TrickBar from './trickBar'
import { hsvaObjectToRgbaObject, colorObjectToHsvaObject, toColorObject, colorObjectToHex } from './utils'

interface Props {
  style?: React.CSSProperties
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export default function HsvBar({ style, className, value, onChange }: Props) {
  const hsvValue = useMemo(() => {
    if (!value) return defaultHsv

    const colorObject = toColorObject(value)
    if (colorObject === false) return defaultHsv

    return colorObjectToHsvaObject(colorObject)
  }, [value])

  const handleChange = useCallback(
    (rate: number) => {
      const colorObject = hsvaObjectToRgbaObject({ h: rate * 360, s: hsvValue.s, v: hsvValue.v, a: hsvValue.a })
      onChange?.(colorObjectToHex(colorObject))
    },
    [hsvValue, onChange]
  )

  return (
    <TrickBar
      className={classNames(className, 'rabbit-hsv-bar')}
      style={style}
      rate={hsvValue.h / 360}
      onChange={handleChange}
    />
  )
}
