import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import Icon from '../icon'
import Button, { ButtonType } from '../button'

import './index.scss'

export type ModalPlacement = 'center' | 'bottom' | 'top' | 'left' | 'right'

export type FooterButtonConfig = {
  text: string,
  type?: ButtonType,
  onClick?: () => void,
}

type Props = {
  header?: React.ReactNode,
  content: React.ReactNode,
  footer?: FooterButtonConfig[],
  visible?: boolean,
  width?: number | string,
  height?: number | string,
  placement?: ModalPlacement,
  style?: React.CSSProperties,
  className?: string,
  onVisibleChange?: (visible: boolean) => void,
  onClose?: () => void,
  getContainer?: () => HTMLElement,
}

const animationTime = 200

export default function Modal({
  header,
  content,
  footer,
  visible,
  width,
  height,
  placement = 'center',
  style,
  className,
  onClose,
  onVisibleChange,
  getContainer = () => document.body
}: Props) {
  const [_visible, setVisible] = useState(!!visible)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (_visible !== visible && visible !== undefined) {
      if (!visible) {
        setHidden(true)
        delaySetVisible(false)
      } else {
        setTimeout(() => {
          setHidden(false)
        }, 60);
        setVisible(true)
      }
    }
  }, [visible])

  useEffect(() => {
    if (_visible !== visible) {
      onVisibleChange?.(_visible)
    }
  }, [_visible])

  function handleClose() {
    setHidden(true)
    delaySetVisible(false)
    onClose?.()
  }

  function handleFooterButton(fn?: () => void) {
    setHidden(true)
    delaySetVisible(false)
    fn?.()
  }

  function delaySetVisible(visible: boolean) {
    setTimeout(() => {
      setVisible(visible)
    }, animationTime);
  }

  if (!_visible) return <></>

  const containerRect = getContainer().getBoundingClientRect()

  return ReactDOM.createPortal(
    <div
      className={classNames('rabbit-modal-wrapper', `placement-${placement}`)}
      style={{ transform: `translate(${-containerRect.left}px, ${-containerRect.top}px)` }}
    >
      <div
        className={classNames('modal-container', className)}
        style={{ width: containerRect.width, height: containerRect.height, left: containerRect.left, top: containerRect.top }}
      >
        <div
          className={classNames('modal-content', { 'is-hidden': hidden })}
          style={{ ...(style || {}) , width, height, '--animation-time': `${animationTime / 1000}s` } as any}
        >
          <div className='modal-header'>
            <div>
              {header}
            </div>
            <Icon
              type='close'
              style={{ fontSize: '1.5rem' }}
              onClick={handleClose}
            />
          </div>
          <div className='modal-body'>
            {content}
          </div>
          {
            footer && (
              <div className='modal-footer'>
                {
                  footer.map(({ type, text, onClick }, index) => (
                    <Button key={index} type={type} onClick={() => handleFooterButton(onClick)}>{text}</Button>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </div>,
    getContainer()
  )
}
