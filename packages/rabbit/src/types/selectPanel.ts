import { SelectValueType, SelectOptionType, SelectGroup } from './select'

export interface SelectPanelProps<T extends SelectValueType, O extends SelectOptionType<T>> {
  value?: T
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  options: O[] | SelectGroup<T, O>[]
  onClickItem?: (item: O) => void
}
