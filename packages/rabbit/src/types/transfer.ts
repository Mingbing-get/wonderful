import { ListLoadMore } from './list'
import { VirtualScrollY } from '../hooks/useVirtualScrollY'

export type TransferDirection = 'left' | 'right'

export type TransferOptionType<T extends object = {}> = {
  value: number | string
  label?: string
  disabled?: boolean
} & T

export type TransferProps = {
  className?: string
  listClassName?: string
  style?: React.CSSProperties
  listStyle?: React.CSSProperties
  data: TransferOptionType[][]
  selectedValues?: (number | string)[][]
  defaultSelectedValues?: (number | string)[][]
  oneWay?: boolean | boolean[]
  showSearch?: boolean | boolean[]
  showSelectAll?: boolean | boolean[]
  titles?: React.ReactNode | React.ReactNode[]
  selectAllLabels?: React.ReactNode | React.ReactNode[]
  selectInvertLabels?: React.ReactNode | React.ReactNode[]
  loadMore?: ListLoadMore[]
  virtualScroll?: VirtualScrollY
  filterOption?: (inputValue: string, option: TransferOptionType) => boolean
  footerRender?: (index: number) => React.ReactNode
  btnRender?: (index: number, direction: TransferDirection) => React.ReactNode
  onChange?: (data: TransferOptionType[][]) => void
  onSelectChange?: (selectedValues: (number | string)[][], selectedOptions: TransferOptionType[][]) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'>
