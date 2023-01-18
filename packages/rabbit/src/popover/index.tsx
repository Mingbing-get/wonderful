import React, { useRef, useEffect, useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { createPopper, Placement, Instance, VirtualElement } from '@popperjs/core'
import classNames from 'classnames'

import './index.scss'
export {
  Placement
}

type Props = {
  children: React.ReactElement,
  content: React.ReactNode,
  trigger?: 'click' | 'hover' | 'focus',
  arrow?: 'small' | 'large' | 'middle' | 'none',
  placement?: Placement,
  visible?: boolean,
  delay?: number,
  className?: string,
  style?: React.CSSProperties,
  onVisibleChange?: (visible: boolean) => void,
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
  style,
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
    setTimeout(() => {
      if (!displayRef.current || !arrowRef.current) return

      resetVirtualElement()

      popperInstance.current = createPopper(virtualElement.current, displayRef.current, {
        placement: placement,
        modifiers: [
          { name: 'arrow', options: { element: arrowRef.current } }
        ],
      })
    }, 0);
  }, [isHidden, arrowRef.current])

  useEffect(() => {
    document.addEventListener('click', () => {
      if (trigger !== 'click') return
      setIsHidden(true)
    })
    document.addEventListener('scroll', () => {
      requestAnimationFrame(resetVirtualElement)
    })

    return () => {
      popperInstance.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (!targetRef.current || perTargetRef.current) return
    perTargetRef.current = true

    trigger === 'click' && targetRef.current.addEventListener('click', toggleShow)

    trigger === 'hover' && (
      targetRef.current.addEventListener('mouseenter', () => {
        counter.current++
        setIsHidden(false)
        setTimeout(() => {
          counter.current--
        }, delay)
      }),
      targetRef.current.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (counter.current === 0) setIsHidden(true)
        }, delay)
      })
    )

    trigger === 'focus' && (
      targetRef.current.addEventListener('focus', () => setIsHidden(false)),
      targetRef.current.addEventListener('blur', () => setIsHidden(true))
    )
  }, [targetRef.current])

  useEffect(() => {
    if (!displayRef.current) return

    trigger === 'hover' && (
      displayRef.current.addEventListener('mouseenter', () => {
        counter.current++
        setIsHidden(false)
        setTimeout(() => {
          counter.current--
        }, delay)
      }),
      displayRef.current.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (counter.current === 0) setIsHidden(true)
        }, delay)
      })
    )
  }, [displayRef.current])

  useEffect(() => {
    setIsHidden(!visible)
  }, [visible])

  useEffect(() => {
    onVisibleChange?.(!isHidden)
  }, [isHidden])

  function resetVirtualElement() {
    const { left, top, width, height } = getTargetLocationAndSize()
    virtualElement.current.getBoundingClientRect = generateGetBoundingClientRect(left, top, width, height) as any
  }

  function getTargetLocationAndSize() {
    if (!targetRef.current) return { top: 0, left: 0, width: 0, height: 0 }
    return targetRef.current.getBoundingClientRect()
  }

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

  function toggleShow(e: MouseEvent) {
    setIsHidden((isHidden) => !isHidden)
    e.stopPropagation()
    return false
  }

  const targetElement = useMemo(() => {
    return React.cloneElement(children, {
      ref: targetRef
    })
  }, [children])

  return (
    <>
      { targetElement }
      {
        !isHidden && ReactDOM.createPortal(
          <div
            className={classNames('rabbit-popper-wrapper', arrow === 'none' && 'not-arrow', className)}
            style={style}
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
