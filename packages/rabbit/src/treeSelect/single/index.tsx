import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

import SingleTree from '../../tree/single'
import WithSearchTrigger from '../../cascader/withSearchTrigger'
import SingleSearchPanel from './searchPanel'
import { TreeValue } from '../../hooks/useTree/type'
import { checkedPathToLinkPath } from '../../hooks/useTree/utils'
import { useSingleTree } from '../../tree/context'
import Popover from '../../popover'
import Input from '../../input'
import Icon from '../../icon'

import { TreeNode } from '../../types/tree'
import { SingleTreeSelectProps } from '../../types/treeSelect'
import { InputRef } from 'rc-input'

export default function SingleTreeSelect({
  style,
  className,
  popupClassName,
  popupStyle,
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
  ...extra
}: SingleTreeSelectProps) {
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const initRef = useRef(false)

  const { linkForest, clearChecked, checkedPath: _checkedPath, changeCheckedPath } = useSingleTree<TreeNode>()

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      if (checkedPath === undefined) return
    }
    changeCheckedPath(checkedPath || [])
  }, [checkedPath])

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

  const handleChecked = useCallback(
    (checkedPath: TreeValue[], node: TreeNode, isChecked: boolean) => {
      onChecked?.(checkedPath, node, isChecked)
      onChange?.(checkedPath)
    },
    [onChecked, onChange]
  )

  const handleClear = useCallback(() => {
    clearChecked?.()
    onChange?.([])
  }, [onChange, clearChecked])

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
          />
        ) : (
          <SingleTree
            onChecked={handleChecked}
            {...extra}
          />
        )
      }>
      <WithSearchTrigger
        className={classNames('rabbit-tree-select-wrapper', className)}
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
        onClear={handleClear}
      />
    </Popover>
  )
}
