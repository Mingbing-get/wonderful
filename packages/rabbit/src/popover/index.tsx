import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import PopoverHandle from '../popoverHandle'

import { PopoverProps, PopoverRef } from '../types/popover'

function Popover(
  { children, trigger = 'click', visible, delay = 500, hoverOpenDelay = 0, preventControlVisible, onVisibleChange, ...extra }: PopoverProps,
  ref?: React.ForwardedRef<PopoverRef | undefined>
) {
  const [target, setTarget] = useState<HTMLElement>()

  const targetRef = useRef<HTMLElement>(null)
  const perTargetRef = useRef(false)
  const counter = useRef(0)
  const hoverTimer = useRef<number | NodeJS.Timeout>()
  const displayRef = useRef<any>(null)

  const [isHidden, setIsHidden] = useState(!visible)

  useEffect(() => {
    setIsHidden(!visible)
  }, [visible])

  useEffect(() => {
    onVisibleChange?.(!isHidden)
  }, [isHidden])

  useEffect(() => {
    if (preventControlVisible) return

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

    return () => {
      document.removeEventListener('click', clickHandle, true)
    }
  }, [])

  useEffect(() => {
    if (!getTargetElement() || perTargetRef.current || preventControlVisible) return
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

  const getTargetElement = useCallback(() => {
    return targetRef.current as HTMLElement
  }, [targetRef.current])

  useEffect(() => {
    setTarget(getTargetElement())
  }, [targetRef.current, getTargetElement])

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
