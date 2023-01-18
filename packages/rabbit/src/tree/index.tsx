import React from 'react'
import { BaseTreeNode, TreeValue, InnerLocation } from '../hooks/useTree/index.d'

import { VirtualScroll } from '../hooks/useVirtualScroll'
import SingleTree from './single'
import MultipleTree from './multiple'
import './index.scss'

export type TreeNode<T extends object = {}> = BaseTreeNode<T & {
  label?: string
}>

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
  virtualScroll?: VirtualScroll,
  renderLabelIcon?: (node: TreeNode, isExpand?: boolean, isLeaf?: boolean) => React.ReactNode,
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
