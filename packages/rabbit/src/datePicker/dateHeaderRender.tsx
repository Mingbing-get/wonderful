import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import Icon from '../icon'
import { HeaderRenderProps, CalendarMode } from '../calendar'

export default function DateHeaderRender({
  mode,
  date,
  baseMode,
  onChangeDate,
  onChangeMode
}: HeaderRenderProps) {
  const nextMode = useMemo(() => getNextMode(mode, baseMode), [mode, baseMode])
  const preMode = useMemo(() => getPreMode(mode, baseMode), [mode, baseMode])

  const titles: string[] = useMemo(() => {
    if (mode === 'date') {
      return [`${date.year()}年`, `${date.month() + 1}月`]
    }
    if (mode === 'week') {
      return [`${date.year()}年`, `${date.month() + 1}月`]
    }
    if (mode === 'month') {
      return [`${date.year()}年`]
    }
    if (mode === 'quarter') {
      return [`${date.year()}年`]
    }
    if (mode === 'year') {
      const startYear = Math.floor(date.year() / 10) * 10
      return [`${startYear}-${startYear + 9}`]
    }
    const startYear = Math.floor(date.year() / 100) * 100
    return [`${startYear}-${startYear + 99}`]
  }, [mode, date])

  const handleArrowClick = useCallback((next: boolean) => {
    if (next) {
      onChangeDate(date.set('month', date.month() + 1))
    } else {
      onChangeDate(date.set('month', date.month() - 1))
    }
  }, [onChangeDate, date])

  const handleDoubleArrowClick = useCallback((next: boolean) => {
    let diffYear = 1
    if (mode === 'year') {
      diffYear = 10
    } else if (mode === 'tenYear') {
      diffYear = 100
    }

    if (next) {
      onChangeDate(date.set('year', date.year() + diffYear))
    } else {
      onChangeDate(date.set('year', date.year() - diffYear))
    }
  }, [onChangeDate, date, mode])

  return (
    <div className='date-header-render'>
      <div className='arrow-wrapper'>
        <Icon type='doubleArrowLeft' onClick={() => handleDoubleArrowClick(false)} />
        {
          titles.length > 1 && (
            <Icon type='arrowLeft' onClick={() => handleArrowClick(false)} />
          )
        }
      </div>
      <div className='header-title-wrapper'>
        {
          titles.map((title) => (
            <span
              key={title}
              className={classNames('date-header-title', preMode && 'has-pre')}
              onClick={() => preMode && onChangeMode(title.includes('年') ? 'year' : preMode as CalendarMode)}
            >{title}</span>
          ))
        }
      </div>
      <div className='arrow-wrapper'>
        {
          titles.length > 1 && (
            <Icon type='arrowRight' onClick={() => handleArrowClick(true)} />
          )
        }
        <Icon type='doubleArrowRight' onClick={() => handleDoubleArrowClick(true)} />
      </div>
    </div>
  )
}

function getNextMode(mode: CalendarMode, baseMode: CalendarMode) {
  if (baseMode === 'date') {
    return {
      'date': null,
      'week': 'date',
      'month': 'date',
      'quarter': 'month',
      'year': 'month',
      'tenYear': 'year'
    }[mode]
  }
  if (baseMode === 'week') {
    return {
      'date': null,
      'week': null,
      'month': 'week',
      'quarter': 'month',
      'year': 'month',
      'tenYear': 'year'
    }[mode]
  }
  if (baseMode === 'month') {
    return {
      'date': null,
      'week': null,
      'month': null,
      'quarter': 'month',
      'year': 'month',
      'tenYear': 'year'
    }[mode]
  }
  if (baseMode === 'quarter') {
    return {
      'date': null,
      'week': null,
      'month': null,
      'quarter': null,
      'year': 'month',
      'tenYear': 'year'
    }[mode]
  }
  if (baseMode === 'year') {
    return {
      'date': null,
      'week': null,
      'month': null,
      'quarter': null,
      'year': null,
      'tenYear': 'year'
    }[mode]
  }
  if (baseMode === 'tenYear') {
    return null
  }
}

function getPreMode(mode: CalendarMode, baseMode: CalendarMode) {
  if (baseMode === 'date') {
    return {
      'date': 'month',
      'week': 'month',
      'month': 'year',
      'quarter': 'year',
      'year': 'tenYear',
      'tenYear': null
    }[mode]
  }
  if (baseMode === 'week') {
    return {
      'date': 'week',
      'week': 'month',
      'month': 'year',
      'quarter': 'year',
      'year': 'tenYear',
      'tenYear': null
    }[mode]
  }
  if (baseMode === 'month') {
    return {
      'date': 'month',
      'week': 'month',
      'month': 'year',
      'quarter': 'year',
      'year': 'tenYear',
      'tenYear': null
    }[mode]
  }
  if (baseMode === 'quarter') {
    return {
      'date': 'quarter',
      'week': 'quarter',
      'month': 'quarter',
      'quarter': 'year',
      'year': 'tenYear',
      'tenYear': null
    }[mode]
  }
  if (baseMode === 'year') {
    return {
      'date': 'year',
      'week': 'year',
      'month': 'year',
      'quarter': 'year',
      'year': 'tenYear',
      'tenYear': null
    }[mode]
  }
  if (baseMode === 'tenYear') {
    return {
      'date': 'tenYear',
      'week': 'tenYear',
      'month': 'tenYear',
      'quarter': 'tenYear',
      'year': 'tenYear',
      'tenYear': null
    }[mode]
  }
}
