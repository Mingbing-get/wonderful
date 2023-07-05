import React, { useMemo } from 'react'
import classNames from 'classnames'

import { BadgeProps } from '../types/badge'

import './index.scss'

function Badge(
  { children, className, color = 'var(--rabbit-error-color)', count, dot, offsetRight = 0, offsetTop = 0, overflowCount = 99, showZero, ...extra }: BadgeProps,
  ref?: React.ForwardedRef<HTMLDivElement>
) {
  const { showCount, showNode } = useMemo(() => {
    if (Object.prototype.toString.call(count) === '[object Number]') {
      const _count = count as number
      return { showCount: _count > overflowCount ? `${overflowCount}+` : `${_count}` }
    }

    return { showNode: count }
  }, [count, overflowCount])

  return (
    <div
      ref={ref}
      className={classNames('rabbit-component rabbit-badge-wrapper', className)}
      {...extra}>
      {children}
      {(showZero || count !== 0) && (
        <span
          className="badge-float"
          style={{ right: -offsetRight, top: -offsetTop }}>
          {dot ? (
            <span
              className="badge-dot"
              style={{ backgroundColor: color }}></span>
          ) : (
            <>
              {showCount && (
                <span
                  className="badge-count"
                  style={{ backgroundColor: color }}>
                  {showCount}
                </span>
              )}
              {showNode && (
                <span
                  className="badge-node"
                  style={{ color: color }}>
                  {showNode}
                </span>
              )}
            </>
          )}
        </span>
      )}
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, BadgeProps>(Badge)
