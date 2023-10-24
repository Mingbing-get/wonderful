import React, { useRef, useState, useEffect, ForwardedRef, useImperativeHandle, forwardRef } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import compatible from '../compatible'
import PopoverInstance from '../popoverInstance'
import { PopoverHandleProps } from '../types/popoverHandle'

import './index.scss'

function HandlePopover(
  { target, content, placement = 'bottom', arrow = 'middle', widthFollowTarget, className, style, offset, onChangeWrapper }: PopoverHandleProps,
  ref?: ForwardedRef<PopoverInstance | undefined>
) {
  const displayRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const popperInstance = useRef(new PopoverInstance())
  const [targetWidth, setTargetWidth] = useState(0)

  useImperativeHandle(ref, () => popperInstance.current, [])

  useEffect(() => {
    if (!displayRef.current || !arrowRef.current) return

    onChangeWrapper?.(displayRef.current)
    popperInstance.current.updateConfig(target, displayRef.current, {
      placement: placement,
      arrow: arrowRef.current,
      offset,
    })
  }, [target, offset, arrowRef.current])

  useEffect(() => {
    popperInstance.current = new PopoverInstance()

    return () => {
      popperInstance.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (!target) return

    requestAnimationFrame(() => {
      compatible.getBoundingClientRect(target).then(domRect => {
        setTargetWidth(domRect.width)
      })
    })
  }, [target])

  return (
    <>
      {target &&
        ReactDOM.createPortal(
          <div
            className={classNames(
              'rabbit-popper-wrapper',
              'rabbit-component',
              { 'not-arrow': arrow === 'none', 'is-small': arrow === 'small', 'is-large': arrow === 'large' },
              className
            )}
            style={{ ...style, minWidth: widthFollowTarget ? `${targetWidth}px` : '' }}
            ref={displayRef}
            onClick={(e) => e.stopPropagation()}>
            {content}
            <div
              className="rabbit-arrow"
              ref={arrowRef}
            />
          </div>,
          compatible.getBody()
        )}
    </>
  )
}

export default forwardRef(HandlePopover)
