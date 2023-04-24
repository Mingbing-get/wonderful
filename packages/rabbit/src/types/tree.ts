import { BaseTreeNode, TreeValue, InnerLocation, LinkTreeNode, TreeMode } from '../hooks/useTree/type'
import { VirtualScrollY } from '../hooks/useVirtualScrollY'

export type TreeNode<T extends object = {}> = BaseTreeNode<T & {
  label?: string
}>

export type TreeRef = {
  forest: LinkTreeNode<TreeNode>[],
  setChecked: (data: TreeNode, checked: boolean) => void,
  setExpandNode: (data?: TreeNode, expand?: boolean) => void,
  clearChecked: () => void,
} | undefined

export type TreeLabelRender = (node: TreeNode) => React.ReactNode

export type TreeBaseProps = {
  className?: string,
  itemClassName?: string,
  style?: React.CSSProperties,
  data: TreeNode[],
  defaultExpandPath?: TreeValue[][],
  expandPath?: TreeValue[][],
  draggable?: boolean,
  showLine?: boolean,
  expandIcon?: React.ReactNode,
  draggleIcon?: React.ReactNode | boolean,
  virtualScroll?: VirtualScrollY,
  renderLabelIcon?: (node: TreeNode, isExpand?: boolean, isLeaf?: boolean) => React.ReactNode,
  renderExtra?: (parentPath: TreeValue[], parentNode?: TreeNode) => React.ReactNode | false,
  labelRender?: TreeLabelRender,
  loadData?: (node: TreeNode) => void,
  onExpand?: (expandPath: TreeValue[][], node: TreeNode, isExpand: boolean) => void,
  onCanMove?: (node: TreeNode, target: TreeNode, location: InnerLocation) => boolean,
  onMove?: (data: TreeNode[], node: TreeNode, target: TreeNode, location: InnerLocation) => void,
}

export type SingleTreeProps = TreeBaseProps & {
  defaultCheckedPath?: TreeValue[],
  checkedPath?: TreeValue[],
  onChecked?: (checkedPath: TreeValue[], node: TreeNode, isChecked: boolean) => void,
}

export type MultipleTreeProps = TreeBaseProps & {
  mode?: TreeMode,
  defaultCheckedPath?: TreeValue[][],
  checkedPath?: TreeValue[][],
  onChecked?: (checkedPath: TreeValue[][], node: TreeNode, isChecked: boolean) => void,
}