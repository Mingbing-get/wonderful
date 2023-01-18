import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import Popover from '../popover'
import Icon from '../icon'
import { isFunction } from '../utils'

import './index.scss'

export type RateCharacterFn = (index: number) => React.ReactNode

type Props = {
  allowClear?: boolean,
  allowHalf?: boolean,
  character?: React.ReactNode | RateCharacterFn,
  className?: string,
  style?: React.CSSProperties,
  count?: number,
  defaultValue?: number,
  value?: number
  disabled?: boolean,
  checkColor?: string,
  unCheckColor?: string,
  toolTips?: string[],
  onChange?: (value: number) => void,
  onHoverChange?: (value: number) => void
}

function Rate({
  allowClear,
  allowHalf,
  character = <Icon type='starFill' />,
  className,
  style,
  count = 5,
  defaultValue,
  value,
  disabled,
  checkColor = '#fadb14',
  unCheckColor = 'rgba(0, 0, 0, .06)',
  toolTips = [],
  onChange,
  onHoverChange
}: Props, ref?: React.ForwardedRef<HTMLDivElement>) {
  const [_value, setValue] = useState(-1)
  const [hoverValue, setHoverValue] = useState(-1)
  const valueRef = useRef(-1)

  useEffect(() => {
    if (defaultValue === undefined) return

    setValue(defaultValue)
    valueRef.current = defaultValue
  }, [])

  useEffect(() => {
    if (value === undefined || value === valueRef.current) return

    setValue(value)
    valueRef.current = value
  }, [value])

  function handleClickItem(index: number, half: boolean, e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    if (disabled) return

    let newValue = index
    if (half && allowHalf) {
      newValue += 0.5
    }

    if (allowClear && newValue === valueRef.current) {
      newValue = -1
    }

    setValue(newValue)
    valueRef.current = newValue
    onChange?.(newValue)
  }

  function handleMouseEnterItem(index: number, half: boolean, e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    if (disabled) return

    let newValue = index
    if (half && allowHalf) {
      newValue += 0.5
    }

    setHoverValue(newValue)
    onHoverChange?.(newValue)
  }

  function handleMouseLeaveItem(index: number, half: boolean, e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    if (disabled) return

    let newValue = index
    if (half && allowHalf) {
      newValue += 0.5
    }

    if (newValue !== hoverValue) return
    setHoverValue(-1)
    onHoverChange?.(-1)
  }

  return (
    <div
      ref={ref}
      className={classNames('rabbit-rate-wrapper', className)}
      style={{
        '--uncheck-color': unCheckColor,
        '--check-color': checkColor,
        ...style
      } as React.CSSProperties}
    >
      {
        new Array(count).fill(1).map((_, index) => {
          let isHalf = index === _value - 0.5
          let isChecked = !isHalf && index <= _value
          if (hoverValue !== -1) {
            isHalf = index === hoverValue - 0.5
            isChecked = !isHalf && index <= hoverValue
          }

          const curIcon = isFunction<RateCharacterFn>(character) ? character(index) : character

          if (!toolTips[index]) {
            return (
              <RenderRateRef
                key={index}
                index={index}
                isHalf={isHalf}
                isChecked={isChecked}
                curIcon={curIcon}
                onClickItem={handleClickItem}
                onMouseEnterItem={handleMouseEnterItem}
                onMouseLeaveItem={handleMouseLeaveItem}
              />
            )
          }
          
          return (
            <Popover
              content={<span>{toolTips[index]}</span>}
              trigger='hover'
              arrow='small'
              placement='top'
              key={index}
            >
              <RenderRateRef
                index={index}
                isHalf={isHalf}
                isChecked={isChecked}
                curIcon={curIcon}
                onClickItem={handleClickItem}
                onMouseEnterItem={handleMouseEnterItem}
                onMouseLeaveItem={handleMouseLeaveItem}
              />
            </Popover>
          )
        })
      }
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, Props>(Rate)

type RenderRateProps = {
  index: number,
  isHalf: boolean,
  isChecked: boolean,
  curIcon: React.ReactNode,
  onClickItem: (index: number, isHalf: boolean, e: React.MouseEvent<HTMLDivElement>) => void,
  onMouseEnterItem: (index: number, isHalf: boolean, e: React.MouseEvent<HTMLDivElement>) => void,
  onMouseLeaveItem: (index: number, isHalf: boolean, e: React.MouseEvent<HTMLDivElement>) => void,
}

function RenderRate({
    index,
    isChecked,
    isHalf,
    curIcon,
    onClickItem,
    onMouseEnterItem,
    onMouseLeaveItem
  }: RenderRateProps,
  ref?: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={classNames('rate-item', isHalf && 'is-half', isChecked && 'is-checked')}>
      <div
        className='rate-item-half'
        onClick={e => onClickItem(index, true, e)}
        onMouseEnter={e => onMouseEnterItem(index, true, e)}
        onMouseLeave={e => onMouseLeaveItem(index, true, e)}
      >{curIcon}</div>
      <div
        className='rate-item-all'
        onClick={e => onClickItem(index, false, e)}
        onMouseEnter={e => onMouseEnterItem(index, false, e)}
        onMouseLeave={e => onMouseLeaveItem(index, false, e)}
      >{curIcon}</div>
    </div>
  )
}

const RenderRateRef = React.forwardRef<HTMLDivElement, RenderRateProps>(RenderRate)
