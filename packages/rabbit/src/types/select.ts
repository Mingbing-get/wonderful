export type SelectValueType = number | string
export type SelectOptionType<T extends SelectValueType = SelectValueType> = {
  value: T
  label?: string
  prefix?: React.ReactElement
  suffix?: React.ReactElement
  className?: string
  style?: React.CSSProperties
  [k: string]: any
  onClick?: (value: T) => void
  onMouseEnter?: (value: T) => void
}

export type BaseSelectProps<T extends SelectValueType> = {
  options: SelectOptionType<T>[]
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  disabled?: boolean
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
} & Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange' | 'defaultValue' | 'value' | 'children'>

export type SelectProps<T extends SelectValueType> = {
  defaultValue?: T
  value?: T
  allowClear?: boolean
  onChange?: (value?: T) => void
} & BaseSelectProps<T>

export type MultipleSelectProps<T extends SelectValueType> = {
  defaultValue?: T[]
  value?: T[]
  showSearch?: boolean
  onChange?: (value: T[]) => void
} & BaseSelectProps<T>
