import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import useDebounceAndThrottle from '../../hooks/useDebounceAndThrottle'
import compatible from '../../compatible'

interface Props {
  style?: React.CSSProperties
  className?: string
  rate?: number
  onChange?: (rate: number) => void
}

export default function TrickBar({ style, className, rate, onChange }: Props) {
  const [_rate, setRate] = useState(rate || 0)

  const trickRef = useRef<HTMLDivElement>(null)
  const mouseDownRef = useRef(false)
  const changeRef = useRef((v: number) => {})

  useEffect(() => {
    setRate(rate || 0)
  }, [rate])

  useEffect(() => {
    function mouseMove(e: MouseEvent) {
      if (!mouseDownRef.current) return

      changeRef.current(compatible.getClientFromMouseEvent(e as any).clientX)
    }

    function mouseUp(e: MouseEvent) {
      mouseDownRef.current = false
    }

    compatible.getBody().addEventListener('mousemove', mouseMove)
    compatible.getBody().addEventListener('mouseup', mouseUp)

    return () => {
      compatible.getBody().removeEventListener('mousemove', mouseMove)
      compatible.getBody().removeEventListener('mouseup', mouseUp)
    }
  }, [])

  const handleChange = useCallback(
    useDebounceAndThrottle(async (x: number) => {
      if (!trickRef.current) return

      const { left, width } = await compatible.getBoundingClientRect(trickRef.current)
      const rx = Math.min(Math.max(0, x - left), width)

      onChange?.(rx / width)
      setRate(rx / width)
    }),
    [onChange]
  )

  const handleClickTrick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handleChange(compatible.getClientFromMouseEvent(e).clientX)
    },
    [handleChange]
  )

  const handleMouseDownBar = useCallback(() => {
    mouseDownRef.current = true
  }, [])

  useEffect(() => {
    changeRef.current = handleChange
  }, [handleChange])

  return (
    <div
      ref={trickRef}
      className={classNames(className, 'rabbit-color-base-trick')}
      style={style}
      onClick={handleClickTrick}>
      <div
        className="rabbit-color-base-bar"
        style={{ left: `${_rate * 100}%` }}
        onMouseDown={handleMouseDownBar}
      />
    </div>
  )
}
