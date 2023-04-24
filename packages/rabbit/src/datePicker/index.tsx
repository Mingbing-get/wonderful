import React, { useCallback, useEffect, useState, useRef } from 'react'
import classNames from 'classnames'

import Input from '../input'
import Popover from '../popover'
import Button from '../button'
import Icon from '../icon'
import TimePanel from '../timePicker/panel'
import Calendar from '../calendar'
import { formatDateAndTime, dayjs, Dayjs } from '../calendar/utils'
import DateHeaderRender from './dateHeaderRender'

import { DatePickerProps } from '../types/datePicker'

import './index.scss'

export default function DatePicker({
  className,
  style,
  popupClassName,
  popupStyle,
  placement = 'bottom-start',
  defaultValue,
  value,
  allowClear = true,
  disabled,
  inputReadOnly,
  placeholder,
  suffixIcon = <Icon type='date' />,
  time,
  mode = 'date',
  showNow,
  customFormat,
  disabledDate,
  cellRender,
  headerRender = props => <DateHeaderRender {...props} />,
  renderExtraFooter,
  onChange,
  onOpenChange,
}: DatePickerProps) {
  const [_value, setValue] = useState(defaultValue || value)
  const [showValue, setShowValue] = useState(defaultValue || value)
  const [inputValue, setInputValue] = useState('')
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)

  const initRef = useRef(false)

  const _formatDateAndTime = useCallback((value: Dayjs) => {
    return formatDateAndTime(value, mode, customFormat?.format, time ? (time.format || 'HH:mm:ss') : undefined, time?.customFormat?.format)
  }, [mode, customFormat, time])

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      if (value === undefined) return
    }

    setValue(oldValue => {
      if (oldValue?.isSame(value)) return oldValue

      return value
    })
  }, [value])

  useEffect(() => {
    const curValue = visible ? showValue : _value
    if (!curValue) {
      setInputValue('')
      return
    }

    setInputValue(_formatDateAndTime(curValue))
  }, [_value, visible, showValue, _formatDateAndTime, count])

  useEffect(() => {
    setShowValue(_value)
    onOpenChange?.(visible)
  }, [_value, visible, onOpenChange])

  const handleChangeNow = useCallback(() => {
    const now = dayjs()
    setValue(now)
    onChange?.(now, _formatDateAndTime(now))
    setVisible(false)
  }, [onChange, _formatDateAndTime])

  const handleClear = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setValue(undefined)
    onChange?.()
  }, [onChange])

  const handleConfirm = useCallback(() => {
    setVisible(false)
    setValue(showValue)
    if (!showValue) {
      onChange?.()
    } else {
      onChange?.(showValue, _formatDateAndTime(showValue))
    }
  }, [onChange, showValue, _formatDateAndTime])

  const handleInputBlur = useCallback((value: string) => {
    setCount(old => old + 1)
    if (customFormat) {
      const newDate = customFormat.validate(value)
      if (newDate) {
        setValue(newDate)
        setShowValue(newDate)
        onChange?.(newDate, _formatDateAndTime(newDate))
      }
      return
    }

    const newDate = dayjs(value)
    if (!newDate.isValid()) return
    
    setValue(newDate)
    setShowValue(newDate)
    onChange?.(newDate, value)
  }, [onChange, _formatDateAndTime, customFormat])

  if (disabled) {
    return (
      <Input
        value={inputValue}
        placeholder={placeholder}
        disabled={true}
        className={classNames('rabbit-date-picker', time && 'has-time', className)}
        style={style}
        suffix={suffixIcon && (
          <span className='suffix'>
            {suffixIcon}
          </span>
        )}
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
      onVisibleChange={setVisible}
      content={
        <div className='rabbit-date-picker-panel'>
          <div className='date-panel-body'>
            <Calendar
              value={showValue}
              fullscreen={false}
              mode={mode}
              cellRender={cellRender}
              disabledDate={disabledDate}
              headerRender={headerRender}
              onChange={setShowValue}
            />
            {
              time && (
                <div className='date-picker-panel-time-wrapper'>
                  <div className='date-picker-panel-time-header'>
                    {time.customFormat && showValue ?
                      time.customFormat.format(showValue.clone()) :
                      showValue?.format(time.format || 'HH:mm:ss')
                    }
                  </div>
                  <TimePanel
                    {...time}
                    value={showValue}
                    onChange={setShowValue}
                  />
                </div>
              )
            }
          </div>
          <div className='date-panel-footer'>
            <div className='extra-footer'>
              {
                renderExtraFooter ?
                  renderExtraFooter() : (
                    showNow && (
                      <span className='date-now' onClick={handleChangeNow}>
                        {time ? '此刻' : '今天'}
                      </span>
                    )
                  )
              }
            </div>
            <Button type='primary' onClick={handleConfirm}>确定</Button>
          </div>
        </div>
      }
    >
      <Input
        value={inputValue}
        placeholder={placeholder}
        readOnly={inputReadOnly}
        className={classNames('rabbit-date-picker', _value && allowClear && 'effect-toggle', time && 'has-time', className)}
        style={style}
        onChange={e => setInputValue(e.target.value)}
        onBlur={e => handleInputBlur(e.currentTarget.value)}
        onKeyUp={e => e.key === 'Enter' && handleInputBlur(e.currentTarget.value)}
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
                      <Icon type='close' /> :
                      allowClear.clearIcon
                  }
                </span>
              )
            }
          </>
        )}
      />
    </Popover>
  )
}
