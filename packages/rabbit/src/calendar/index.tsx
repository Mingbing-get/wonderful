import React, { useState, useMemo, useCallback, useEffect } from 'react'
import classNames from 'classnames'

import DatePanel from './modePanels/date'
import MonthPanel from './modePanels/month'
import WeekPanel from './modePanels/week'
import YearPanel from './modePanels/year'
import TenYearPanel from './modePanels/tenYear'
import QuarterPanel from './modePanels/quarter'
import HeaderRender from './headerRender'

import { isSameDate, getNextMode, formatDateByMode, dayjs, Dayjs } from './utils'
import { CalendarProps, CalendarMode } from '../types/calendar'

import './index.scss'

export default function Calendar({
  value,
  defaultValue,
  fullscreen = true,
  mode = 'date',
  cellRender,
  disabledDate,
  headerRender = (props) => <HeaderRender {...props} />,
  onChange,
  onPanelChange
}: CalendarProps) {
  const [showDate, setShowDate] = useState(defaultValue || value || dayjs())
  const [_value, setValue] = useState(defaultValue || value)
  const [_mode, setMode] = useState(mode)

  useEffect(() => {
    setValue(oldValue => {
      if (oldValue?.isSame(value)) return oldValue

      setShowDate(value || dayjs())
      return value
    })
  }, [value])

  useEffect(() => {
    setMode(mode)
  }, [mode])

  const Panel = useMemo(() => {
    return {
      tenYear: TenYearPanel,
      year: YearPanel,
      quarter: QuarterPanel,
      month: MonthPanel,
      week: WeekPanel,
      date: DatePanel
    }[_mode]
  }, [_mode])

  const handleCellClick = useCallback((date: Dayjs, innerMode: CalendarMode) => {
    setValue(oldDate => {
      if (isSameDate(innerMode, oldDate, date)) return oldDate
      onChange?.(date.clone(), formatDateByMode(date, mode))
      setShowDate(date.clone())
      return date
    })

    const nextMode = getNextMode(innerMode, mode)
    if (nextMode && nextMode !== innerMode) {
      setMode(nextMode as CalendarMode)
    }
  }, [onChange, mode])

  const handleChangeMode = useCallback((mode: CalendarMode) => {
    setMode((oldMode) => {
      if (mode === oldMode) return oldMode

      onPanelChange?.(showDate, mode)
      return mode
    })
  }, [showDate, onPanelChange])

  return (
    <div className={classNames('rabbit-calendar-wrapper', fullscreen && 'is-full-screen')}>
      <div className='rabbit-calendar-header'>
        {headerRender({
          date: showDate,
          mode: _mode,
          baseMode: mode,
          onChangeDate: setShowDate,
          onChangeMode: handleChangeMode
        })}
      </div>
      <Panel
        value={_value}
        showDate={showDate}
        cellRender={cellRender}
        disabledDate={disabledDate}
        onCellClick={handleCellClick}
      />
    </div>
  )
}
