import { BaseTreeNode, TreeValue, InnerLocation, LinkTreeNode, TreeMode } from '../hooks/useTree/type'
import { VirtualScrollY } from '../hooks/useVirtualScrollY'

export type TreeNode<T extends object = {}> = BaseTreeNode<
  T & {
    label?: string
  }
>

export type TreeRef<T extends object = {}> =
  | {
      forest: LinkTreeNode<TreeNode<T>>[]
      setChecked: (data: TreeNode<T>, checked: boolean) => void
      setExpandNode: (data?: TreeNode<T>, expand?: boolean) => void
      clearChecked: () => void
    }
  | undefined

export type TreeLabelRender<T extends object> = (node: TreeNode<T>) => React.ReactNode

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
  renderLabelIcon?: (node: TreeNode<T>, isExpand?: boolean, isLeaf?: boolean) => React.ReactNode
  renderExtra?: (parentPath: TreeValue[], parentNode?: TreeNode<T>) => React.ReactNode | false
  labelRender?: TreeLabelRender<T>
  loadData?: (node: TreeNode<T>) => void
  onExpand?: (expandPath: TreeValue[][], node: TreeNode<T>, isExpand: boolean) => void
  onCanMove?: (node: TreeNode<T>, target: TreeNode<T>, location: InnerLocation) => boolean
  onMove?: (data: TreeNode<T>[], node: TreeNode<T>, target: TreeNode<T>, location: InnerLocation) => void
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
