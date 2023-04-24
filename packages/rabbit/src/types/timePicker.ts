import { Dayjs } from 'dayjs'
import { Placement } from '../types/popover'

export type TimePickerFormatType = 'HH:mm:ss' | 'HH:mm' | 'mm:ss' | 'HH' | 'mm' | 'ss'
export type TimePickerType = 'hour' | 'minute' | 'second'

export type TimePickerProps = {
  className?: string,
  style?: React.CSSProperties,
  popupClassName?: string,
  popupStyle?: React.CSSProperties,
  placement?: Placement,
  defaultValue?: Dayjs,
  value?: Dayjs,
  allowClear?: boolean | { clearIcon?: React.ReactNode },
  disabled?: boolean,
  format?: TimePickerFormatType,
  customFormat?: {
    format: (dayjs: Dayjs) => string,
    validate: (timeStr: string) => Dayjs | undefined,
  },
  hourStep?: number,
  minuteStep?: number,
  secondStep?: number,
  inputReadOnly?: boolean,
  placeholder?: string,
  showNow?: boolean,
  suffixIcon?: React.ReactNode,
  disabledTime?: (timeNumber: number, timeType: TimePickerType) => boolean,
  renderExtraFooter?: () => React.ReactNode,
  onChange?: (time?: Dayjs, timeString?: string) => void,
  onOpenChange?: (open: boolean) => void,
}