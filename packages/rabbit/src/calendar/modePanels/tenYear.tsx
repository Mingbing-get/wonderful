import React, { useMemo } from 'react'
import classNames from 'classnames'

import { PanelProps } from '../index'
import { isSameDate, Dayjs } from '../utils'

type TenYearTypeType = 'before' | 'current' | 'after'

type TenYearType = {
  tenStartYear: number,
  dayjs: Dayjs,
  type: TenYearTypeType,
  disabled?: boolean,
}

export default function TenYearPanel({
  value,
  showDate,
  cellRender,
  disabledDate,
  onCellClick,
}: PanelProps) {

  const cellData: TenYearType[] = useMemo(() => {
    const startYear = Math.floor(showDate.year() / 100) * 100 - 10

    return new Array(12).fill(1).map((_, index) => {
      const dayjs = showDate.set('year', startYear + index * 10)
      return {
        tenStartYear: startYear + index * 10,
        dayjs: dayjs,
        type: index === 0 ? 'before' : (index === 11 ? 'after' : 'current'),
        disabled: disabledDate?.(dayjs, 'tenYear')
      }
    })
  }, [showDate, disabledDate])

  return (
    <div className={classNames('rabbit-month-panel', 'ten-year')}>
      {
        cellData.map(tenYear => (
          <div
            className={classNames(
              'month-cell panel-cell',
              `type-${tenYear.type}`,
              tenYear.disabled && 'is-disabled',
              isSameDate('tenYear', tenYear.dayjs, value) && 'is-selected'
            )}
            key={tenYear.tenStartYear}
            onClick={() => !tenYear.disabled && onCellClick?.(tenYear.dayjs, 'tenYear')}
          >{cellRender ? cellRender(tenYear.dayjs, 'tenYear') : `${tenYear.tenStartYear}-${tenYear.tenStartYear + 9}`}</div>
        ))
      }
    </div>
  )
}
