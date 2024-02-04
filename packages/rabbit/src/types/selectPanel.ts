import { SelectValueType, SelectOptionType, SelectGroup } from './select'

export interface SelectPanelProps<T extends SelectValueType, O extends SelectOptionType<T>> {
  value?: T
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  options: SelectOptionType<T>[] | SelectGroup<T>[]
  onClickItem?: (item: O) => void
}
