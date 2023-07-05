import { Placement } from './popover'
import { Dayjs } from 'dayjs'
import { Props as TimePickerProps } from '../timePicker/panel'
import { CalendarProps } from './calendar'
import { InputProps } from './input'

export type DatePickerProps = {
  className?: string
  style?: React.CSSProperties
  popupClassName?: string
  popupStyle?: React.CSSProperties
  placement?: Placement
  defaultValue?: Dayjs
  value?: Dayjs
  allowClear?: boolean | { clearIcon?: React.ReactNode }
  disabled?: boolean
  inputReadOnly?: boolean
  placeholder?: string
  suffixIcon?: React.ReactNode
  time?: Omit<TimePickerProps, 'value' | 'onChange'>
  showNow?: boolean
  customFormat?: {
    format: (dayjs: Dayjs) => string
    validate: (timeStr: string) => Dayjs | undefined
  }
  renderExtraFooter?: () => React.ReactNode
  onChange?: (date?: Dayjs, dateString?: string) => void
  onOpenChange?: (open: boolean) => void
} & Pick<CalendarProps, 'headerRender' | 'mode' | 'cellRender' | 'disabledDate'> &
  Omit<InputProps, 'defaultValue' | 'value' | 'readOnly' | 'onChange'>
