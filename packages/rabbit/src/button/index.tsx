import React from 'react'
import classNames from 'classnames'

import Loading from '../loading'

import './index.scss'

export type ButtonType = 'primary' | 'danger' | 'success' | 'warning'

export type Props = {
  type?: ButtonType,
  loading?: boolean,
  block?: boolean,
  disabled?: boolean,
  ghost?: boolean,
  children: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

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
}: Props, ref?: React.ForwardedRef<HTMLDivElement>) {
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

export default React.forwardRef<HTMLDivElement, Props>(Button)
