import { Placement } from './popover'
import { TreeValue } from '../hooks/useTree/type'
import { MultipleTreeProps, SingleTreeProps, TreeNode } from './tree'

export type TreeSelectBaseProps = {
  popupClassName?: string
  popupStyle?: React.CSSProperties
  placeholder?: string
  disabled?: boolean
  allowClear?: boolean
  showSearch?: boolean
  suffixIcon?: React.ReactNode
  placement?: Placement
  clearIcon?: React.ReactNode
  expandTrigger?: 'hover' | 'click'
  onPopoverVisibleChange?: (visible: boolean) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'onChange' | 'children'>

export type MultipleTreeSelectProps<T extends object> = {
  onChange?: (checkedPath: TreeValue[][]) => void
  displayRender?: (checkedPath: TreeValue[][], checkedDataPath: TreeNode<T>[][]) => string
} & TreeSelectBaseProps &
  MultipleTreeProps<T>

export type SingleTreeSelectProps<T extends object> = {
  onChange?: (checkedPath: TreeValue[]) => void
  displayRender?: (checkedPath: TreeValue[], checkedDataPath: TreeNode<T>[]) => string
} & TreeSelectBaseProps &
  SingleTreeProps<T>
