import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

import { useBoundaryHandle } from './context'
import useDebounceAndThrottle from '../hooks/useDebounceAndThrottle'

interface Props {
  _order: number
  lineColor?: string
}

export default function Handle({ _order, lineColor }: Props) {
  const [moving, setMoving] = useState(false)
  const [offset, setOffset] = useState(0)
  const startLocation = useRef(-1)

  const { direction, min, max, handleUpdateSpan } = useBoundaryHandle(_order)

  const getEffectValue = useCallback(
    (value: number) => {
      return Math.max(Math.min(value, max), min)
    },
    [min, max]
  )

  const handleUpdate = useCallback(
    useDebounceAndThrottle((location: number) => {
      if (startLocation.current === -1) return

      handleUpdateSpan(getEffectValue(location - startLocation.current))
      setOffset(0)
      startLocation.current = location
    }),
    [handleUpdateSpan, getEffectValue]
  )

  const handleUpdateRef = useRef(handleUpdate)
  useEffect(() => {
    handleUpdateRef.current = handleUpdate
  }, [handleUpdate])

  useEffect(() => {
    function mouseMove(e: MouseEvent) {
      if (startLocation.current === -1) return

      const currentLocation = direction === 'row' ? e.clientX : e.clientY
      setOffset(currentLocation - startLocation.current)
      handleUpdateRef.current(currentLocation)
    }

    function mouseUp(e: MouseEvent) {
      if (startLocation.current === -1) return

      startLocation.current = -1
      setMoving(false)
      setOffset(0)
    }

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseup', mouseUp)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseup', mouseUp)
    }
  }, [direction])

  const handleMousedown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      startLocation.current = direction === 'row' ? e.clientX : e.clientY
      setMoving(true)
    },
    [direction]
  )

  const trickStyle = useMemo(() => {
    const effectValue = getEffectValue(offset)

    return {
      transform: direction === 'row' ? `translateX(${effectValue}px)` : `translateY(${effectValue}px)`,
    }
  }, [offset, direction, getEffectValue])

  if (max < 0) {
    return <></>
  }

  return (
    <div
      className={classNames('rabbit-boundary-handle', `direction-${direction}`, moving && 'is-moving')}
      style={lineColor ? { backgroundColor: lineColor } : undefined}>
      <div
        className="rabbit-boundary-handle-trick"
        style={trickStyle}
        onMouseDown={handleMousedown}>
        <div className="rabbit-boundary-handle-bar" />
      </div>
    </div>
  )
}
