import React from 'react'

import Icon from '../icon'
import { LoadingProps } from '../types/loading'

import './index.scss'

function Loading({ size = 1, color, ...extra }: LoadingProps, ref?: React.ForwardedRef<HTMLSpanElement>) {
  return (
    <span
      {...extra}
      ref={ref}
      className="rabbit-loading-wrapper rabbit-component"
      style={{ width: `${size}rem`, height: `${size}rem`, color }}>
      <Icon
        type="loading"
        style={{ fontSize: `${size}rem` }}
      />
    </span>
  )
}

export default React.forwardRef<HTMLSpanElement, LoadingProps>(Loading)
