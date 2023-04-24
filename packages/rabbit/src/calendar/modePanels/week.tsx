import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import { CalendarPanelProps } from '../../types/calendar'
import { isSameDate, Dayjs } from '../utils'

const weeks = ['日', '一', '二', '三', '四', '五', '六']

type DateTypeType = 'before' | 'current' | 'after'
type DateType = {
  date: number,
  dayjs: Dayjs,
  type: DateTypeType,
  disabled?: boolean,
}

export default function WeekPanel({
  value,
  showDate,
  cellRender,
  disabledDate,
  onCellClick,
}: CalendarPanelProps) {

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

  const startWeek = useMemo(() => cellData[0].dayjs.week(), [cellData])

  return (
    <div className={classNames('rabbit-week-panel')}>
      <div className='week-cell'>
        <div></div>
        {
          weeks.map(week => (
            <div className='date-week' key={week}>{week}</div>
          ))
        }
      </div>
      {
        new Array(cellData.length / 7).fill(1).map((_, index) => (
          <div
            className={classNames(
              'week-cell panel-cell',
              isSameDate('week', cellData[index * 7 + 1].dayjs, value) && 'is-selected'
            )}
            key={index}
            onClick={() => onCellClick?.(cellData[index * 7 + 1].dayjs, 'week')}
          >
            <div className='type-week'>{startWeek + index}</div>
            {
              cellData.slice(index * 7, (index + 1) * 7).map((date) => (
                <div className={`type-${date.type}`} key={`${date.type}_${date.date}`}>{date.date}</div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
