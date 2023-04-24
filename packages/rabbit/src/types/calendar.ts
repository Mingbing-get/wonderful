import { Dayjs } from 'dayjs'
export type CalendarMode = 'tenYear' | 'year' | 'quarter' | 'month' | 'week' | 'date'

export type CalendarPanelProps = {
  value?: Dayjs,
  showDate: Dayjs,
  cellRender?: (date: Dayjs, mode: CalendarMode) => React.ReactNode,
  disabledDate?: (date: Dayjs, mode: CalendarMode) => boolean,
  onCellClick?: (date: Dayjs, mode: CalendarMode) => void,
}

export type CalendarHeaderRenderProps = {
  date: Dayjs,
  mode: CalendarMode,
  baseMode: CalendarMode,
  onChangeDate: (newDate: Dayjs) => void,
  onChangeMode: (newMode: CalendarMode) => void
}

export type CalendarProps = {
  value?: Dayjs,
  defaultValue?: Dayjs,
  fullscreen?: boolean,
  mode?: CalendarMode,
  cellRender?: (date: Dayjs, mode: CalendarMode) => React.ReactNode,
  disabledDate?: (date: Dayjs, mode: CalendarMode) => boolean,
  headerRender?: (props: CalendarHeaderRenderProps) => React.ReactNode,
  onChange?: (value: Dayjs, valueStr: string) => void,
  onPanelChange?: (date: Dayjs, mode: CalendarMode) => void,
}