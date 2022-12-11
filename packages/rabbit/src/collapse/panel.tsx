import React, { useRef, useEffect, useState } from 'react'
import classNames from 'classnames'

import Icon from '../icon'

export type PanelProps = {
  header: React.ReactNode;
  panelKey: React.Key;
  children: React.ReactElement;
  isOpen?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onToggleOpen?: (key: React.Key) => void;
}

export default function Panel({
  header,
  panelKey,
  isOpen = false,
  children,
  className,
  style,
  onToggleOpen
}: PanelProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const preOpen = useRef(false)

  const [contentStyle, setContentStyle] = useState<React.CSSProperties>()
  
  useEffect(() => {
    if (!contentRef.current) return

    if (isOpen) {
      setContentStyle({
        height: contentRef.current.scrollHeight
      })
      delaySetContentStyle(200, {
        height: 'auto'
      })
    } else if (preOpen.current) {
      setContentStyle({
        height: contentRef.current.scrollHeight
      })
      delaySetContentStyle(60, {
        height: 0
      })
    } else {
      setContentStyle({
        height: 0
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
    }, delay);
  }

  return (
    <div className={classNames('rabbit-collapse-panel', isOpen && 'is-open', className)} style={style}>
      <div className='collapse-header' onClick={handleClick}>
        <div>{header}</div>
        <Icon type='arrowDown' className='icon-arrow-down' />
      </div>
      <div
        ref={contentRef}
        className='collapse-content'
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  )
}
