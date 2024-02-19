import React, { useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames'

import { BoundaryContainerProps } from '../types/boundary'
import { useBoundaryContainer } from './context'
import useChangeCallback from './useChangeCallback'

export default function Container({ className, style, span, name, minSpan, children, _order, onChangeSpan, ...extra }: BoundaryContainerProps) {
  const { direction, span: factSpan } = useBoundaryContainer(name, {
    span: span || 0,
    order: _order || 0,
    minSpan,
  })

  const boundaryStyle = useMemo(() => {
    if (direction === 'row') {
      return { width: `${factSpan}%` }
    }

    return { height: `${factSpan}%` }
  }, [factSpan, direction])

  useChangeCallback({ fn: onChangeSpan, params: [factSpan] })

  return (
    <div
      className={classNames('rabbit-boundary-container', className)}
      style={{ ...style, ...boundaryStyle }}
      {...extra}>
      {children}
    </div>
  )
}
