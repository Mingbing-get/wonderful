import React, { useRef, useEffect, ForwardedRef, useImperativeHandle, forwardRef } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

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
            style={{ ...style, minWidth: widthFollowTarget ? `${target.getBoundingClientRect().width}px` : '' }}
            ref={displayRef}
            onClick={(e) => e.stopPropagation()}>
            {content}
            <div
              className="rabbit-arrow"
              ref={arrowRef}
            />
          </div>,
          document.body
        )}
    </>
  )
}

export default forwardRef(HandlePopover)
