import { useRef, useState, useEffect, useCallback } from 'react'

import { BaseTreeNode, SingleProps, SingleReturn, MultipleProps, MultipleReturn, LinkTreeNode, TreeValue, InnerLocation } from './type'
import {
  baseForestToLinkForest,
  linkForestToBaseForest,
  changeCheckedAll,
  changeExpand,
  clearChecked,
  clearExpand,
  findLinkByProperty,
  changeChecked,
  linkPathToCheckedPath,
  getCheckedLinkPathFromLinkForest,
  getExpandLinkPathFromLinkForest,
  findLinkPath,
  setForestPropertyEffectSingleItem,
  canMove,
  move,
} from './utils'

type Props<T extends BaseTreeNode> = MultipleProps<T> | SingleProps<T>

type UseTreeReturn<T extends BaseTreeNode> = MultipleReturn<T> | SingleReturn<T>

export default function useTree<T extends BaseTreeNode>(props: SingleProps<T>): SingleReturn<T>
export default function useTree<T extends BaseTreeNode>(props: MultipleProps<T>): MultipleReturn<T>
export default function useTree<T extends BaseTreeNode>({
  forest,
  multiple = false, // 不是响应式的
  mode = 'ordinary', // 不是响应式的
  expandSingle,
  defaultCheckedPath,
  defaultExpandPath,
  loadData, // 不是响应式的
  onChange,
  onCanMove,
  onMove,
  onUpdateTree,
}: Props<T>): UseTreeReturn<T> {
  const [linkForest, setLinkForest] = useState<LinkTreeNode<T>[]>([])

  const checkedPathRef = useRef(defaultCheckedPath || [])
  const expandPathRef = useRef(defaultExpandPath || [])
  const linkForestRef = useRef<LinkTreeNode<T>[]>([])

  useEffect(() => {
    const newLinkForest = baseForestToLinkForest(forest, loadData)
    changeCheckedAll(multiple, mode, checkedPathRef.current, newLinkForest)
    changeExpand(expandPathRef.current, newLinkForest, loadData)
    setLinkForest(newLinkForest)
  }, [forest])

  useEffect(() => {
    linkForestRef.current = linkForest
  }, [linkForest])

  useEffect(() => {
    onChange?.(checkedPathRef.current as any[])
  }, [checkedPathRef.current])

  const changeCheckedPath = useCallback((checkedPath: TreeValue[] | TreeValue[][]) => {
    if (!linkForestRef.current.length) return

    clearChecked(linkForestRef.current)
    changeCheckedAll(multiple, mode, checkedPath, linkForestRef.current)
    setLinkForest([...linkForestRef.current])
    checkedPathRef.current = checkedPath
  }, [])

  const changeExpandPath = useCallback((expandPath: TreeValue[][]) => {
    if (!linkForestRef.current.length) return

    clearExpand(linkForestRef.current)
    changeExpand(expandPath, linkForestRef.current, loadData)
    setLinkForest([...linkForestRef.current])
    expandPathRef.current = expandPath
  }, [])

  const setChecked = useCallback((data: T, checked: boolean) => {
    const curLinkTreeNode = findLinkByProperty(linkForestRef.current, 'data', data)
    if (!curLinkTreeNode) return

    changeChecked(multiple, mode, linkForestRef.current, curLinkTreeNode, checked)
    checkedPathRef.current = linkPathToCheckedPath(multiple as any, getCheckedLinkPathFromLinkForest(multiple, mode, linkForestRef.current))
    setLinkForest([...linkForestRef.current])
  }, [])

  const setExpandNode = useCallback((data?: T, expand?: boolean) => {
    if (!data || expandSingle) {
      clearExpand(linkForestRef.current)
    }

    if (!data) {
      // 清除所有的展开
      expandPathRef.current = []
      setLinkForest([...linkForestRef.current])
      return
    }

    const curLinkTreeNode = findLinkByProperty(linkForestRef.current, 'data', data)
    if (!curLinkTreeNode) return

    const expandLinkPath = findLinkPath(curLinkTreeNode)
    if (!expand) {
      setForestPropertyEffectSingleItem([curLinkTreeNode], 'isExpand', false)
    } else {
      expandLinkPath.forEach((linkNode) => (linkNode.isExpand = true))
      curLinkTreeNode.children && setForestPropertyEffectSingleItem(curLinkTreeNode.children, 'isExpand', false)

      const lastLinkNode = expandLinkPath[expandLinkPath.length - 1]
      if (lastLinkNode && !lastLinkNode.isLeft && !lastLinkNode.children) {
        loadData?.(lastLinkNode.data)
        lastLinkNode.isLoading = true
      }
    }
    expandPathRef.current = linkPathToCheckedPath(true, getExpandLinkPathFromLinkForest(linkForestRef.current))
    setLinkForest([...linkForestRef.current])
  }, [])

  const _clearChecked = useCallback(() => {
    clearChecked(linkForestRef.current)
    checkedPathRef.current = []
    setLinkForest([...linkForestRef.current])
  }, [])

  const _canMove = useCallback(
    (node: LinkTreeNode<T>, target: LinkTreeNode<T>, location: InnerLocation) => {
      return canMove(linkForestRef.current, node, target, location) && onCanMove?.(node.data, target.data, location) !== false
    },
    [onCanMove]
  )

  const _move = useCallback(
    (node: LinkTreeNode<T>, target: LinkTreeNode<T>, location: InnerLocation) => {
      move(linkForestRef.current, multiple, node, target, location)
      checkedPathRef.current = linkPathToCheckedPath(multiple as any, getCheckedLinkPathFromLinkForest(multiple, mode, linkForestRef.current))
      expandPathRef.current = linkPathToCheckedPath(true, getExpandLinkPathFromLinkForest(linkForestRef.current))

      setLinkForest([...linkForestRef.current])
      onMove?.(linkForestToBaseForest(linkForestRef.current), node.data, target.data, location)
      onUpdateTree?.(linkForestToBaseForest(linkForestRef.current))
    },
    [onMove, onUpdateTree]
  )

  const addSibling = useCallback((refNode: LinkTreeNode<T>, newNode: T) => {
    const newLinkNode = baseForestToLinkForest([newNode], loadData)[0]
    const parentNode = refNode.parent

    if (parentNode?.children) {
      const index = parentNode.children.findIndex((item) => item.value === refNode.value)
      parentNode.data.children?.splice(index + 1, 0, newNode)
      newLinkNode.parent = parentNode
      parentNode.children.splice(index + 1, 0, newLinkNode)
      changeChecked(multiple, mode, linkForestRef.current, newLinkNode, false)
    } else {
      const index = linkForestRef.current.findIndex((item) => item.value === refNode.value)
      linkForestRef.current.splice(index + 1, 0, newLinkNode)
    }

    setLinkForest([...linkForestRef.current])
    onUpdateTree?.(linkForestToBaseForest(linkForestRef.current))
  }, [])

  const addChild = useCallback((refNode: LinkTreeNode<T>, newNode: T) => {
    const newLinkNode = baseForestToLinkForest([newNode], loadData)[0]
    refNode.data.children = [newNode, ...(refNode.data.children || [])]
    refNode.children = [newLinkNode, ...(refNode.children || [])]
    refNode.isLeft = false
    newLinkNode.parent = refNode
    changeChecked(multiple, mode, linkForestRef.current, newLinkNode, false)
    setLinkForest([...linkForestRef.current])
    onUpdateTree?.(linkForestToBaseForest(linkForestRef.current))
  }, [])

  const updateNode = useCallback((refNode: LinkTreeNode<T>, newNode: T) => {
    const newLinkNode = baseForestToLinkForest([newNode], loadData)[0]
    const parentNode = refNode.parent

    if (parentNode?.children) {
      const index = parentNode.children.findIndex((item) => item.value === refNode.value)
      parentNode.data.children?.splice(index, 1, newNode)
      parentNode.children.splice(index, 1, newLinkNode)
    } else {
      const index = linkForestRef.current.findIndex((item) => item.value === refNode.value)
      linkForestRef.current.splice(index, 1, newLinkNode)
    }

    setLinkForest([...linkForestRef.current])
    onUpdateTree?.(linkForestToBaseForest(linkForestRef.current))
  }, [])

  return {
    linkForest,
    checkedPath: checkedPathRef.current as any[],
    expandPath: expandPathRef.current,
    changeCheckedPath,
    changeExpandPath,
    setChecked,
    setExpandNode,
    clearChecked: _clearChecked,
    canMove: _canMove,
    move: _move,
    addSibling,
    addChild,
    updateNode,
  }
}
