import React from 'react'
import classNames from 'classnames'
import RcInput, { InputProps, InputRef } from 'rc-input'

import Icon from '../icon'

import './index.scss'

export type Props = Omit<InputProps, 'prefixCls'>

function Input({
  className,
  style,
  allowClear,
  ...extra
}: Props, ref?: React.ForwardedRef<InputRef>){
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

export default React.forwardRef<InputRef, Props>(Input)
