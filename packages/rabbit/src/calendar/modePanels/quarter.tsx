import React, { useMemo } from 'react'
import classNames from 'classnames'

import { CalendarPanelProps } from '../../types/calendar'
import { isSameDate, Dayjs } from '../utils'

type QuarterType = {
  quarter: number,
  dayjs: Dayjs,
  disabled?: boolean,
}

export default function QuarterPanel({
  value,
  showDate,
  cellRender,
  disabledDate,
  onCellClick,
}: CalendarPanelProps) {

  const cellData: QuarterType[] = useMemo(() => {
    return new Array(4).fill(1).map((_, index) => {
      const dayjs = showDate.quarter(index)
      return {
        quarter: index + 1,
        dayjs: dayjs,
        disabled: disabledDate?.(dayjs, 'quarter')
      }
    })
  }, [showDate, disabledDate])

  return (
    <div className={classNames('rabbit-quarter-panel')}>
      {
        cellData.map(quarter => (
          <div
            className={classNames(
              'quarter-cell panel-cell',
              quarter.disabled && 'is-disabled',
              isSameDate('quarter', quarter.dayjs, value) && 'is-selected'
            )}
            key={quarter.quarter}
            onClick={() => !quarter.disabled && onCellClick?.(quarter.dayjs, 'quarter')}
          >{cellRender ? cellRender(quarter.dayjs, 'quarter') : `Q${quarter.quarter}`}</div>
        ))
      }
    </div>
  )
}
