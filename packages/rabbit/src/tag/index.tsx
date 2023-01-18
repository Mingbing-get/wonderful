import React, { useMemo, useState } from 'react'
import classNames from 'classnames'

import Icon from '../icon'

import './index.scss'

const presetColorMap = {
  success: true,
  primary: true,
  error: true,
  default: true,
  warning: true,
}
type ColorType = keyof (typeof presetColorMap)

type Props = {
  className?: string,
  style?: React.CSSProperties,
  closable?: boolean,
  closeIcon?: React.ReactNode,
  color?: string | ColorType,
  icon?: React.ReactNode,
  children?: React.ReactNode,
  onClose?: (e: React.MouseEvent) => void,
  onCloseCapture?: (e: React.MouseEvent) => void,
}

function Tag({
  className,
  style,
  closable,
  closeIcon,
  color = 'default',
  icon,
  children,
  onClose,
  onCloseCapture,
}: Props, ref?: React.ForwardedRef<HTMLDivElement>) {
  const [isClose, setClose] = useState(false)

  const { presetColor, _color } = useMemo(() => {
    if (Object.keys(presetColorMap).includes(color)) return { presetColor: color }

    return { _color: color }
  }, [color])

  function handleClose(e: React.MouseEvent<HTMLSpanElement>) {
    setClose(true)
    onClose?.(e)
  }

  function handleCloseCapture(e: React.MouseEvent<HTMLSpanElement>) {
    setClose(true)
    onCloseCapture?.(e)
  }

  if (isClose) return <></>

  return (
    <span
      className={classNames('rabbit-tag-wrapper', presetColor && `tag-${presetColor}`, className)}
      style={{ backgroundColor: _color, ...style }}
      ref={ref}
    >
      {
        icon && (
          <span className='tag-icon'>{icon}</span>
        )
      }
      {children}
      {
        closable && (
          <span className='tag-close' onClickCapture={handleCloseCapture} onClick={handleClose}>
            {closeIcon || (
              <Icon type='close' className='tag-close-icon' />
            )}
          </span>
        )
      }
    </span>
  )
}

export default React.forwardRef<HTMLDivElement, Props>(Tag)
