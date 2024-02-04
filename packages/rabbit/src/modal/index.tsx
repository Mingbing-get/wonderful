import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import compatible from '../compatible'
import Icon from '../icon'
import Button from '../button'
import { ModalProps } from '../types/modal'
import zIndexManager from '../zIndexManager'

import './index.scss'
const animationTime = 200

interface ContainerRect {
  left: number | string
  top: number | string
  width: number | string
  height: number | string
  [x: string]: any
}

const bodyContainerRect: ContainerRect = { left: 0, top: 0, width: '100vw', height: '100vh' }

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
  preventAutoClose,
  onClose,
  onVisibleChange,
  getContainer = () => compatible.getBody(),
}: ModalProps) {
  const [_visible, setVisible] = useState(!!visible)
  const [hidden, setHidden] = useState(!visible)
  const [_zIndex, setZIndex] = useState(visible ? zIndexManager.next('normal') : 1)
  const [containerRect, setContainerRect] = useState<ContainerRect>(bodyContainerRect)

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
        setZIndex(zIndexManager.next('normal'))
      }
    }
  }, [visible])

  useEffect(() => {
    if (_visible !== visible) {
      onVisibleChange?.(_visible)
    }
  }, [_visible])

  useEffect(() => {
    if (getContainer() === compatible.getBody()) {
      setContainerRect(bodyContainerRect)
    } else {
      compatible.getBoundingClientRect(getContainer()).then((domRect) => {
        setContainerRect(domRect)
      })
    }
  }, [getContainer])

  const handleClose = useCallback(() => {
    if (!preventAutoClose) {
      setHidden(true)
      delaySetVisible(false)
    }
    onClose?.()
  }, [preventAutoClose, onClose])

  const handleFooterButton = useCallback((fn?: () => void) => {
    setHidden(true)
    delaySetVisible(false)
    fn?.()
  }, [])

  const delaySetVisible = useCallback((visible: boolean) => {
    setTimeout(() => {
      setVisible(visible)
    }, animationTime)
  }, [])

  if (!_visible) return <></>

  return ReactDOM.createPortal(
    <div
      className={classNames('rabbit-modal-wrapper', 'rabbit-component', `placement-${placement}`)}
      style={{ zIndex: zIndex === undefined ? _zIndex : zIndex }}
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
