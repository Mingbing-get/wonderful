import React, { useRef, useEffect, useState } from 'react'
import classNames from 'classnames'

import Icon from '../icon'

import { CollapsePanelProps } from '../types/collapse'

export default function Panel({ header, panelKey, isOpen = false, children, className, onToggleOpen, ...extra }: CollapsePanelProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const preOpen = useRef(false)

  const [contentStyle, setContentStyle] = useState<React.CSSProperties>()
  const [delayIsOpen, setDelayIsOpen] = useState<boolean>(isOpen)

  useEffect(() => {
    if (!contentRef.current) return

    if (isOpen) {
      setDelayIsOpen(true)
      setTimeout(() => {
        if (!contentRef.current) return
        setContentStyle({
          height: contentRef.current.scrollHeight,
        })
        delaySetContentStyle(200, {
          height: 'auto',
        })
      }, 0)
    } else if (preOpen.current) {
      setContentStyle({
        height: contentRef.current.scrollHeight,
      })
      delaySetContentStyle(60, {
        height: 0,
      })
      setTimeout(() => setDelayIsOpen(false), 260)
    } else {
      setContentStyle({
        height: 0,
      })
    }

    preOpen.current = isOpen
  }, [isOpen, contentRef.current])

  function handleClick() {
    onToggleOpen?.(panelKey)
  }

  function delaySetContentStyle(delay: number, style?: React.CSSProperties) {
    setTimeout(() => {
      setContentStyle(style)
    }, delay)
  }

  return (
    <div
      className={classNames('rabbit-collapse-panel', isOpen && 'is-open', className)}
      {...extra}>
      <div
        className="collapse-header"
        onClick={handleClick}>
        <div>{header}</div>
        <Icon
          type="arrowDown"
          className="icon-arrow-down"
        />
      </div>
      <div
        ref={contentRef}
        className="collapse-content"
        style={contentStyle}>
        {delayIsOpen && children}
      </div>
    </div>
  )
}
