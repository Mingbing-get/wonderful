import React from 'react'
import classNames from 'classnames'

import './index.scss'

type Props = {
  children: React.ReactNode,
  className?: string,
  style?: React.CSSProperties,
}

export default function InputGroup({
  children,
  className,
  style
}: Props) {
  return (
    <div className={classNames('rabbit-input-group-wrapper', className)} style={style}>
      {children}
    </div>
  )
}
