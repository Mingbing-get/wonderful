import { CalendarMode } from '../types/calendar'
import { TimePickerFormatType } from '../types/timePicker'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs, { Dayjs } from 'dayjs'

dayjs.extend(weekOfYear)
dayjs.extend(quarterOfYear)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)

export { dayjs, Dayjs }

export function getNextMode(mode: CalendarMode, baseMode: CalendarMode) {
  if (baseMode === 'date') {
    return {
      date: null,
      week: 'date',
      month: 'date',
      quarter: 'month',
      year: 'month',
      tenYear: 'year',
    }[mode]
  }
  if (baseMode === 'week') {
    return {
      date: null,
      week: null,
      month: 'week',
      quarter: 'month',
      year: 'month',
      tenYear: 'year',
    }[mode]
  }
  if (baseMode === 'month') {
    return {
      date: null,
      week: null,
      month: null,
      quarter: 'month',
      year: 'month',
      tenYear: 'year',
    }[mode]
  }
  if (baseMode === 'quarter') {
    return {
      date: null,
      week: null,
      month: null,
      quarter: null,
      year: 'month',
      tenYear: 'year',
    }[mode]
  }
  if (baseMode === 'year') {
    return {
      date: null,
      week: null,
      month: null,
      quarter: null,
      year: null,
      tenYear: 'year',
    }[mode]
  }
  if (baseMode === 'tenYear') {
    return null
  }
}

export function getPreMode(mode: CalendarMode, baseMode: CalendarMode) {
  if (baseMode === 'date') {
    return {
      date: 'month',
      week: 'month',
      month: 'year',
      quarter: 'year',
      year: 'tenYear',
      tenYear: null,
    }[mode]
  }
  if (baseMode === 'week') {
    return {
      date: 'week',
      week: 'month',
      month: 'year',
      quarter: 'year',
      year: 'tenYear',
      tenYear: null,
    }[mode]
  }
  if (baseMode === 'month') {
    return {
      date: 'month',
      week: 'month',
      month: 'year',
      quarter: 'year',
      year: 'tenYear',
      tenYear: null,
    }[mode]
  }
  if (baseMode === 'quarter') {
    return {
      date: 'quarter',
      week: 'quarter',
      month: 'quarter',
      quarter: 'year',
      year: 'tenYear',
      tenYear: null,
    }[mode]
  }
  if (baseMode === 'year') {
    return {
      date: 'year',
      week: 'year',
      month: 'year',
      quarter: 'year',
      year: 'tenYear',
      tenYear: null,
    }[mode]
  }
  if (baseMode === 'tenYear') {
    return {
      date: 'tenYear',
      week: 'tenYear',
      month: 'tenYear',
      quarter: 'tenYear',
      year: 'tenYear',
      tenYear: null,
    }[mode]
  }
}

export function isSameDate(unit: CalendarMode, dayjs1?: Dayjs, dayjs2?: Dayjs) {
  if (!dayjs1 && !dayjs2) return true

  if (!dayjs1 || !dayjs2) return false

  if (unit === 'tenYear') {
    return Math.floor(dayjs1.year() / 10) === Math.floor(dayjs2.year() / 10)
  }

  if (unit === 'quarter') {
    return dayjs1.isSame(dayjs2, 'year') && dayjs1.quarter() === dayjs2.quarter()
  }

  return dayjs1.isSame(dayjs2, unit)
}

export function formatDateByMode(date: Dayjs, mode: CalendarMode) {
  if (mode === 'quarter') {
    return `${date.format('YYYY')}-Q${date.format('Q')}`
  }

  const formatStr = {
    date: 'YYYY-MM-DD',
    week: 'YYYY-MM-w周',
    month: 'YYYY-MM',
    year: 'YYYY',
    tenYear: 'YYYY',
  }[mode]

  return date.format(formatStr)
}

export function formatDateAndTime(
  value: Dayjs,
  mode: CalendarMode,
  dateCustomFormat?: (value: Dayjs) => string,
  timeFormat?: TimePickerFormatType,
  timeCustomFormat?: (value: Dayjs) => string
) {
  let timeStr = ''
  if (timeFormat) {
    timeStr = ' ' + (timeCustomFormat ? timeCustomFormat(value.clone()) : value.format(timeFormat))
  }

  return (dateCustomFormat ? dateCustomFormat(value.clone()) : formatDateByMode(value, mode)) + timeStr
}
