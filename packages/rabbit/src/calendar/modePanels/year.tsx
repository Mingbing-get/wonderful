import React, { useMemo } from 'react'
import classNames from 'classnames'

import { PanelProps } from '../index'
import { isSameDate, Dayjs } from '../utils'

type YearTypeType = 'before' | 'current' | 'after'

type YearType = {
  year: number,
  dayjs: Dayjs,
  type: YearTypeType,
  disabled?: boolean,
}

export default function YearPanel({
  value,
  showDate,
  cellRender,
  disabledDate,
  onCellClick,
}: PanelProps) {

  const cellData: YearType[] = useMemo(() => {
    const startYear = Math.floor(showDate.year() / 10) * 10 - 1
    
    return new Array(12).fill(1).map((_, index) => {
      const dayjs = showDate.set('year', startYear + index)
      return {
        year: startYear + index,
        dayjs: dayjs,
        type: index === 0 ? 'before' : (index === 11 ? 'after' : 'current'),
        disabled: disabledDate?.(dayjs, 'year')
      }
    })
  }, [showDate, disabledDate])

  return (
    <div className={classNames('rabbit-month-panel')}>
      {
        cellData.map(year => (
          <div
            className={classNames(
              'month-cell panel-cell',
              `type-${year.type}`,
              year.disabled && 'is-disabled',
              isSameDate('year', year.dayjs, value) && 'is-selected'
            )}
            key={year.year}
            onClick={() => !year.disabled && onCellClick?.(year.dayjs, 'year')}
          >{cellRender ? cellRender(year.dayjs, 'year') : year.year}</div>
        ))
      }
    </div>
  )
}
