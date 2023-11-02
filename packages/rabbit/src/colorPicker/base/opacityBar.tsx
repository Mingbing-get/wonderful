import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import TrickBar from './trickBar'
import { toColorObject, colorObjectToHex } from './utils'
import { ColorObject } from './type'

interface Props {
  style?: React.CSSProperties
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export const defaultColor: ColorObject = { r: 255, g: 0, b: 0 }

export default function OpacityBar({ style, className, value, onChange }: Props) {
  const colorValue = useMemo(() => {
    if (!value) return defaultColor

    return toColorObject(value) || defaultColor
  }, [value])

  const { startColor, endColor } = useMemo(() => {
    return {
      startColor: colorObjectToHex({ ...colorValue, a: 0 }),
      endColor: colorObjectToHex({ ...colorValue, a: 255 }),
    }
  }, [colorValue])

  const handleChange = useCallback(
    (rate: number) => {
      onChange?.(colorObjectToHex({ ...colorValue, a: rate * 255 }))
    },
    [colorValue, onChange]
  )

  return (
    <TrickBar
      className={classNames(className)}
      style={{
        ...style,
        background: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZGBgEGHAD97gk2YcNYBhmIQBgWSAP52AwoAQwJvQRg1gACckQoC2gQgAIF8IscwEtKYAAAAASUVORK5CYII=')
        left center, linear-gradient(to right, ${startColor} 0%, ${endColor} 100%)`,
      }}
      rate={(colorValue.a === undefined ? 255 : colorValue.a) / 255}
      onChange={handleChange}
    />
  )
}
