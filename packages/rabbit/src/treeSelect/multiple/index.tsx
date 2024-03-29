import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import MultipleTree from '../../tree/multiple'
import { TreeValue } from '../../hooks/useTree/type'
import { checkedPathToLinkPath } from '../../hooks/useTree/utils'
import { useMultipleTree } from '../../tree/context'
import useMultipleDisplay from '../../hooks/useMultipleDisplay'
import SearchPanel from './searchPanel'
import Popover from '../../popover'
import Input from '../../input'
import Icon from '../../icon'
import Tag from '../../tag'

import { PopoverRef } from '../../types/popover'
import { TreeNode } from '../../types/tree'
import { MultipleTreeSelectProps } from '../../types/treeSelect'

function defaultDisplayRender<T extends Object>(checkedPath: TreeNode<T>[][], onClose: (data: TreeNode<T>) => void) {
  return checkedPath.map((singlePath, index) => {
    const curLastNode = singlePath.pop()
    if (!curLastNode) return <></>

    return (
      <Tag
        className="multiple-display-tag"
        closable
        key={curLastNode.value}
        onClose={(e) => {
          onClose(curLastNode)
          e.stopPropagation()
        }}>
        {curLastNode.label || curLastNode.value}
      </Tag>
    )
  })
}

export default function MultipleTreeSelect<T extends Object>({
  style,
  className,
  popupClassName,
  popupStyle,
  offset,
  panelVisible,
  preventControlVisible,
  delay,
  hoverOpenDelay,
  placeholder,
  allowClear,
  disabled,
  showSearch,
  suffixIcon,
  placement,
  clearIcon,
  expandTrigger,
  defaultCheckedPath,
  checkedPath,
  onChecked,
  onChange,
  onPopoverVisibleChange,
  displayRender,

  itemClassName,
  data,
  defaultExpandPath,
  expandPath,
  draggable,
  showLine,
  expandIcon,
  draggleIcon,
  virtualScroll,
  renderLabelIcon,
  renderExtra,
  labelRender,
  loadData,
  onExpand,
  onCanMove,
  onMove,
  addNodePanelRender,
  updateNodePanelRender,
  removeNodePanelRender,

  ...extra
}: MultipleTreeSelectProps<T>) {
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [visible, setVisible] = useState(false)
  const popoverRef = useRef<PopoverRef>()
  const initRef = useRef(false)

  const { clearChecked, setChecked, linkForest, checkedPath: _checkedPath, changeCheckedPath } = useMultipleTree<TreeNode<T>>()

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      if (checkedPath === undefined) return
    }
    changeCheckedPath(checkedPath || [])
  }, [checkedPath])

  const _displayRender = useCallback(
    (checkedPath?: TreeValue[][]) => {
      if (!linkForest || !checkedPath) return

      const labels: string[][] = []
      const data: TreeNode<T>[][] = []
      const checkedLinkNodePath = checkedPathToLinkPath(true, checkedPath, linkForest)
      checkedLinkNodePath.forEach((linkPath) => {
        labels.push(linkPath.map((linkNode) => linkNode.data.label || `${linkNode.value}`))
        data.push(linkPath.map((linkNode) => linkNode.data))
      })

      return displayRender ? displayRender(labels, data) : defaultDisplayRender(data, onClose)

      function onClose(data: TreeNode<T>) {
        setChecked?.(data, false)
      }
    },
    [displayRender, setChecked, linkForest]
  )

  const { component, inputRef, searchText, setSearchText } = useMultipleDisplay({
    hasValue: _checkedPath.length > 0,
    showSearchInput: showSearchInput,
    children: _checkedPath.length > 0 ? _displayRender(_checkedPath) : placeholder,
  })

  const handleChecked = useCallback(
    (checkedPath: TreeValue[][], node: TreeNode<T>, isChecked: boolean) => {
      onChecked?.(checkedPath, node, isChecked)
      onChange?.(checkedPath)
    },
    [onChecked, onChange]
  )

  const handleChangeVisible = useCallback(
    (visible: boolean) => {
      setVisible(visible)
      onPopoverVisibleChange?.(visible)

      if (!showSearch) return
      setShowSearchInput(visible)
      if (visible) {
        inputRef.current?.focus()
      } else {
        setSearchText('')
      }
    },
    [showSearch, onPopoverVisibleChange]
  )

  useEffect(() => {
    if (panelVisible === undefined) return

    handleChangeVisible(panelVisible)
  }, [panelVisible, handleChangeVisible])

  useEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        popoverRef.current?.forceUpdate()
      })
    })
  }, [_checkedPath])

  if (disabled) {
    return (
      <Input
        {...extra}
        placeholder={placeholder}
        disabled
        style={style}
        className={classNames('rabbit-tree-select-wrapper', 'rabbit-component', className)}
        suffix={<span className="suffix">{suffixIcon || <Icon type="arrowDown" />}</span>}
      />
    )
  }

  return (
    <div
      {...extra}
      className={classNames(
        'rabbit-tree-select-wrapper is-multiple',
        'rabbit-component',
        visible && 'is-focus',
        allowClear && _checkedPath.length && 'allow-clear',
        className
      )}
      style={style}>
      <Popover
        ref={popoverRef}
        visible={visible}
        offset={offset}
        preventControlVisible={preventControlVisible}
        delay={delay}
        hoverOpenDelay={hoverOpenDelay}
        placement={placement}
        className={popupClassName}
        style={popupStyle}
        widthFollowTarget
        arrow="none"
        trigger={expandTrigger}
        onVisibleChange={handleChangeVisible}
        content={
          showSearchInput && searchText ? (
            <SearchPanel
              searchText={searchText}
              onChecked={handleChecked}
            />
          ) : (
            <MultipleTree
              onChecked={onChecked}
              itemClassName={itemClassName}
              data={data}
              defaultExpandPath={defaultExpandPath}
              expandPath={expandPath}
              draggable={draggable}
              showLine={showLine}
              expandIcon={expandIcon}
              draggleIcon={draggleIcon}
              virtualScroll={virtualScroll}
              renderLabelIcon={renderLabelIcon}
              renderExtra={renderExtra}
              labelRender={labelRender}
              loadData={loadData}
              onExpand={onExpand}
              onCanMove={onCanMove}
              onMove={onMove}
              addNodePanelRender={addNodePanelRender}
              updateNodePanelRender={updateNodePanelRender}
              removeNodePanelRender={removeNodePanelRender}
            />
          )
        }>
        {component}
      </Popover>
      <span className="tree-select-icon">
        <span className="tree-select-arrow">
          {suffixIcon || (
            <Icon
              className={classNames('icon-arrow-down-fill')}
              type={showSearchInput ? 'search' : 'arrowDownFill'}
            />
          )}
        </span>
        <span
          className="tree-select-clear"
          onClick={(e) => {
            clearChecked()
            e.stopPropagation()
          }}>
          {clearIcon || (
            <Icon
              className="tree-select-close"
              type="close"
            />
          )}
        </span>
      </span>
    </div>
  )
}
