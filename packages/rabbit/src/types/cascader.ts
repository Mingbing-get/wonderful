import { BaseTreeNode, TreeMode, TreeValue } from '../hooks/useTree/type'
import { Placement } from './popover'

export type CascaderOption<T extends object = {}> = BaseTreeNode<
  T & {
    label?: string
  }
>
export type CascaderTriggerType = 'click' | 'hover'

export type CascaderDropdownRender = (menus: React.ReactNode, type: 'search' | 'option') => React.ReactNode
export type CascaderLoadData = (option: CascaderOption) => void
export type CascaderNotFoundContent = () => React.ReactNode

export type CascaderBaseProps = {
  className?: string
  popupClassName?: string
  style?: React.CSSProperties
  popupStyle?: React.CSSProperties
  options: CascaderOption[]
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
  loadData?: CascaderLoadData
  notFoundContent?: CascaderNotFoundContent
  onDropdownVisibleChange?: (visible: boolean) => void
  onSearch?: (search: string) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'value' | 'defaultValue' | 'onChange'>

export type CascaderSingleDisplayRender = (labels: string[], checkedPath: CascaderOption[]) => React.ReactNode

export type CascaderSingleProps = CascaderBaseProps & {
  defaultValue?: TreeValue[]
  value?: TreeValue[]
  onChange?: (value: TreeValue[], checkedPath: CascaderOption[]) => void
  displayRender?: CascaderSingleDisplayRender
}

export type CascaderMultipleDisplayRender = (labels: string[][], checkedPath: CascaderOption[][]) => React.ReactNode

export type CascaderMultipleProps = CascaderBaseProps & {
  defaultValue?: TreeValue[][]
  value?: TreeValue[][]
  onChange?: (value: TreeValue[][], checkedPath: CascaderOption[][]) => void
  displayRender?: CascaderMultipleDisplayRender
}
