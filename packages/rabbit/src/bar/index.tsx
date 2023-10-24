import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import compatible from '../compatible'

import './index.scss'

let startMoveLocation = 0
let startMoveOffset = 0
let newOffset = 0
let hasChange = false

type Props = {
  refDom: React.RefObject<HTMLElement>
  min?: number
  max?: number
  onChange?: (value: number) => void
  onStart?: () => void
  onEnd?: () => void
}

function Bar({ refDom, min, max, onChange, onStart, onEnd }: Props, ref?: React.ForwardedRef<HTMLDivElement>) {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [refDomRect, setRefDomRect] = useState<DOMRect>()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (!refDom.current) return

    compatible.getBoundingClientRect(refDom.current).then(domRect => {
      setRefDomRect(domRect)
    })
  }, [refDom.current])

  useEffect(() => {
    if (isMouseDown) onStart?.()
    else onEnd?.()
  }, [isMouseDown])

  function handleMouseDown(e: React.MouseEvent | React.TouchEvent) {
    if (e.type === 'touchstart') {
      startMoveLocation = (e as React.TouchEvent).targetTouches[0].clientX
    } else {
      startMoveLocation = (e as React.MouseEvent).clientX
    }
    startMoveOffset = offset

    setIsMouseDown(true)
  }

  function handleMouseMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isMouseDown) return

    let clientX = 0
    if (e.type === 'touchmove') {
      clientX = (e as React.TouchEvent).targetTouches[0].clientX
    } else {
      clientX = (e as React.MouseEvent).clientX
    }

    newOffset = clientX - startMoveLocation + startMoveOffset
    if (!hasChange) {
      hasChange = true
      requestAnimationFrame(changeOffset)
    }
  }

  function changeOffset() {
    if (!hasChange || !refDomRect) return

    hasChange = false
    if (min !== undefined && newOffset + refDomRect.left < min) {
      newOffset = min - refDomRect.left
    }

    if (max !== undefined && newOffset + refDomRect.left > max) {
      newOffset = max - refDomRect.left
    }

    setOffset(newOffset)
    onChange?.(newOffset)
  }

  if (!refDomRect) return <></>

  return (
    <div
      ref={ref}
      className="bar-wrapper rabbit-component "
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      style={{
        height: refDomRect.height,
        top: refDomRect.top,
        left: refDomRect.left + offset - 2,
      }}>
      <div className="bar-handle" />
      <div
        className="bar-mask"
        style={{ width: isMouseDown ? '100vw' : 0 }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onTouchEnd={() => setIsMouseDown(false)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
      />
    </div>
  )
}

const BarWidthRef = React.forwardRef<HTMLDivElement, Props>(Bar)

function PortalBar(props: Props, ref?: React.ForwardedRef<HTMLDivElement>) {
  const wrapper = useRef(document.createElement('div'))

  useEffect(() => {
    compatible.appendChild(document.body, wrapper.current)

    return () => {
      compatible.removeChild(document.body, wrapper.current)
    }
  }, [])

  return createPortal(
    <BarWidthRef
      {...props}
      ref={ref}
    />,
    wrapper.current as HTMLDivElement
  )
}

export default React.forwardRef<HTMLDivElement, Props>(PortalBar)
