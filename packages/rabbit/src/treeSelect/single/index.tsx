import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

import SingleTree from '../../tree/single'
import WithSearchTrigger from '../../cascader/withSearchTrigger'
import SingleSearchPanel from './searchPanel'
import { checkedPathToLinkPath } from '../../hooks/useTree/utils'
import { useSingleTree } from '../../tree/context'
import Popover from '../../popover'
import Input from '../../input'
import Icon from '../../icon'

import { TreeNode } from '../../types/tree'
import { SingleTreeSelectProps } from '../../types/treeSelect'
import { InputRef } from '../../types/input'

export default function SingleTreeSelect<T extends Object>({
  style,
  className,
  popupClassName,
  popupStyle,
  offset,
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
}: SingleTreeSelectProps<T>) {
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const initRef = useRef(false)

  const onChangeRef = useRef(onChange)

  const { linkForest, clearChecked, checkedPath: _checkedPath, changeCheckedPath } = useSingleTree<TreeNode<T>>()

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      if (checkedPath === undefined) return
    }
    changeCheckedPath(checkedPath || [])
  }, [checkedPath])

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange, onChecked])

  useEffect(() => {
    if (!onChangeRef.current) return

    onChangeRef.current(_checkedPath)
  }, [_checkedPath])

  const inputValue = useMemo(() => {
    if (!linkForest || !_checkedPath) return ''

    const linkPath = checkedPathToLinkPath(false, _checkedPath, linkForest)
    if (displayRender) {
      return displayRender(
        _checkedPath,
        linkPath.map((linkNode) => linkNode.data)
      )
    }

    return linkPath.map((linkNode) => linkNode.data.label || linkNode.value).join(' / ')
  }, [_checkedPath, linkForest, displayRender])

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
    [onPopoverVisibleChange]
  )

  if (disabled) {
    return (
      <Input
        {...extra}
        value={inputValue}
        placeholder={placeholder}
        disabled
        style={style}
        className={classNames('rabbit-tree-select-wrapper', 'rabbit-component', className)}
        suffix={<span className="suffix">{suffixIcon || <Icon type="arrowDown" />}</span>}
      />
    )
  }

  return (
    <Popover
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
          <SingleSearchPanel
            mode="unlink"
            searchText={searchText}
            onChecked={onChecked}
          />
        ) : (
          <SingleTree
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
      <WithSearchTrigger
        {...extra}
        className={classNames('rabbit-tree-select-wrapper', visible && 'is-focus', className)}
        style={style}
        allowClear={allowClear}
        showSearchInput={showSearchInput}
        showPlaceholder={!inputValue}
        placeholder={placeholder}
        displayValue={inputValue}
        searchText={searchText}
        clearIcon={clearIcon}
        suffixIcon={suffixIcon}
        inputRef={inputRef}
        onChangeSearch={setSearchText}
        onClear={clearChecked}
      />
    </Popover>
  )
}
