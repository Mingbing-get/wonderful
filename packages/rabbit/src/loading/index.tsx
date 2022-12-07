import React from 'react'

import Icon from '../icon'

import './index.scss'

type Props = {
  size?: number,
  color?: string
}

export default function Loading({
  size = 1,
  color
}: Props) {
  return (
    <span
      className='rabbit-loading-wrapper'
      style={{ width: `${size}rem`, height: `${size}rem`, color }}
    >
      <Icon type='loading' style={{ fontSize: `${size}rem` }} />
    </span>
  )
}
