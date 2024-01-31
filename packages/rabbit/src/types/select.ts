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

export type SelectGroup<T extends SelectValueType = SelectValueType, O extends SelectOptionType<T> = SelectOptionType<T>> = {
  id: string
  label: React.ReactNode
  options: O[]
  [k: string]: any
}

export type BaseSelectProps<T extends SelectValueType, O extends SelectOptionType<T>> = {
  options: O[] | SelectGroup<T, O>[]
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  disabled?: boolean
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
} & Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange' | 'defaultValue' | 'value' | 'children'>

export type SelectProps<T extends SelectValueType, O extends SelectOptionType<T>> = {
  defaultValue?: T
  value?: T
  allowClear?: boolean
  onChange?: (value?: T) => void
} & BaseSelectProps<T, O>

export type MultipleSelectProps<T extends SelectValueType, O extends SelectOptionType<T>> = {
  defaultValue?: T[]
  value?: T[]
  showSearch?: boolean
  onChange?: (value: T[]) => void
} & BaseSelectProps<T, O>
