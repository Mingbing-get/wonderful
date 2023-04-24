import React from 'react'
import classNames from 'classnames'
import RcInput from 'rc-input'

import Icon from '../icon'
import { InputProps, InputRef } from '../types/input'

import './index.scss'

function Input({
  className,
  style,
  allowClear,
  ...extra
}: InputProps, ref?: React.ForwardedRef<InputRef>){
  return (
    <div className={classNames('rabbit-input-wrapper', extra.disabled && 'is-disabled', className)} style={style}>
      <RcInput
        ref={ref}
        prefixCls='input'
        allowClear={allowClear === true ? ({
          clearIcon: <Icon type='close' />
        }) : allowClear}
        {...extra}
      />
    </div>
  )
}

export default React.forwardRef<InputRef, InputProps>(Input)
