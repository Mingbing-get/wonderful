import { SelectValueType, SelectOptionType } from './select'

export interface SelectPanelProps<T extends SelectValueType> {
  value?: T
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  options: SelectOptionType<T>[]
  onClickItem?: (item: SelectOptionType<T>) => void
}
