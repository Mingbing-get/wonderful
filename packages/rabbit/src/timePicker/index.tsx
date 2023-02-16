import React, { useState, useCallback, useEffect } from 'react'
import classNames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'

import Popover, { Placement } from '../popover'
import Input from '../input'
import Icon from '../icon'

import TimePanel from './panel'
import './index.scss'

export type TimeFormatType = 'HH:mm:ss' | 'HH:mm' | 'mm:ss' | 'HH' | 'mm' | 'ss'
export type TimeType = 'hour' | 'minute' | 'second'

export type Props = {
  className?: string,
  style?: React.CSSProperties,
  popupClassName?: string,
  popupStyle?: React.CSSProperties,
  placement?: Placement,
  defaultValue?: Dayjs,
  value?: Dayjs,
  allowClear?: boolean | { clearIcon?: React.ReactNode },
  disabled?: boolean,
  format?: TimeFormatType,
  customFormat?: {
    format: (dayjs: Dayjs) => string,
    validate: (timeStr: string) => Dayjs | undefined,
  },
  hourStep?: number,
  minuteStep?: number,
  secondStep?: number,
  inputReadOnly?: boolean,
  placeholder?: string,
  showNow?: boolean,
  suffixIcon?: React.ReactNode,
  disabledTime?: (timeNumber: number, timeType: TimeType) => boolean,
  renderExtraFooter?: () => React.ReactNode,
  onChange?: (time?: Dayjs, timeString?: string) => void,
  onOpenChange?: (open: boolean) => void,
}

export default function TimePicker({
  className,
  style,
  popupClassName,
  popupStyle,
  placement = 'bottom-start',
  defaultValue,
  value,
  allowClear = true,
  disabled,
  format = 'HH:mm:ss',
  customFormat,
  hourStep,
  minuteStep,
  secondStep,
  inputReadOnly,
  placeholder,
  showNow = true,
  suffixIcon = <Icon type='clock' />,
  disabledTime,
  renderExtraFooter,
  onChange,
  onOpenChange
}: Props) {
  const [visible, setVisible] = useState(false)
  const [_value, setValue] = useState(defaultValue || value)
  const [inputValue, setInputValue] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!_value) {
      setInputValue('')
      return
    }

    setInputValue(customFormat ? customFormat.format(_value.clone()) : _value.format(format))
  }, [_value, visible, format, customFormat, count])

  const handleVisibleChange = useCallback((visible: boolean) => {
    setVisible(oldValue => {
      if (oldValue === visible) return oldValue
      onOpenChange?.(visible)
      return visible
    })
  }, [onOpenChange])

  const handleChange = useCallback((time: Dayjs, timeString: string) => {
    setValue(time)
    onChange?.(time, timeString)
  }, [onChange])

  const handleClickNow = useCallback(() => {
    const now = dayjs()
    setValue(now)
    onChange?.(now, customFormat ? customFormat.format(now.clone()) : now.format(format))
    setVisible(false)
  }, [format, customFormat])

  const handleBlur = useCallback((text: string) => {
    setCount(old => old + 1)
    if (customFormat) {
      const newDate = customFormat.validate(text)
      if (newDate) {
        setValue(newDate)
        onChange?.(newDate, customFormat.format(newDate.clone()))
      }
      return
    }

    const splitFormat = format.split(':')
    const splitText = text.split(':')
    if (splitText.length !== splitFormat.length) return

    const nums = splitText.map(item => Number(item))
    const flag = nums.some((num, index) => {
      if (isNaN(num)) return true

      if (num < 0 || num !== Math.floor(num)) return true

      if (splitFormat[index] === 'HH') {
        if (num > 23) return true
      } else if (num > 59) {
        return true
      }
    })
    if (flag) return

    setValue(oldValue => {
      let newValue = oldValue || dayjs()
      splitFormat.forEach((item, index) => {
        if (item === 'HH') {
          newValue = newValue.set('hour', nums[index])
        } else if (item === 'mm') {
          newValue = newValue.set('minute', nums[index])
        } else if (item === 'ss') {
          newValue = newValue.set('second', nums[index])
        }
      })

      if (newValue.hour() === oldValue?.hour() &&
        newValue.minute() === oldValue?.minute() &&
        newValue.second() === oldValue?.second()) return oldValue
      
      onChange?.(newValue, newValue.format(format))
      return newValue
    })
  }, [format, customFormat, onChange])

  const handleClear = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setValue(() => {
      onChange?.()
      return undefined
    })
  }, [onChange])

  if (disabled) {
    return (
      <Input
        value={_value?.format(format)}
        className={classNames('rabbit-time-picker', className)}
        style={style}
        suffix={suffixIcon}
        placeholder={placeholder}
        disabled={true}
      />
    )
  }

  return (
    <Popover
      visible={visible}
      className={popupClassName}
      style={popupStyle}
      arrow='none'
      trigger='focus'
      placement={placement}
      content={(
        <div className='rabbit-time'>
          <TimePanel
            value={_value}
            format={format}
            customFormat={customFormat}
            hourStep={hourStep}
            minuteStep={minuteStep}
            secondStep={secondStep}
            disabledTime={disabledTime}
            onChange={handleChange}
          />
          {
            renderExtraFooter ? (
              <div className='rabbit-time-footer'>
                {renderExtraFooter()}
              </div>
            ) : (
              showNow && (
                <div className='rabbit-time-footer'>
                  <span
                    className='time-now'
                    onClick={handleClickNow}
                  >此刻</span>
                </div>
              )
            )
          }
        </div>
      )} 
      onVisibleChange={handleVisibleChange}
    >
      <Input
        value={inputValue}
        className={classNames('rabbit-time-picker', _value && allowClear && 'effect-toggle', className)}
        style={style}
        suffix={(
          <>
            {
              suffixIcon && (
                <span className='suffix'>
                  {suffixIcon}
                </span>
              )
            }
            {
              allowClear && (
                <span className='clear' onClickCapture={handleClear}>
                  {
                    allowClear === true ?
                      <Icon type='close' />:
                      allowClear.clearIcon
                  }
                </span>
              )
            }
          </>
        )}
        placeholder={placeholder}
        readOnly={inputReadOnly}
        onChange={e => setInputValue(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
        onKeyUp={e => e.key === 'Enter' && handleBlur(e.currentTarget.value)}
      />
    </Popover>
  )
}
