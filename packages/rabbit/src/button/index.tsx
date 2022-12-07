import React from 'react'
import classNames from 'classnames'

import Loading from '../loading'

import './index.scss'

export type ButtonType = 'primary' | 'danger' | 'success' | 'warning'

type Props = {
  type?: ButtonType,
  loading?: boolean,
  block?: boolean,
  disabled?: boolean,
  ghost?: boolean,
  children: React.ReactNode,
  onClick?: () => void
}

function Button({
  type,
  loading,
  block,
  disabled,
  ghost,
  children,
  onClick
}: Props, ref?: React.ForwardedRef<HTMLDivElement>) {
  function handleClick() {
    if (disabled || loading) return
    onClick?.()
  }

  return (
    <div
      className={classNames(
        'rabbit-button-wrapper',
        type && `type-${type}`,
        block && 'is-block',
        disabled && 'is-disabled',
        loading && 'is-loading',
        ghost && 'is-ghost'
      )}
      onClick={handleClick}
      ref={ref}
    >
      <span className='button-content'>
        {children}
      </span>
      <span className='disabled-mask' />
      <span className='loading-mask'>
        <Loading />
      </span>
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, Props>(Button)
