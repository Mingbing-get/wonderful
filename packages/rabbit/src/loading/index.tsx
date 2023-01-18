import React from 'react'

import Icon from '../icon'

import './index.scss'

type Props = {
  size?: number,
  color?: string
}

function Loading({
  size = 1,
  color
}: Props, ref?: React.ForwardedRef<HTMLSpanElement>) {
  return (
    <span
      ref={ref}
      className='rabbit-loading-wrapper'
      style={{ width: `${size}rem`, height: `${size}rem`, color }}
    >
      <Icon type='loading' style={{ fontSize: `${size}rem` }} />
    </span>
  )
}

export default React.forwardRef<HTMLSpanElement, Props>(Loading)
