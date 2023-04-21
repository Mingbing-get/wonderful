import React from 'react'
import { BaseTreeNode, TreeValue, InnerLocation, LinkTreeNode } from '../hooks/useTree/type'

import { VirtualScrollY } from '../hooks/useVirtualScrollY'
import SingleTree from './single'
import MultipleTree from './multiple'
import './index.scss'

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

export type BaseProps = {
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

export {
  SingleTree,
  MultipleTree
}
