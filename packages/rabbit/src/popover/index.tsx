import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { createPopper, Placement, Instance, VirtualElement } from '@popperjs/core'
import classNames from 'classnames'

import './index.scss'

type Props = {
  children: React.ReactElement,
  content: React.ReactElement,
  trigger?: 'click' | 'hover' | 'focus',
  arrow?: 'small' | 'large' | 'middle',
  placement?: Placement,
  visible?: boolean,
  delay?: number,
  className?: string
  onVisibleChange?: (visible: boolean) => void
}

export default function Popover({
  children,
  content,
  trigger = 'click',
  placement = 'bottom',
  arrow = 'middle',
  visible,
  delay = 500,
  className,
  onVisibleChange
}: Props) {
  const targetRef = useRef<HTMLElement>(null)
  const perTargetRef = useRef(false)
  const counter = useRef(0)
  const displayRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const popperInstance = useRef<Instance>()
  const virtualElement = useRef<VirtualElement>({
    getBoundingClientRect: generateGetBoundingClientRect(0, 0, 0, 0),
  } as VirtualElement)

  const [isHidden, setIsHidden] = useState(!visible)

  useEffect(() => {
    if (!displayRef.current || !arrowRef.current ) return

    resetVirtualElement()

    popperInstance.current = createPopper(virtualElement.current, displayRef.current, {
      placement: placement,
      modifiers: [
        { name: 'arrow', options: { element: arrowRef.current } }
      ],
    })
  }, [displayRef.current, arrowRef.current])

  useEffect(() => {
    document.addEventListener('click', () => {
      if (trigger !== 'click') return
      setIsHidden(true)
    })
  }, [])

  useEffect(() => {
    if (!targetRef.current || !displayRef.current || perTargetRef.current) return
    perTargetRef.current = true

    trigger === 'click' && targetRef.current.addEventListener('click', toggleShow)

    trigger === 'hover' && (
      targetRef.current.addEventListener('mouseenter', () => {
        counter.current++
        setIsHidden(false)
      }),
      targetRef.current.addEventListener('mouseleave', () => {
        counter.current--
        setTimeout(() => {
          if (counter.current === 0) setIsHidden(true)
        }, delay)
      }),

      displayRef.current.addEventListener('mouseenter', () => {
        counter.current++
        setIsHidden(false)
      }),
      displayRef.current.addEventListener('mouseleave', () => {
        counter.current--
        setTimeout(() => {
          if (counter.current === 0) setIsHidden(true)
        }, delay)
      })
    )

    trigger === 'focus' && (
      targetRef.current.addEventListener('focus', () => setIsHidden(false)),
      targetRef.current.addEventListener('blur', () => setIsHidden(true))
    )
  }, [targetRef.current, displayRef.current])

  function resetVirtualElement() {
    const { left, top, width, height } = getTargetLocationAndSize()
    virtualElement.current.getBoundingClientRect = generateGetBoundingClientRect(left, top, width, height) as any
  }

  function getTargetLocationAndSize() {
    if (!targetRef.current) return { top: 0, left: 0, width: 0, height: 0 }
    return targetRef.current.getBoundingClientRect()
  }

  useEffect(() => {
    setIsHidden(!visible)
  }, [visible])

  useEffect(() => {
    onVisibleChange?.(!isHidden)

    if (!isHidden) {
      resetVirtualElement()
      popperInstance.current?.update()
    }
  }, [isHidden])

  function generateGetBoundingClientRect(x: number, y: number, width: number, height: number) {
    return () => ({
      width: 0,
      height: height,
      top: y,
      right: x + width / 2,
      bottom: y,
      left: x + width / 2,
    })
  }

  function toggleShow(e: MouseEvent) {
    setIsHidden((isHidden) => !isHidden)
    e.stopPropagation()
    return false
  }

  const targetElement = React.cloneElement(children, {
    ref: targetRef
  })

  return (
    <>
      { targetElement }
      {
        ReactDOM.createPortal(
          <div
            className={classNames('rabbit-popper-wrapper', className, { 'is-hidden': isHidden })}
            ref={displayRef}
            onClick={e => e.stopPropagation()}
          >
            {content}
            <div
              className={classNames('rabbit-arrow', { 'is-small': arrow === 'small', 'is-large': arrow === 'large' })}
              ref={arrowRef}
            />
          </div>,
          document.body
        )
      }
    </>
  )
}
