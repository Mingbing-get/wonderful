import React, { useMemo } from 'react'
import classNames from 'classnames'
import { Dayjs } from 'dayjs'

import { PanelProps } from '../index'
import { isSameDate } from '../utils'

type MonthType = {
  month: number,
  dayjs: Dayjs,
  disabled?: boolean,
}

export default function MonthPanel({
  value,
  showDate,
  cellRender,
  disabledDate,
  onCellClick,
}: PanelProps) {

  const cellData: MonthType[] = useMemo(() => {
    return new Array(12).fill(1).map((_, index) => {
      const dayjs = showDate.set('month', index)
      return {
        month: index + 1,
        dayjs: dayjs,
        disabled: disabledDate?.(dayjs, 'month')
      }
    })
  }, [showDate, disabledDate])

  return (
    <div className={classNames('rabbit-month-panel')}>
      {
        cellData.map(month => (
          <div
            className={classNames(
              'month-cell panel-cell',
              month.disabled && 'is-disabled',
              isSameDate('month', month.dayjs, value) && 'is-selected'
            )}
            key={month.month}
            onClick={() => !month.disabled && onCellClick?.(month.dayjs, 'month')}
          >{cellRender ? cellRender(month.dayjs, 'month') : `${month.month}月`}</div>
        ))
      }
    </div>
  )
}
