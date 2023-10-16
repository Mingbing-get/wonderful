import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import compatible from '../compatible'
import Icon from '../icon'
import Button from '../button'
import { ModalProps } from '../types/modal'

import './index.scss'
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
  zIndex,
  preventMouseOver,
  onClose,
  onVisibleChange,
  getContainer = () => compatible.getBody(),
}: ModalProps) {
  const [_visible, setVisible] = useState(!!visible)
  const [hidden, setHidden] = useState(!visible)

  useEffect(() => {
    if (_visible !== visible && visible !== undefined) {
      if (!visible) {
        setHidden(true)
        delaySetVisible(false)
      } else {
        setTimeout(() => {
          setHidden(false)
        }, 60)
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
    }, animationTime)
  }

  if (!_visible) return <></>

  const containerRect =
    getContainer() === compatible.getBody()
      ? {
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
        }
      : compatible.getBoundingClientRect(getContainer())

  return ReactDOM.createPortal(
    <div
      className={classNames('rabbit-modal-wrapper', 'rabbit-component', `placement-${placement}`)}
      style={{ zIndex }}
      onMouseOverCapture={(e) => preventMouseOver && e.preventDefault()}>
      <div
        className={classNames('modal-container', className)}
        style={{ width: containerRect.width, height: containerRect.height, left: containerRect.left, top: containerRect.top }}>
        <div
          className={classNames('modal-content', { 'is-hidden': hidden })}
          style={{ ...(style || {}), width, height, '--animation-time': `${animationTime / 1000}s` } as any}>
          {header && (
            <div className="modal-header">
              <div>{header}</div>
              <Icon
                type="close"
                style={{ fontSize: '1.5rem' }}
                onClick={handleClose}
              />
            </div>
          )}
          <div className="modal-body">{content}</div>
          {footer && (
            <div className="modal-footer">
              {footer.map(({ type, text, onClick }, index) => (
                <Button
                  key={index}
                  type={type}
                  onClick={() => handleFooterButton(onClick)}>
                  {text}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    getContainer()
  )
}
