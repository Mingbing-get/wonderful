import { BaseTreeNode, TreeValue, InnerLocation, TreeMode } from '../hooks/useTree/type'
import { VirtualScrollY } from '../hooks/useVirtualScrollY'

export type TreeNode<T extends object = {}> = BaseTreeNode<
  T & {
    label?: string
  }
>

export type TreeLabelRender<T extends object> = (node: TreeNode<T>) => React.ReactNode

export interface AddNodePanelRenderProps<T extends Object> {
  refNode: TreeNode<T>
  path: TreeValue[]
  addNextSibling: (newNode: TreeNode<T>) => void
  addChild: (newNode: TreeNode<T>) => void
}

export interface UpdateNodePanelRenderProps<T extends Object> {
  refNode: TreeNode<T>
  path: TreeValue[]
  updateNode: (newNode: TreeNode<T>) => void
}

export interface RemoveNodePanelRenderProps<T extends Object> {
  refNode: TreeNode<T>
  path: TreeValue[]
  removeNode: () => void
}

export type TreeBaseProps<T extends object = {}> = {
  className?: string
  itemClassName?: string
  style?: React.CSSProperties
  data: TreeNode<T>[]
  defaultExpandPath?: TreeValue[][]
  expandPath?: TreeValue[][]
  draggable?: boolean
  showLine?: boolean
  expandIcon?: React.ReactNode
  draggleIcon?: React.ReactNode | boolean
  virtualScroll?: VirtualScrollY
  addNodePanelRender?: (props: AddNodePanelRenderProps<T>) => React.ReactNode
  updateNodePanelRender?: (props: UpdateNodePanelRenderProps<T>) => React.ReactNode
  removeNodePanelRender?: true | ((props: RemoveNodePanelRenderProps<T>) => React.ReactNode)
  renderLabelIcon?: (node: TreeNode<T>, isExpand?: boolean, isLeaf?: boolean) => React.ReactNode
  renderExtra?: (parentPath: TreeValue[], parentNode?: TreeNode<T>) => React.ReactNode | false
  labelRender?: TreeLabelRender<T>
  loadData?: (node: TreeNode<T>) => void
  onExpand?: (expandPath: TreeValue[][], node: TreeNode<T>, isExpand: boolean) => void
  onCanMove?: (node: TreeNode<T>, target: TreeNode<T>, location: InnerLocation) => boolean
  onMove?: (data: TreeNode<T>[], node: TreeNode<T>, target: TreeNode<T>, location: InnerLocation) => void
  onUpdateTree?: (data: TreeNode<T>[]) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'value' | 'defaultValue' | 'onChange'>

export type SingleTreeProps<T extends object = {}> = TreeBaseProps<T> & {
  defaultCheckedPath?: TreeValue[]
  checkedPath?: TreeValue[]
  disableSelect?: boolean
  onChecked?: (checkedPath: TreeValue[], node: TreeNode<T>, isChecked: boolean) => void
}

export type MultipleTreeProps<T extends object = {}> = TreeBaseProps<T> & {
  mode?: TreeMode
  defaultCheckedPath?: TreeValue[][]
  checkedPath?: TreeValue[][]
  onChecked?: (checkedPath: TreeValue[][], node: TreeNode<T>, isChecked: boolean) => void
}
