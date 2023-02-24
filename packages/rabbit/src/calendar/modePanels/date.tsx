import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import { PanelProps } from '../index'
import { isSameDate, Dayjs } from '../utils'

const weeks = ['日', '一', '二', '三', '四', '五', '六']

type DateTypeType = 'before' | 'current' | 'after'
type DateType = {
  date: number,
  dayjs: Dayjs,
  type: DateTypeType,
  disabled?: boolean,
}

export default function DatePanel({
  value,
  showDate,
  cellRender,
  disabledDate,
  onCellClick,
}: PanelProps) {

  const dateToDayjs = useCallback((date: number, type: DateTypeType) => {
    let copyDate = showDate.clone()

    if (type === 'before') {
      copyDate = copyDate.set('month', copyDate.month() - 1)
    } else if (type === 'after') {
      copyDate = copyDate.set('month', copyDate.month() + 1)
    }

    return copyDate.set('date', date)
  }, [showDate])

  const cellData = useMemo(() => {
    const dates: DateType[] = []
    new Array(showDate.daysInMonth()).fill(1).forEach((_, index) => {
      const dayjs = dateToDayjs(index + 1, 'current')
      dates.push({
        date: index + 1,
        type: 'current',
        dayjs,
        disabled: disabledDate?.(dayjs.clone(), 'date')
      })
    })

    const beforeMonthDays = showDate.startOf('month').get('day')
    const lastMonthDays = showDate.clone().set('month', showDate.month() - 1).daysInMonth()
    new Array(beforeMonthDays).fill(1).forEach((_, index) => {
      const dayjs = dateToDayjs(lastMonthDays - index, 'before')
      dates.unshift({
        date: lastMonthDays - index,
        type: 'before',
        dayjs,
        disabled: disabledDate?.(dayjs.clone(), 'date')
      })
    })

    const afterMonthDays = 6 - showDate.endOf('month').get('day')
    new Array(afterMonthDays).fill(1).forEach((_, index) => {
      const dayjs = dateToDayjs(index + 1, 'after')
      dates.push({
        date: index + 1,
        type: 'after',
        dayjs,
        disabled: disabledDate?.(dayjs.clone(), 'date')
      })
    })

    return dates
  }, [showDate, disabledDate, dateToDayjs])

  return (
    <div className={classNames('rabbit-date-panel')}>
      {
        weeks.map(week => (
          <div className='date-week' key={week}>{week}</div>
        ))
      }
      {
        cellData.map(date => (
          <div
            className={classNames(
              'date-cell panel-cell',
              `type-${date.type}`,
              date.disabled && 'is-disabled',
              isSameDate('date', date.dayjs, value) && 'is-selected'
            )}
            key={`${date.type}_${date.date}`}
            onClick={() => !date.disabled && onCellClick?.(date.dayjs, 'date')}
          >{cellRender ? cellRender(date.dayjs, 'date') : date.date}</div>
        ))
      }
    </div>
  )
}
