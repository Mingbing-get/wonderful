import React, { useCallback } from 'react'
import classNames from 'classnames'

import Loading from '../loading'
import { ButtonProps } from '../types/button'

import './index.scss'

function Button(
  { type = 'default', loading, block, disabled, ghost, round, children, className, onClick, ...extra }: ButtonProps,
  ref?: React.ForwardedRef<HTMLButtonElement>
) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return

      onClick?.(e)
    },
    [disabled, loading, onClick]
  )

  return (
    <button
      className={classNames(
        'rabbit-button-wrapper',
        'rabbit-component',
        type && `type-${type}`,
        block && 'is-block',
        disabled && 'is-disabled',
        loading && 'is-loading',
        ghost && 'is-ghost',
        round && 'is-round',
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      ref={ref}
      {...extra}>
      <span className="button-content">{children}</span>
      <span className="loading-mask">
        <Loading />
      </span>
    </button>
  )
}

export default React.forwardRef<HTMLButtonElement, ButtonProps>(Button)
