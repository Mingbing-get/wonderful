import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import Loading from '../loading'
import { TimeLineProps, TimelineItemType } from '../types/timeLine'
import './index.scss'

export default function Timeline({
  className,
  style,
  items,
  mode = 'right',
  pending
}: TimeLineProps) {
  const pendItem = useMemo(() => {
    if (pending === true) {
      return {
        dot: <Loading />,
        content: 'loading...'
      } as TimelineItemType
    }

    return pending
  }, [pending])

  const _items = useMemo(() => {
    if (!pendItem) return items

    return [...items, pendItem]
  }, [items, pendItem])

  const displayLocation = useMemo(() => {
    if (mode === 'alternate') return 'both'

    const hasLabel = items.some(item => item.label)

    if (hasLabel) return 'both'

    return mode
  }, [items, mode])

  const getContent = useCallback((item: TimelineItemType, index: number, isFirst: boolean) => {
    if (displayLocation === 'left') {
      if (isFirst) return <div>{item.content}</div>
      return
    }
    if (displayLocation === 'right') {
      if (!isFirst) return <div>{item.content}</div>
      return
    }

    if (mode === 'right') {
      if (isFirst) return <div>{item.label}</div>
      if (!isFirst) return <div>{item.content}</div>
    }
    
    if (mode === 'left') {
      if (isFirst) return <div>{item.content}</div>
      if (!isFirst) return <div>{item.label}</div>
    }

    if (index % 2 === 0) {
      if (isFirst) return <div>{item.label}</div>
      if (!isFirst) return <div>{item.content}</div>
    } else {
      if (isFirst) return <div>{item.content}</div>
      if (!isFirst) return <div>{item.label}</div>
    }
  }, [displayLocation, mode])
  
  return (
    <div className={classNames('rabbit-timeline-wrapper', className)} style={style}>
      {
        _items.map((item, index) => (
          <div className='timeline-item' key={index}>
            {getContent(item, index, true)}
            {
              <div className='dot-line'>
                <span className='timeline-dot-wrapper'>
                  {item.dot || <span className='timeline-dot' style={{ backgroundColor: item.color || 'var(--rabbit-primary-color)' }} />}
                </span>
                <div className='timeline-line' />
              </div>
            }
            {getContent(item, index, false)}
          </div>
        ))
      }
    </div>
  )
}
