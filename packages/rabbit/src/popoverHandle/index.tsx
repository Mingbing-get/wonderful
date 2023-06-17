import React, { useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { createPopper, Placement, Instance, VirtualElement } from '@popperjs/core'
import classNames from 'classnames'

export type PopoverArrowType = 'small' | 'large' | 'middle' | 'none'

export type PopoverProps = {
  target?: HTMLElement
  content: React.ReactNode
  arrow?: PopoverArrowType
  placement?: Placement
  widthFollowTarget?: boolean
  className?: string
  style?: React.CSSProperties
}

import '../popover/index.scss'

function generateGetBoundingClientRect(x: number, y: number, width: number, height: number) {
  return () => ({
    width: width,
    height: height,
    top: y,
    right: x,
    bottom: y,
    left: x,
  })
}

export default function HandlePopover({ target, content, placement = 'bottom', arrow = 'middle', widthFollowTarget, className, style }: PopoverProps) {
  const displayRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const popperInstance = useRef<Instance>()
  const virtualElement = useRef<VirtualElement>({
    getBoundingClientRect: generateGetBoundingClientRect(0, 0, 0, 0),
  } as VirtualElement)

  useEffect(() => {
    setTimeout(() => {
      if (!displayRef.current || !arrowRef.current) return

      resetVirtualElement()

      popperInstance.current = createPopper(virtualElement.current, displayRef.current, {
        placement: placement,
        modifiers: [{ name: 'arrow', options: { element: arrowRef.current } }],
      })
    }, 0)
  }, [target, arrowRef.current])

  useEffect(() => {
    document.addEventListener('scroll', () => {
      requestAnimationFrame(resetVirtualElement)
    })

    return () => {
      popperInstance.current?.destroy()
    }
  }, [])

  const getTargetLocationAndSize = useCallback(() => {
    if (!target) return { top: 0, left: 0, width: 0, height: 0 }
    return target.getBoundingClientRect()
  }, [target])

  const resetVirtualElement = useCallback(() => {
    const { left, top, width, height } = getTargetLocationAndSize()
    virtualElement.current.getBoundingClientRect = generateGetBoundingClientRect(left, top, width, height) as any
  }, [getTargetLocationAndSize])

  return (
    <>
      {target &&
        ReactDOM.createPortal(
          <div
            className={classNames('rabbit-popper-wrapper', 'rabbit-component', arrow === 'none' && 'not-arrow', className)}
            style={{ ...style, minWidth: widthFollowTarget ? `${target.getBoundingClientRect().width}px` : '' }}
            ref={displayRef}
            onClick={(e) => e.stopPropagation()}>
            {content}
            <div
              className={classNames('rabbit-arrow', { 'is-small': arrow === 'small', 'is-large': arrow === 'large' })}
              ref={arrowRef}
            />
          </div>,
          document.body
        )}
    </>
  )
}
