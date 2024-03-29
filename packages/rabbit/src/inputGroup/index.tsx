import React from 'react'
import classNames from 'classnames'

import { InputGroupProps } from '../types/inputGroup'
import './index.scss'

export default function InputGroup({ children, className, ...extra }: InputGroupProps) {
  return (
    <div
      className={classNames('rabbit-input-group-wrapper', 'rabbit-component', className)}
      {...extra}>
      {children}
    </div>
  )
}
