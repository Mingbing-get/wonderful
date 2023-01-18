import React, { useMemo, useCallback, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'

import { isSame } from '../utils'
import useTree from '../hooks/useTree'
import useVirtualScroll from '../hooks/useVirtualScroll'
import { LinkTreeNode, BaseTreeNode, TreeValue, TreeMode } from '../hooks/useTree/index.d'

import Icon from '../icon'
import Checkbox from '../checkbox'

import useDragTree from './useDragTree'
import { BaseProps, TreeLabelRender } from './index'

type ChangeRecord = { node: TreeNode, res: boolean }

export type TreeNode = BaseTreeNode<{
  label?: string
}>

const defaultLabelRender: TreeLabelRender = (node) => node.label || node.value

export type Props = BaseProps & {
  mode?: TreeMode,
  defaultCheckedPath?: TreeValue[][],
  checkedPath?: TreeValue[][],
  onChecked?: (checkedPath: TreeValue[][], node: TreeNode, isChecked: boolean) => void,
}

export default function MultipleTree({
  className,
  itemClassName,
  style,
  data,
  defaultCheckedPath,
  checkedPath,
  defaultExpandPath,
  expandPath,
  draggable,
  showLine,
  expandIcon,
  draggleIcon = true,
  virtualScroll,
  mode = 'ordinary',
  renderLabelIcon,
  labelRender = defaultLabelRender,
  loadData,
  onChecked,
  onExpand,
  onCanMove,
  onMove
}: Props) {
  const hookCheckedPathRef = useRef<TreeValue[][]>([])
  const hookExpandPathRef = useRef<TreeValue[][]>([])
  const curCheckedRef = useRef<ChangeRecord>()
  const curExpandRef = useRef<ChangeRecord>()
  const deepRef = useRef(0)
  const expandHandleWidth = useRef(0)
  const draggleHandleWidth = useRef(0)
  const treeWrapperRef = useRef<HTMLDivElement>(null)

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
  } = useTree({
    multiple: true,
    forest: data,
    defaultCheckedPath: defaultCheckedPath,
    defaultExpandPath: defaultExpandPath,
    mode,
    loadData,
    onCanMove,
    onMove,
  })

  useEffect(() => {
    hookCheckedPathRef.current = hookCheckedPath

    if (curCheckedRef.current) {
      onChecked?.(hookCheckedPath, curCheckedRef.current.node, curCheckedRef.current.res)
      curCheckedRef.current = undefined
    }
  }, [hookCheckedPath, onChecked])

  useEffect(() => {
    hookExpandPathRef.current = hookExpandPath

    if (curExpandRef.current) {
      onExpand?.(hookExpandPath, curExpandRef.current.node, curExpandRef.current.res)
      curExpandRef.current = undefined
    }
  }, [hookExpandPath, onExpand])

  useEffect(() => {
    if (!checkedPath || isSame(checkedPath, hookCheckedPathRef.current)) return

    changeCheckedPath(checkedPath)
  }, [checkedPath])

  useEffect(() => {
    if (!expandPath || isSame(expandPath, hookExpandPathRef.current)) return

    changeExpandPath(expandPath)
  }, [expandPath])

  useEffect(() => {
    if (!treeWrapperRef.current) return

    const expandHandle = treeWrapperRef.current.getElementsByClassName('expand-handle')[0] as HTMLSpanElement
    if (expandHandle) {
      expandHandleWidth.current = expandHandle.offsetWidth
    }

    const draggleHandle = treeWrapperRef.current.getElementsByClassName('draggle-handle')[0] as HTMLSpanElement
    if (draggleHandle) {
      draggleHandleWidth.current = draggleHandle.offsetWidth
    }
  }, [treeWrapperRef.current, expandIcon, draggleIcon])

  const {
    dragTipStyle,
    handleDragOver,
    handleDragStart,
    handleDragLeave,
    handleDrop,
  } = useDragTree({
    expandHandleWidth: expandHandleWidth.current,
    draggleHandleWidth: draggleHandleWidth.current,
    canMove: hookCanMove,
    onMove: move
  })

  const toggleExpand = useCallback((linkNode: LinkTreeNode<TreeNode>) => {
    if (linkNode.disabled || linkNode.isLeft) return

    curExpandRef.current = { node: linkNode.data, res: !linkNode.isExpand }
    setExpandNode(linkNode.data, !linkNode.isExpand)
  }, [setExpandNode])

  const toggleChecked = useCallback((linkNode: LinkTreeNode<TreeNode>, checked: boolean) => {
    if (linkNode.disabled) return

    curCheckedRef.current = { node: linkNode.data, res: checked }
    setChecked(linkNode.data, checked)
  }, [setChecked])

  const renderOptions = useMemo(() => {
    deepRef.current = 0
    return getRenderOptions(linkForest, 0)

    function getRenderOptions(linkForest: LinkTreeNode<TreeNode>[], level: number) {
      deepRef.current = Math.max(level, deepRef.current)
      const options: React.ReactNode[] = []
      linkForest.forEach(linkNode => {
        options.push(
          <div
            style={{ marginLeft: `${level}rem` }}
            key={`${level}-${linkNode.value}`}
            className={classNames(
              'tree-item',
              itemClassName,
              linkNode.isExpand && 'is-expand',
              linkNode.isLeft && 'is-left',
              linkNode.disabled && 'is-disabled',
            )}
            draggable={draggable}
            onDragStart={e => handleDragStart(e, linkNode)}
            onDrop={e => handleDrop(e, linkNode)}
            onDragOver={e => handleDragOver(e, linkNode)}
            onDragLeave={handleDragLeave}
          >
            {
              draggable && draggleIcon && (
                <span className='draggle-handle'>
                  {
                    draggleIcon === true ?
                      <Icon type='draggle' /> :
                      draggleIcon
                  }
                </span>
              )
            }
            {
              linkNode.isLoading ?
                <Icon className='tree-item-loading-icon' type='loading' /> :
                <span className='expand-handle' onClick={() => toggleExpand(linkNode)}>
                  {expandIcon || <Icon className='tree-arrow-right' type='arrowRight' />}
                </span>
            }
            <Checkbox
              checked={linkNode.checked}
              halfChecked={linkNode.halfChecked}
              disabled={linkNode.disabled}
              onChange={checked => toggleChecked(linkNode, checked)}
            >
              ''
            </Checkbox>
            <span className='tree-item-label'>
              {renderLabelIcon && <span className='label-icon'>
                {renderLabelIcon(linkNode.data, linkNode.isExpand, linkNode.isLeft)}
              </span>}
              <span>{labelRender(linkNode.data)}</span>
            </span>
          </div>
        )

        if (linkNode.isExpand && linkNode.children) {
          options.push(...getRenderOptions(linkNode.children, level + 1))
        }
      })
      return options
    }
  }, [linkForest, toggleExpand, toggleChecked, labelRender, renderLabelIcon, expandIcon, itemClassName, draggable, draggleIcon])

  const {
    handleScroll,
    startShow,
    endShow,
    wrapperStyle,
    itemsStyle
  } = useVirtualScroll(renderOptions.length, virtualScroll)

  return (
    <div
      ref={treeWrapperRef}
      className={classNames('rabbit-tree-wrapper', className)}
      style={{ ...style, ...wrapperStyle }}
      onScroll={handleScroll}
    >
      {
        showLine && (
          <div className='tree-lines'>
            {new Array(deepRef.current).fill(0).map((_, index) => (
              <div
                key={index}
                className='tree-line'
                style={{ left: `calc(${index}rem + ${(draggleHandleWidth.current || expandHandleWidth.current) / 2}px)` }}
              />
            ))}
          </div>
        )
      }
      <div
        className='tree-items'
        style={itemsStyle}
      >
        {renderOptions.slice(startShow, endShow)}
      </div>
      {
        dragTipStyle && createPortal((
          <div className='tree-drag-tip' style={dragTipStyle}>
            <span className='circle'></span>
            <span className='line'></span>
          </div>
        ), document.body)
      }
    </div>
  )
}
