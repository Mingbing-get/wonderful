import React, { useState, useRef, useEffect, useMemo } from 'react'
import classNames from 'classnames'

import compatible from '../compatible'
import { SliderProps } from '../types/slider'

import './index.scss'

let preRate = 0

export default function Slider({ min = 0, max = 100, step = 1, value, showLabel = true, className, style, onChange, ...extra }: SliderProps) {
  const [selectRate, setSelectRate] = useState(0)
  const [startX, setStartX] = useState(-1)

  const trick = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const curRate = valueToRate(value)
    if (selectRate === curRate) return
    setSelectRate(curRate)
  }, [value, min, max])

  const decimalCount = useMemo(() => {
    return `${step}`.split('.')[1]?.length || 0
  }, [step])

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    preRate = selectRate
    setStartX(e.clientX)
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (startX === -1) return
    changeRate(preRate + ((e.clientX - startX) / getTrickWidth()) * 100)
  }

  function handleMouseUp() {
    setStartX(-1)
  }

  function handleClickTrick(e: React.MouseEvent<HTMLDivElement>) {
    if (!trick.current) return

    const trickRect = compatible.getBoundingClientRect(trick.current)
    changeRate(((e.clientX - trickRect.left) / trickRect.width) * 100)
  }

  function changeRate(newRate: number) {
    let _value = newRate
    if (_value < 0) _value = 0
    if (_value > 100) _value = 100

    const newValue = rateToValue(_value)
    setSelectRate(valueToRate(newValue))
    onChange?.(newValue)
  }

  function getTrickWidth(): number {
    return trick.current?.scrollWidth || 1
  }

  function valueToRate(value?: number): number {
    if (value === undefined) return 0
    return ((value - min) / (max - min)) * 100
  }

  function rateToValue(rate: number): number {
    const exactValue = min + ((max - min) * rate) / 100
    return Math.floor(exactValue / step) * step
  }

  return (
    <div
      {...extra}
      className={classNames('rabbit-slider-wrapper', 'rabbit-component', className)}
      style={style}>
      {showLabel && <span className="slider-label">{min}</span>}
      <div
        className="slider-trick"
        ref={trick}
        onClick={handleClickTrick}>
        <div
          className="slider-select"
          style={{ width: `${selectRate}%` }}
        />
        <div
          className="slider-bar"
          style={{ left: `${selectRate}%` }}
          onMouseDown={handleMouseDown}
          onClick={(e) => e.stopPropagation()}
        />
        <div
          className={classNames('slider-mask', startX !== -1 && 'is-mouse-down')}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
      {showLabel && (
        <span className="slider-label">
          {rateToValue(selectRate).toFixed(decimalCount)}/{max}
        </span>
      )}
    </div>
  )
}
