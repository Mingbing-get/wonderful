import { SelectValueType, SelectOptionType } from './select'

export interface SelectPanelProps<T extends SelectValueType, O extends SelectOptionType<T>> {
  value?: T
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  options: O[]
  onClickItem?: (item: O) => void
}
