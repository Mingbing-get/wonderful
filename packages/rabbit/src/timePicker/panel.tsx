import React, { useMemo, useCallback, useEffect, useRef } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classNames from 'classnames'

import { TimePickerProps, TimePickerType } from '../types/timePicker'

import './panel.scss'

type OptionType = {
  num: number,
  dayjs: Dayjs,
  disabled?: boolean
}
export type Props = Pick<TimePickerProps, 'disabledTime' | 'value' | 'format' | 'customFormat' | 'hourStep' | 'minuteStep' | 'secondStep'> & {
  onChange?: (time: Dayjs, timeString: string) => void,
}

export default function TimePanel({
  value,
  format = 'HH:mm:ss',
  customFormat,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  disabledTime,
  onChange
}: Props) {

  const getOption = useCallback((timeType: TimePickerType, step: number) => {
    const total = {
      'hour': 24,
      'minute': 60,
      'second': 60
    }[timeType]

    return new Array(Math.floor(total / step)).fill(1).map((_, index) => ({
      num: index * step,
      disabled: disabledTime?.(index * step, timeType),
      dayjs: (value || dayjs().hour(0).minute(0).second(0)).set(timeType, index * step)
    }))
  }, [disabledTime, value])

  const handleClick = useCallback((option: OptionType) => {
    if (option.disabled) return
    if (option.dayjs.hour() === value?.hour() &&
      option.dayjs.minute() === value?.minute() &&
      option.dayjs.second() === value?.second()) return
    
    onChange?.(option.dayjs, customFormat ? customFormat.format(option.dayjs.clone()) : option.dayjs.format(format))
  }, [format, onChange, value, customFormat])
  
  const hours: OptionType[] = useMemo(() => {
    return getOption('hour', hourStep)
  }, [getOption, hourStep])

  const minutes: OptionType[] = useMemo(() => {
    return getOption('minute', minuteStep)
  }, [getOption, minuteStep])

  const seconds: OptionType[] = useMemo(() => {
    return getOption('second', secondStep)
  }, [getOption, secondStep])

  const showItem = useMemo(() => {
    return {
      hour: format.includes('HH'),
      minute: format.includes('mm'),
      second: format.includes('ss')
    }
  }, [format])

  return (
    <div className='rabbit-time-panel'>
      <ItemWrapperRender
        options={hours}
        visible={showItem.hour}
        value={value?.hour()}
        onClick={handleClick}
      />
      <ItemWrapperRender
        options={minutes}
        visible={showItem.minute}
        value={value?.minute()}
        onClick={handleClick}
      />
      <ItemWrapperRender
        options={seconds}
        visible={showItem.second}
        value={value?.second()}
        onClick={handleClick}
      />
    </div>
  )
}

function fixedTo(num: number, count: number) {
  return `${new Array(count).fill(0).join('') }${num}`.substr(-count)
}

type ItemWrapperProps = {
  options: OptionType[],
  value?: number,
  visible: boolean,
  onClick: (option: OptionType) => void,
}

function ItemWrapperRender({
  options,
  value,
  visible,
  onClick,
}: ItemWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (!value || !wrapperRef.current) return

      const selectedItem = wrapperRef.current.getElementsByClassName('is-selected')[0]
      if (!selectedItem) return

      const itemWrapperRect = wrapperRef.current.getBoundingClientRect()
      const topDiff = selectedItem.getBoundingClientRect().top - itemWrapperRect.top
      wrapperRef.current.scrollTop = topDiff - itemWrapperRect.height / 2 + wrapperRef.current.scrollTop
    })
  }, [value])

  if (!visible) return <></>

  return (
    <div className='time-item-wrapper' ref={wrapperRef}>
      {
        options.map(option => (
          <span
            onClick={() => onClick(option)}
            key={option.num}
            className={classNames('time-item', option.disabled && 'is-disabled', value === option.num && 'is-selected')}
          >{fixedTo(option.num, 2)}</span>
        ))
      }
    </div>
  )
}
