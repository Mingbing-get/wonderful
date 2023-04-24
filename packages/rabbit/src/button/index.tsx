import React from 'react'
import classNames from 'classnames'

import Loading from '../loading'
import { ButtonProps } from '../types/button'

import './index.scss'

function Button({
  type,
  loading,
  block,
  disabled,
  ghost,
  children,
  style,
  className,
  onClick
}: ButtonProps, ref?: React.ForwardedRef<HTMLDivElement>) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled || loading) return
    onClick?.(e)
  }

  return (
    <div
      className={classNames(
        'rabbit-button-wrapper',
        type && `type-${type}`,
        block && 'is-block',
        disabled && 'is-disabled',
        loading && 'is-loading',
        ghost && 'is-ghost',
        className
      )}
      style={style}
      onClick={handleClick}
      ref={ref}
    >
      <span className='button-content'>
        {children}
      </span>
      <span className='loading-mask'>
        <Loading />
      </span>
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, ButtonProps>(Button)
