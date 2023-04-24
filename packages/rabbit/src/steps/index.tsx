import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import Icon from '../icon'
import StepsItem from './item'
import { StepsProps, StepsStatus } from '../types/steps'
import './index.scss'

type LineType = {
  left: number,
  top: number | string,
  width: number
}

export default function Steps({
  className,
  style,
  items,
  current,
  direction = 'horizontal',
  percent,
  status = 'process',
  type = 'default',
  onClick,
}: StepsProps) {
  const stepsWrapperRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<LineType[]>([])

  useEffect(() => {
    if (!stepsWrapperRef.current) return

    const items = stepsWrapperRef.current.getElementsByClassName('rabbit-steps-item')
    const wrapperRect = stepsWrapperRef.current.getBoundingClientRect()
    const firstIcon = items[0].getElementsByClassName('steps-dot')[0].getBoundingClientRect()
    const lines: LineType[] = []
    if (type === 'inline') {
      [...items].forEach((item, index) => {
        if (index === items.length - 1) return

        const itemRect = item.getElementsByClassName('default-dot')[0].getBoundingClientRect()
        lines.push({
          left: itemRect.right - wrapperRect.left + 2,
          top: '0.2rem',
          width: items[index + 1].getElementsByClassName('default-dot')[0].getBoundingClientRect().left - itemRect.right - 4
        })
      })
    } else if (direction === 'horizontal') {
      [...items].forEach((item, index) => {
        if (index === items.length - 1) return

        const itemRect = item.getBoundingClientRect()
        lines.push({
          left: itemRect.right - wrapperRect.left + 4,
          top: firstIcon.height / 2,
          width: items[index + 1].getBoundingClientRect().left - itemRect.right - 8
        })
      })
    } else if (direction === 'vertical') {
      [...items].forEach((item, index) => {
        if (index === items.length - 1) return

        const itemRect = item.getElementsByClassName('steps-dot')[0].getBoundingClientRect()
        lines.push({
          left: firstIcon.width / 2,
          top: itemRect.bottom - wrapperRect.top + 4,
          width: items[index + 1].getBoundingClientRect().top - itemRect.bottom - 8
        })
      })
    }

    setLines(lines)
  }, [stepsWrapperRef.current, direction, type])

  const getStatus = useCallback((index: number, itemStatus?: StepsStatus): StepsStatus | undefined => {
    if (current === undefined) return itemStatus

    if (index < current) return itemStatus || 'finish'
    if (index === current) return status
    return itemStatus || 'wait'
  }, [current, status])

  return (
    <div
      ref={stepsWrapperRef}
      className={classNames('rabbit-steps-wrapper', `direction-${type === 'inline' ? 'horizontal' : direction}`, className)}
      style={style}
    >
      {
        items.map((item, index) => (
          <StepsItem
            {...item}
            status={getStatus(index, item.status)}
            percent={index === current ? percent : undefined}
            key={index}
            index={index}
            type={type}
            onClick={onClick && (() => onClick?.(index))}
          />
        ))
      }
      {
        lines.map((line, index) => (
          <div key={index} className={classNames('steps-line', `type-${type}`)} style={line}>
            {
              type === 'navigation' && <Icon style={{ fontSize: '1.4rem' }} type='arrowRight' />
            }
          </div>
        ))
      }
    </div>
  )
}
