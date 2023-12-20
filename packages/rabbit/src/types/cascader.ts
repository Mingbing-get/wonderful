import { BaseTreeNode, TreeMode, TreeValue } from '../hooks/useTree/type'
import { Placement } from './popover'

export type CascaderOption<T extends object = {}> = BaseTreeNode<
  T & {
    label?: string
  }
>
export type CascaderTriggerType = 'click' | 'hover'

export type CascaderDropdownRender = (menus: React.ReactNode, type: 'search' | 'option') => React.ReactNode
export type CascaderLoadData<T extends object> = (option: CascaderOption<T>) => void
export type CascaderNotFoundContent = () => React.ReactNode

export type CascaderBaseProps<T extends object> = {
  className?: string
  popupClassName?: string
  style?: React.CSSProperties
  popupStyle?: React.CSSProperties
  options: CascaderOption<T>[]
  showSearch?: boolean
  allowClear?: boolean
  disabled?: boolean
  placeholder?: string
  expandTrigger?: CascaderTriggerType
  placement?: Placement
  clearIcon?: React.ReactNode
  expandIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  mode?: TreeMode
  dropdownRender?: CascaderDropdownRender
  loadData?: CascaderLoadData<T>
  notFoundContent?: CascaderNotFoundContent
  onDropdownVisibleChange?: (visible: boolean) => void
  onSearch?: (search: string) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'value' | 'defaultValue' | 'onChange'>

export type CascaderSingleDisplayRender<T extends object> = (labels: string[], checkedPath: CascaderOption<T>[]) => React.ReactNode

export type CascaderSingleProps<T extends object> = CascaderBaseProps<T> & {
  defaultValue?: TreeValue[]
  value?: TreeValue[]
  onChange?: (value: TreeValue[], checkedPath: CascaderOption<T>[]) => void
  displayRender?: CascaderSingleDisplayRender<T>
}

export type CascaderMultipleDisplayRender<T extends object> = (labels: string[][], checkedPath: CascaderOption<T>[][]) => React.ReactNode

export type CascaderMultipleProps<T extends object> = CascaderBaseProps<T> & {
  defaultValue?: TreeValue[][]
  value?: TreeValue[][]
  onChange?: (value: TreeValue[][], checkedPath: CascaderOption<T>[][]) => void
  displayRender?: CascaderMultipleDisplayRender<T>
}
