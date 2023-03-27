export type TreeValue = string | number

export type TreeMode = 'ordinary' | 'canCheckedParent' | 'unlink'

export type InnerLocation = 'before' | 'after' | 'children'

export type BaseTreeNode<T extends object = {}> = {
  value: TreeValue,
  children?: BaseTreeNode<T>[],
  isLeft?: boolean,
  disabled?: boolean,
} & T

export type LinkTreeNode<T extends BaseTreeNode> = {
  value: TreeValue,
  data: T,
  parent?: LinkTreeNode<T>,
  children?: LinkTreeNode<T>[],
  isLeft?: boolean,
  disabled?: boolean,
  checked?: boolean,
  halfChecked?: boolean,
  isExpand?: boolean,
  isLoading?: boolean,
}

export type MultipleProps<T extends BaseTreeNode> = {
  forest: T[],
  mode?: TreeMode,
  multiple: true,
  expandSingle?: boolean,
  defaultCheckedPath?: TreeValue[][],
  defaultExpandPath?: TreeValue[][],
  loadData?: (node: T) => void,
  onChange?: (checkedPath: TreeValue[][]) => void,
  onMove?: (data: T[], node: T, target: T, location: InnerLocation) => void,
  onCanMove?: (node: T, target: T, location: InnerLocation) => boolean,
}

export type SingleProps<T extends BaseTreeNode> = {
  forest: T[],
  mode?: TreeMode,
  multiple?: false,
  expandSingle?: boolean,
  defaultCheckedPath?: TreeValue[],
  defaultExpandPath?: TreeValue[][],
  loadData?: (node: T) => void,
  onChange?: (checkedPath: TreeValue[]) => void,
  onMove?: (data: T[],node: T, target: T, location: InnerLocation) => void,
  onCanMove?: (node: T, target: T, location: InnerLocation) => boolean,
}

export type MultipleReturn<T extends BaseTreeNode> = {
  linkForest: LinkTreeNode<T>[],
  checkedPath: TreeValue[][],
  expandPath: TreeValue[][],
  setChecked: (data: T, checked: boolean) => void,
  setExpandNode: (data?: T, expand?: boolean) => void,
  changeExpandPath: (expandPath: TreeValue[][]) => void,
  changeCheckedPath: (checkedPath: TreeValue[][]) => void,
  clearChecked: () => void,
  move: (node: LinkTreeNode<T>, target: LinkTreeNode<T>, location: InnerLocation) => void,
  canMove: (node: LinkTreeNode<T>, target: LinkTreeNode<T>, location: InnerLocation) => boolean,
}

export type SingleReturn<T extends BaseTreeNode> = {
  linkForest: LinkTreeNode<T>[],
  checkedPath: TreeValue[],
  expandPath: TreeValue[][],
  setChecked: (data: T, checked: boolean) => void,
  setExpandNode: (data?: T, expand?: boolean) => void,
  changeExpandPath: (expandPath: TreeValue[][]) => void,
  changeCheckedPath: (checkedPath: TreeValue[]) => void,
  clearChecked: () => void,
  move: (node: LinkTreeNode<T>, target: LinkTreeNode<T>, location: InnerLocation) => void,
  canMove: (node: LinkTreeNode<T>, target: LinkTreeNode<T>, location: InnerLocation) => boolean,
}