import React, { useRef, useEffect, useState, useMemo, useImperativeHandle, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { createPopper, Instance, VirtualElement } from '@popperjs/core'
import classNames from 'classnames'

import { InputRef } from '../types/input'
import { PopoverProps, PopoverRef } from '../types/popover'

import './index.scss'

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

function Popover(
  {
    children,
    content,
    trigger = 'click',
    placement = 'bottom',
    arrow = 'middle',
    visible,
    widthFollowTarget,
    delay = 500,
    hoverOpenDelay = 0,
    className,
    style,
    onVisibleChange,
  }: PopoverProps,
  ref?: React.ForwardedRef<PopoverRef | undefined>
) {
  const targetRef = useRef<HTMLElement | InputRef>(null)
  const perTargetRef = useRef(false)
  const counter = useRef(0)
  const hoverTimer = useRef<number>()
  const displayRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const popperInstance = useRef<Instance>()
  const virtualElement = useRef<VirtualElement>({
    getBoundingClientRect: generateGetBoundingClientRect(0, 0, 0, 0),
  } as VirtualElement)

  const [isHidden, setIsHidden] = useState(!visible)

  useEffect(() => {
    setIsHidden(!visible)
  }, [visible])

  useEffect(() => {
    onVisibleChange?.(!isHidden)
  }, [isHidden])

  useEffect(() => {
    setTimeout(() => {
      if (!displayRef.current || !arrowRef.current) return

      resetVirtualElement()

      popperInstance.current = createPopper(virtualElement.current, displayRef.current, {
        placement: placement,
        modifiers: [{ name: 'arrow', options: { element: arrowRef.current } }],
      })
    }, 0)
  }, [isHidden, arrowRef.current])

  useEffect(() => {
    function clickHandle(e: MouseEvent) {
      if (!['click', 'focus'].includes(trigger)) return

      let curNode: Node | null = e.target as Node
      while (curNode) {
        if (curNode === displayRef.current || curNode === targetRef.current) return
        curNode = curNode.parentNode
      }

      setIsHidden(true)
    }

    document.addEventListener('click', clickHandle, true)
    document.addEventListener('scroll', resetVirtualElement)

    return () => {
      popperInstance.current?.destroy()
      document.removeEventListener('click', clickHandle, true)
      document.removeEventListener('scroll', resetVirtualElement)
    }
  }, [])

  useEffect(() => {
    if (!getTargetElement() || perTargetRef.current) return
    perTargetRef.current = true

    function handleMouseenter() {
      hoverTimer.current = setTimeout(() => {
        counter.current++
        setIsHidden(false)
        setTimeout(() => {
          counter.current--
        }, delay)
      }, hoverOpenDelay)
    }

    function handleMouseLeave() {
      clearTimeout(hoverTimer.current)
      setTimeout(() => {
        if (counter.current === 0) setIsHidden(true)
      }, delay)
    }

    function setHidden() {
      setIsHidden(false)
    }

    function stopPropagation(e: MouseEvent) {
      e.stopPropagation()
      return false
    }

    if (trigger === 'click') {
      getTargetElement().addEventListener('click', toggleShow, true)
    }

    if (trigger === 'hover') {
      getTargetElement().addEventListener('mouseenter', handleMouseenter)
      getTargetElement().addEventListener('mouseleave', handleMouseLeave)
    }

    if (trigger === 'focus') {
      getTargetElement().addEventListener('focus', setHidden)
      getTargetElement().addEventListener('click', stopPropagation, true)
    }

    return () => {
      // getTargetElement()?.removeEventListener('click', toggleShow, true)
      // getTargetElement()?.removeEventListener('mouseenter', handleMouseenter)
      // getTargetElement()?.removeEventListener('mouseleave', handleMouseLeave)
      // getTargetElement()?.removeEventListener('focus', setHidden)
      // getTargetElement()?.removeEventListener('click', stopPropagation)
    }
  }, [targetRef.current])

  useEffect(() => {
    if (!displayRef.current || trigger !== 'hover') return

    function handleMouseenter() {
      counter.current++
      setIsHidden(false)
      setTimeout(() => {
        counter.current--
      }, delay)
    }

    function handleMouseleave() {
      setTimeout(() => {
        if (counter.current === 0) setIsHidden(true)
      }, delay)
    }

    displayRef.current.addEventListener('mouseenter', handleMouseenter)
    displayRef.current.addEventListener('mouseleave', handleMouseleave)

    return () => {
      // displayRef.current?.removeEventListener('mouseenter', handleMouseenter)
      // displayRef.current?.removeEventListener('mouseleave', handleMouseleave)
    }
  }, [displayRef.current])

  const getTargetElement = useCallback(() => {
    return (targetRef.current as InputRef)?.input || (targetRef.current as HTMLElement)
  }, [targetRef.current])

  const getTargetLocationAndSize = useCallback(() => {
    if (!getTargetElement()) return { top: 0, left: 0, width: 0, height: 0 }
    return getTargetElement().getBoundingClientRect()
  }, [getTargetElement])

  const resetVirtualElement = useCallback(() => {
    const { left, top, width, height } = getTargetLocationAndSize()
    virtualElement.current.getBoundingClientRect = generateGetBoundingClientRect(left, top, width, height) as any
  }, [getTargetLocationAndSize])

  useImperativeHandle(
    ref,
    () => {
      if (!popperInstance.current) return undefined

      return {
        ...popperInstance.current,
        resetVirtualElement,
      }
    },
    [popperInstance.current, resetVirtualElement]
  )

  function toggleShow(e: MouseEvent) {
    setIsHidden((isHidden) => !isHidden)
    e.stopPropagation()
    return false
  }

  const targetElement = useMemo(() => {
    return React.cloneElement(children, {
      ref: targetRef,
    })
  }, [children])

  return (
    <>
      {targetElement}
      {!isHidden &&
        ReactDOM.createPortal(
          <div
            className={classNames('rabbit-popper-wrapper', 'rabbit-component', arrow === 'none' && 'not-arrow', className)}
            style={{ ...style, minWidth: widthFollowTarget ? `${getTargetElement().getBoundingClientRect().width}px` : '' }}
            ref={displayRef}>
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

export default React.forwardRef<PopoverRef | undefined, PopoverProps>(Popover)
