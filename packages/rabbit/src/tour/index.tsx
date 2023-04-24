import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'

import Icon from '../icon'
import Modal from '../modal'
import Popover from '../popover'
import Button from '../button'
import { TourProps } from '../types/tour'
import { ButtonProps } from '../types/button'

import './index.scss'

const padding = 4

export default function Tour({
  steps,
  open = false,
  arrow,
  placement,
  current = 0,
  finishButtonProps,
  tip = 'dot',
  onClose,
  onFinish,
  onChange
}: TourProps) {
  const [_open, setOpen] = useState(open)
  const [_current, setCurrent] = useState(current)
  const [showPopover, setShowPopover] = useState(true)

  useEffect(() => {
    setOpen(open)
  }, [open])

  useEffect(() => {
    setCurrent(current)
  }, [current])

  useEffect(() => {
    setShowPopover(false)
    setTimeout(() => {
      setShowPopover(true)
    }, 0)
  }, [_current])

  const itemLocation = useMemo(() => {
    const currentStep = steps[_current]

    const targetElement = currentStep.target()
    if (!targetElement) return

    const targetReact = targetElement.getBoundingClientRect()
    return {
      width: targetReact.width + 2 * padding,
      height: targetReact.height + 2 * padding,
      left: targetReact.left - padding,
      top: targetReact.top - padding
    }
  }, [_current, steps])

  const handleChange = useCallback((next: boolean) => {
    let newCurrent = 0
    setCurrent(oldCurrent => {
      newCurrent = next ? oldCurrent + 1 : oldCurrent - 1
      onChange?.(newCurrent)
      return newCurrent
    })
  }, [onChange])

  const handleClose = useCallback(() => {
    setOpen(false)
    onClose?.(_current)
    steps[_current].onClose?.()
  }, [_current, steps])

  const _finishButtonProps: ButtonProps = useMemo(() => ({
    type: 'primary',
    children: '结束导航',
    ...finishButtonProps,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
      onFinish?.()
      setCurrent(0)
      setOpen(false)
      finishButtonProps?.onClick?.(e)
    }
  }), [finishButtonProps])

  const nextButtonProps: ButtonProps = useMemo(() => ({
    type: 'primary',
    children: '下一步',
    ...steps[_current].nextButtonProps,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
      handleChange(true)
      steps[_current].nextButtonProps?.onClick?.(e)
    }
  }), [_current, steps, handleChange])

  const prevButtonProps: ButtonProps = useMemo(() => ({
    children: '上一步',
    ...steps[_current].prevButtonProps,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
      handleChange(false)
      steps[_current].prevButtonProps?.onClick?.(e)
    }
  }), [_current, steps, handleChange])

  function renderContent() {
    return (
      <div className='rabbit-tour-popover'>
        <div className='rabbit-tour-header'>
          <div>
            {steps[_current].title}
          </div>
          <Icon type='close' onClick={handleClose} />
        </div>
        <div className='rabbit-tour-content'>
          {steps[_current].content}
        </div>
        <div className='rabbit-tour-footer'>
          {
            tip === 'dot' && (
              <ul className='tour-dots'>
                {
                  steps.map((_, index) => (
                    <li key={index} className={classNames(index === _current && 'is-active')} />
                  ))
                }
              </ul>
            )
          }
          {
            tip === 'simple' && (
              <div className='tour-simple'>
                <span>{_current + 1}</span>
                <span>/</span>
                <span>{steps.length}</span>
              </div>
            )
          }
          {
            tip === 'none' && <div></div>
          }
          <div className='tour-btns'>
            {_current !== 0 && <Button {...prevButtonProps} />}
            {_current !== steps.length - 1 && <Button {...nextButtonProps} />}
            {_current === steps.length - 1 && <Button {..._finishButtonProps} />}
          </div>
        </div>
      </div>
    )
  }

  if (!_open || steps.length === 0) return <></>

  if (!itemLocation) {
    return (
      <Modal
        visible={true}
        content={renderContent()}
      />
    )
  }
  
  return createPortal(
    <div className='rabbit-tour-wrapper'>
      <div className='rabbit-tour-mask'>
        <div style={{ gridArea: 'a', height: itemLocation.top }} />
        <div style={{ gridArea: 'b1', height: itemLocation.height, width: itemLocation.left }} />
        <div style={{ gridArea: 'b2', height: 0, width: itemLocation.width }} />
        <div style={{ gridArea: 'b3', height: itemLocation.height }} />
        <div style={{ gridArea: 'c' }} />
      </div>
      <Popover
        visible={showPopover}
        arrow={steps[_current].arrow || arrow}
        placement={steps[_current].placement || placement}
        content={renderContent()}
      >
        <div
          className='tour-target'
          style={{
            width: itemLocation.width,
            height: itemLocation.height,
            left: itemLocation.left,
            top: itemLocation.top
          }}
        />
      </Popover>
    </div>, document.body
  )
}
