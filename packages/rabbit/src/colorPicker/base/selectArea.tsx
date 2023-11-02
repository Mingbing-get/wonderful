import React, { useCallback, useMemo, useRef } from 'react'
import classNames from 'classnames'

import { toColorObject, colorObjectToHsvaObject, hsvaObjectToRgbaObject, colorObjectToHex } from './utils'
import { HSVObject } from './type'
import compatible from '../../compatible'

interface Props {
  style?: React.CSSProperties
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export const defaultHsv: HSVObject = { h: 0, s: 1, v: 1 }

export default function SelectArea({ style, className, value, onChange }: Props) {
  const areaRef = useRef<HTMLDivElement>(null)

  const hsvValue = useMemo(() => {
    if (!value) return defaultHsv

    const colorObject = toColorObject(value)
    if (colorObject === false) return defaultHsv

    return colorObjectToHsvaObject(colorObject)
  }, [value])

  const baseColor = useMemo(() => {
    const colorValue = hsvaObjectToRgbaObject({ h: hsvValue.h, s: 1, v: 1 })

    return colorObjectToHex(colorValue)
  }, [hsvValue])

  const handleClickArea = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (!areaRef.current) return

      const { width, height, left, top } = await compatible.getBoundingClientRect(areaRef.current)
      const rx = e.clientX - left
      const ry = e.clientY - top

      const colorValue = hsvaObjectToRgbaObject({ h: hsvValue.h, s: rx / width, v: (height - ry) / height, a: hsvValue.a })
      onChange?.(colorObjectToHex(colorValue))
    },
    [onChange, hsvValue]
  )

  return (
    <div
      ref={areaRef}
      className={classNames('rabbit-color-select-area', className)}
      style={{ ...style, backgroundColor: baseColor }}
      onClick={handleClickArea}>
      <div
        className="select-tip"
        style={{ left: `${hsvValue.s * 100}%`, bottom: `${hsvValue.v * 100}%`, '--current-color': value } as React.CSSProperties}
      />
    </div>
  )
}
