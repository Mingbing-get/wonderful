import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import compatible from '../compatible'
import PopoverHandle from '../popoverHandle'

import { PopoverProps, PopoverRef } from '../types/popover'

function Popover(
  { children, trigger = 'click', visible, delay = 500, hoverOpenDelay = 0, preventControlVisible, onVisibleChange, ...extra }: PopoverProps,
  ref?: React.ForwardedRef<PopoverRef | undefined>
) {
  const [target, setTarget] = useState<HTMLElement>()

  const targetRef = useRef<HTMLElement>(null)
  const counter = useRef(0)
  const hoverTimer = useRef<number | NodeJS.Timeout>()
  const displayRef = useRef<any>(null)
  const isHover = useRef(false)

  const [isHidden, setIsHidden] = useState(!visible)

  useEffect(() => {
    setIsHidden(!visible)
  }, [visible])

  useEffect(() => {
    onVisibleChange?.(!isHidden)
  }, [isHidden])

  const domInDisplayOrTarget = useCallback((dom: Node) => {
    let curNode: Node | null = dom
    let flag = false

    while (curNode) {
      if (curNode === displayRef.current || curNode === targetRef.current) {
        flag = true
        break
      }
      curNode = curNode.parentNode
    }

    return flag
  }, [])

  useEffect(() => {
    if (preventControlVisible) return

    function clickHandle(e: MouseEvent) {
      if (!['click', 'focus'].includes(trigger)) return

      if (domInDisplayOrTarget(e.target as Node)) return

      setIsHidden(true)
    }

    function handleMouseMove(e: MouseEvent) {
      // 模拟mouse leave
      if (!isHover.current) return

      if (domInDisplayOrTarget(e.target as Node)) return

      isHover.current = false
      clearTimeout(hoverTimer.current)
      setTimeout(() => {
        if (counter.current === 0) setIsHidden(true)
      }, delay)
    }

    compatible.getBody().addEventListener('click', clickHandle)
    compatible.getBody().addEventListener('mousemove', handleMouseMove)

    return () => {
      compatible.getBody().removeEventListener('click', clickHandle)
      compatible.getBody().removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    setTarget(targetRef.current || undefined)
  }, [targetRef.current])

  const handleChangeWrapper = useCallback((dom: HTMLDivElement) => {
    displayRef.current = dom

    if (!dom || trigger !== 'hover' || preventControlVisible) return

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

    dom.addEventListener('mouseenter', handleMouseenter)
    dom.addEventListener('mouseleave', handleMouseleave)
  }, [])

  const toggleShow = useCallback((e: MouseEvent) => {
    setIsHidden((isHidden) => !isHidden)
    e.stopPropagation()
    return false
  }, [])

  const targetElement = useMemo(() => {
    const extraEvent: Record<string, any> = {}
    if (!preventControlVisible) {
      function handleMouseenter() {
        isHover.current = true
        hoverTimer.current = setTimeout(() => {
          counter.current++
          setIsHidden(false)
          setTimeout(() => {
            counter.current--
          }, delay)
        }, hoverOpenDelay)
      }

      if (trigger === 'click') {
        extraEvent['onClick'] = (e: MouseEvent) => {
          toggleShow(e)
          children.props?.onClick?.(e)
        }
      } else if (trigger === 'hover') {
        extraEvent['onMouseEnter'] = (e: MouseEvent) => {
          handleMouseenter()
          children.props?.onMouseEnter?.(e)
        }
      } else if (trigger === 'focus') {
        extraEvent['onFocus'] = (e: React.FocusEvent) => {
          setIsHidden(false)
          children.props?.onFocus?.(e)
        }
        extraEvent['onClick'] = (e: MouseEvent) => {
          e.stopPropagation()
          children.props?.onClick?.(e)
        }
      }
    }

    return React.cloneElement(children, {
      ref: targetRef,
      ...extraEvent,
    })
  }, [children])

  return (
    <>
      {targetElement}
      <PopoverHandle
        {...extra}
        ref={ref}
        onChangeWrapper={handleChangeWrapper}
        target={isHidden ? undefined : target}
      />
    </>
  )
}

export default React.forwardRef(Popover)
