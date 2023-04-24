import React, { useMemo } from 'react'

import Select, { OptionType } from '../select'
import InputGroup from '../inputGroup'
import { CalendarHeaderRenderProps } from '../types/calendar'

export default function HeaderRender({
  date,
  mode,
  baseMode,
  onChangeDate,
  onChangeMode
}: CalendarHeaderRenderProps) {
  const tenYearOptions: OptionType<number>[] = useMemo(() => {
    const startYear = Math.floor(date.year() / 10) * 10 - 100

    return new Array(20).fill(1).map((_, index) => ({
      value: index * 10 + startYear,
      label: `${index * 10 + startYear}-${(index + 1) * 10 + startYear - 1}`
    }))
  }, [date])

  const centuryOptions: OptionType<number>[] = useMemo(() => {
    const startYear = Math.floor(date.year() / 100) * 100 - 1000

    return new Array(20).fill(1).map((_, index) => ({
      value: index * 100 + startYear,
      label: `${index * 100 + startYear}-${(index + 1) * 100 + startYear - 1}`
    }))
  }, [date])

  const yearOptions: OptionType<number>[] = useMemo(() => {
    const startYear = date.year() - 20
    return new Array(30).fill(1).map((_, index) => ({
      value: index + startYear,
      label: `${index + startYear}年`
    }))
  }, [date])

  const monthOptions: OptionType<number>[] = useMemo(() => {
    return new Array(12).fill(1).map((_, index) => ({
      value: index,
      label: `${index + 1}月`
    }))
  }, [])

  return (
    <div className='default-calendar-header'>
      <InputGroup>
        {
          ['tenYear'].includes(mode) && (
            <Select
              className='calendar-ten-year-select'
              value={Math.floor(date.year() / 100) * 100}
              onChange={year => year && onChangeDate(date.set('year', year))}
              options={centuryOptions}
            />
          )
        }
        {
          ['year'].includes(mode) && (
            <Select
              className='calendar-ten-year-select'
              value={Math.floor(date.year() / 10) * 10}
              onChange={year => year && onChangeDate(date.set('year', year))}
              options={tenYearOptions}
            />
          )
        }
        {
          ['quarter', 'month', 'week', 'date'].includes(mode) && (
            <Select
              className='calendar-year-select'
              value={date.year()}
              onChange={year => year && onChangeDate(date.set('year', year))}
              options={yearOptions}
            />
          )
        }
        {
          ['date', 'week'].includes(mode) && (
            <Select
              className='calendar-month-select'
              value={date.month()}
              onChange={month => month !== undefined && onChangeDate(date.set('month', month))}
              options={monthOptions}
            />
          )
        }
      </InputGroup>
    </div>
  )
}
