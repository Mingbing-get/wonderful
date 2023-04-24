import { Placement } from './popover'
import { TreeValue } from '../hooks/useTree/type'
import { MultipleTreeProps, SingleTreeProps, TreeNode } from './tree'

export type TreeSelectBaseProps = {
  popupClassName?: string,
  popupStyle?: React.CSSProperties,
  placeholder?: string,
  disabled?: boolean,
  allowClear?: boolean,
  suffixIcon?: React.ReactNode,
  placement?: Placement,
  clearIcon?: React.ReactNode,
  expandTrigger?: 'hover' | 'click',
  onPopoverVisibleChange?: (visible: boolean) => void,
}

export type MultipleTreeSelectProps = {
  onChange?: (checkedPath: TreeValue[][]) => void,
  displayRender?: (checkedPath: TreeValue[][], checkedDataPath: TreeNode[][]) => string,
} & TreeSelectBaseProps & MultipleTreeProps

export type SingleTreeSelectProps = {
  onChange?: (checkedPath: TreeValue[]) => void,
  displayRender?: (checkedPath: TreeValue[], checkedDataPath: TreeNode[]) => string,
} & TreeSelectBaseProps & SingleTreeProps