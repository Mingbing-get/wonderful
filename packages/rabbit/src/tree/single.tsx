import React, { useMemo, useCallback, useRef } from 'react'

import useVirtualScrollY from '../hooks/useVirtualScrollY'
import { LinkTreeNode } from '../hooks/useTree/type'

import TreeNodeRender from './components/treeNodeRender'
import TreeExtraRender from './components/treeExtraRender'
import TreeWrapper from './components/treeWrapper'
import { useSingleTree } from './context'
import useDragTree from './useDragTree'
import useResponseTree from './useResponseTree'
import { SingleTreeProps, TreeNode } from '../types/tree'

export default function SingleTree<T extends Object>({
  itemClassName,
  checkedPath,
  expandPath,
  draggable,
  expandIcon,
  draggleIcon = true,
  virtualScroll,
  disableSelect,
  renderLabelIcon,
  renderExtra,
  addNodePanelRender,
  updateNodePanelRender,
  labelRender,
  onChecked,
  onExpand,

  data,
  defaultChecked,
  defaultCheckedPath,
  defaultExpandPath,
  onUpdateTree,
  onMove,
  onCanMove,
  loadData,
  ...extra
}: SingleTreeProps<T>) {
  const deepRef = useRef(0)

  const {
    linkForest,
    checkedPath: hookCheckedPath,
    expandPath: hookExpandPath,
    setChecked,
    setExpandNode,
    changeCheckedPath,
    changeExpandPath,
    canMove: hookCanMove,
    move,
    addChild,
    addSibling,
    updateNode,
  } = useSingleTree<TreeNode<T>>()

  const { curCheckedRef, curExpandRef, expandHandleWidth, draggleHandleWidth, treeWrapperRef } = useResponseTree({
    hookCheckedPath,
    hookExpandPath,
    checkedPath,
    expandPath,
    expandIcon,
    draggleIcon,

    onChecked,
    onExpand,
    changeCheckedPath,
    changeExpandPath,
  })

  const { dragTipStyle, handleDragOver, handleDragStart, handleDragLeave, handleDrop } = useDragTree({
    expandHandleWidth: expandHandleWidth.current,
    draggleHandleWidth: draggleHandleWidth.current,
    canMove: hookCanMove,
    onMove: move,
  })

  const toggleExpand = useCallback(
    (linkNode: LinkTreeNode<TreeNode<T>>) => {
      if (linkNode.disabled || linkNode.isLeft) return

      curExpandRef.current = { node: linkNode.data, res: !linkNode.isExpand }
      setExpandNode(linkNode.data, !linkNode.isExpand)
    },
    [setExpandNode]
  )

  const toggleChecked = useCallback(
    (linkNode: LinkTreeNode<TreeNode<T>>) => {
      if (linkNode.disabled || disableSelect) return

      curCheckedRef.current = { node: linkNode.data, res: !linkNode.checked }
      setChecked(linkNode.data, !linkNode.checked)
    },
    [setChecked, disableSelect]
  )

  const renderOptions = useMemo(() => {
    deepRef.current = 0
    return getRenderOptions(linkForest, 0)

    function getRenderOptions(linkForest: LinkTreeNode<TreeNode<T>>[], level: number, parentNode?: LinkTreeNode<TreeNode<T>>) {
      deepRef.current = Math.max(level, deepRef.current)
      const options: React.ReactNode[] = []
      linkForest.forEach((linkNode) => {
        options.push(
          <TreeNodeRender
            key={`${level}-${linkNode.value}`}
            level={level}
            linkNode={linkNode}
            className={itemClassName}
            draggable={draggable}
            draggleIcon={draggleIcon}
            expandIcon={expandIcon}
            renderLabelIcon={renderLabelIcon}
            labelRender={labelRender}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onToggleChecked={toggleChecked}
            onToggleExpand={toggleExpand}
            addNodePanelRender={addNodePanelRender}
            updateNodePanelRender={updateNodePanelRender}
            addChild={addChild}
            addSibling={addSibling}
            updateNode={updateNode}
          />
        )

        if (linkNode.isExpand && linkNode.children) {
          options.push(...getRenderOptions(linkNode.children, level + 1, linkNode))
        }
      })

      options.push(
        <TreeExtraRender
          key={`extra-${level}-${parentNode?.value || 'first'}`}
          level={level}
          className={itemClassName}
          parentNode={parentNode}
          draggable={draggable}
          draggleIcon={draggleIcon}
          expandIcon={expandIcon}
          renderExtra={renderExtra}
        />
      )

      return options
    }
  }, [
    linkForest,
    toggleExpand,
    toggleChecked,
    labelRender,
    renderLabelIcon,
    renderExtra,
    addNodePanelRender,
    updateNodePanelRender,
    expandIcon,
    itemClassName,
    draggable,
    draggleIcon,
    addChild,
    addSibling,
    updateNode,
  ])

  const { handleScroll, startShow, endShow, wrapperStyle, itemsStyle } = useVirtualScrollY(renderOptions.length, virtualScroll)

  return (
    <TreeWrapper
      ref={treeWrapperRef}
      wrapperStyle={wrapperStyle}
      itemsStyle={itemsStyle}
      dragTipStyle={dragTipStyle}
      deep={deepRef.current}
      renderItems={renderOptions.slice(startShow, endShow)}
      lineOffset={(draggleHandleWidth.current || expandHandleWidth.current) / 2}
      onScroll={handleScroll}
      {...extra}
    />
  )
}
