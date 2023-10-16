import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import compatible from '../compatible'
import Icon from '../icon'
import StepsItem from './item'
import { StepsProps, StepsStatus } from '../types/steps'
import './index.scss'

type LineType = {
  left: number
  top: number | string
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
  ...extra
}: StepsProps) {
  const stepsWrapperRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<LineType[]>([])

  useEffect(() => {
    if (!stepsWrapperRef.current) return

    const items = compatible.getElementsByClassName(stepsWrapperRef.current, 'rabbit-steps-item')
    const wrapperRect = compatible.getBoundingClientRect(stepsWrapperRef.current)
    const firstIcon = compatible.getBoundingClientRect(compatible.getElementsByClassName(items[0], 'steps-dot')[0])
    const lines: LineType[] = []
    if (type === 'inline') {
      ;[...items].forEach((item, index) => {
        if (index === items.length - 1) return

        const itemRect = compatible.getBoundingClientRect(compatible.getElementsByClassName(item, 'default-dot')[0])
        lines.push({
          left: itemRect.right - wrapperRect.left + 2,
          top: '0.2rem',
          width: compatible.getBoundingClientRect(compatible.getElementsByClassName(items[index + 1], 'default-dot')[0]).left - itemRect.right - 4,
        })
      })
    } else if (direction === 'horizontal') {
      ;[...items].forEach((item, index) => {
        if (index === items.length - 1) return

        const itemRect = compatible.getBoundingClientRect(item)
        lines.push({
          left: itemRect.right - wrapperRect.left + 4,
          top: firstIcon.height / 2,
          width: compatible.getBoundingClientRect(items[index + 1]).left - itemRect.right - 8,
        })
      })
    } else if (direction === 'vertical') {
      ;[...items].forEach((item, index) => {
        if (index === items.length - 1) return

        const itemRect = compatible.getBoundingClientRect(compatible.getElementsByClassName(item, 'steps-dot')[0])
        lines.push({
          left: firstIcon.width / 2,
          top: itemRect.bottom - wrapperRect.top + 4,
          width: compatible.getBoundingClientRect(items[index + 1]).top - itemRect.bottom - 8,
        })
      })
    }

    setLines(lines)
  }, [stepsWrapperRef.current, direction, type])

  const getStatus = useCallback(
    (index: number, itemStatus?: StepsStatus): StepsStatus | undefined => {
      if (current === undefined) return itemStatus

      if (index < current) return itemStatus || 'finish'
      if (index === current) return status
      return itemStatus || 'wait'
    },
    [current, status]
  )

  return (
    <div
      {...extra}
      ref={stepsWrapperRef}
      className={classNames('rabbit-steps-wrapper', 'rabbit-component', `direction-${type === 'inline' ? 'horizontal' : direction}`, className)}
      style={style}>
      {items.map((item, index) => (
        <StepsItem
          {...item}
          status={getStatus(index, item.status)}
          percent={index === current ? percent : undefined}
          key={index}
          index={index}
          type={type}
          onClick={onClick && (() => onClick?.(index))}
        />
      ))}
      {lines.map((line, index) => (
        <div
          key={index}
          className={classNames('steps-line', `type-${type}`)}
          style={line}>
          {type === 'navigation' && (
            <Icon
              style={{ fontSize: '1.4rem' }}
              type="arrowRight"
            />
          )}
        </div>
      ))}
    </div>
  )
}
