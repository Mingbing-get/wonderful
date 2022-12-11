import React from 'react'
import classNames from 'classnames'
import RcInput, { InputProps } from 'rc-input'

import Icon from '../icon'

import './index.scss'

type Props = Omit<InputProps, 'prefixCls'>

function Input({
  className,
  style,
  allowClear,
  ...extra
}: Props, ref?: React.ForwardedRef<HTMLDivElement>){
  return (
    <div className={classNames('rabbit-input-wrapper', className)} style={style} ref={ref}>
      <RcInput
        prefixCls='input'
        allowClear={allowClear ? ({
          clearIcon: <Icon type='close' />
        }) : false}
        {...extra}
      />
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, Props>(Input)
