import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import MultipleTree from '../tree/multiple'
import { TreeValue } from '../hooks/useTree/type'
import { checkedPathToLinkPath } from '../hooks/useTree/utils'
import useMultipleDisplay from '../hooks/useMultipleDisplay'
import Popover from '../popover'
import Input from '../input'
import Icon from '../icon'
import Tag from '../tag'

import { PopoverRef } from '../types/popover'
import { TreeNode, TreeRef } from '../types/tree'
import { MultipleTreeSelectProps } from '../types/treeSelect'

const defaultDisplayRender = (checkedPath: TreeNode[][], onClose: (data: TreeNode) => void) => {
  return checkedPath.map((singlePath, index) => {
    const curLastNode = singlePath.pop()
    if (!curLastNode) return <></>

    return (
      <Tag
        className="multiple-display-tag"
        closable
        key={curLastNode.value}
        onCloseCapture={(e) => {
          onClose(curLastNode)
          e.stopPropagation()
        }}>
        {curLastNode.label || curLastNode.value}
      </Tag>
    )
  })
}

export default function MultipleTreeSelect({
  style,
  className,
  popupClassName,
  popupStyle,
  placeholder,
  allowClear,
  disabled,
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
}: MultipleTreeSelectProps) {
  const [visible, setVisible] = useState(false)
  const [_checkedPath, setCheckedPath] = useState(defaultCheckedPath || checkedPath || [])
  const treeRef = useRef<TreeRef>()
  const preTreeRef = useRef<TreeRef>()
  const popoverRef = useRef<PopoverRef>()
  const initRef = useRef(false)

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      if (checkedPath === undefined) return
    }
    setCheckedPath(checkedPath || [])
  }, [checkedPath])

  useEffect(() => {
    if (!treeRef.current) return
    preTreeRef.current = treeRef.current
  }, [treeRef.current])

  const _displayRender = useCallback(
    (checkedPath?: TreeValue[][]) => {
      const curTree = treeRef.current || preTreeRef.current
      if (!curTree || !checkedPath) return

      const labels: string[][] = []
      const data: TreeNode[][] = []
      const checkedLinkNodePath = checkedPathToLinkPath(true, checkedPath, curTree.forest)
      checkedLinkNodePath.forEach((linkPath) => {
        labels.push(linkPath.map((linkNode) => linkNode.data.label || `${linkNode.value}`))
        data.push(linkPath.map((linkNode) => linkNode.data))
      })

      return displayRender ? displayRender(labels, data) : defaultDisplayRender(data, onClose)

      function onClose(data: TreeNode) {
        curTree?.setChecked(data, false)
        setCheckedPath((checkedPath) => {
          return checkedPath.filter((singlePath) => {
            return data.value !== singlePath[singlePath.length - 1]
          })
        })
      }
    },
    [displayRender]
  )

  const { component } = useMultipleDisplay({
    hasValue: _checkedPath.length > 0,
    showSearchInput: false,
    children: _checkedPath.length > 0 ? _displayRender(_checkedPath) : placeholder,
  })

  const handleChecked = useCallback(
    (checkedPath: TreeValue[][], node: TreeNode, isChecked: boolean) => {
      setCheckedPath(checkedPath)
      onChecked?.(checkedPath, node, isChecked)
      onChange?.(checkedPath)
    },
    [onChecked, onChange]
  )

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      treeRef.current?.clearChecked()
      setCheckedPath([])
      onChange?.([])
    },
    [onChange]
  )

  const handleChangeVisible = useCallback(
    (visible: boolean) => {
      setVisible(visible)
      onPopoverVisibleChange?.(visible)
    },
    [onPopoverVisibleChange]
  )

  useEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        popoverRef.current?.resetVirtualElement()
        popoverRef.current?.update()
      })
    })
  }, [_checkedPath])

  if (disabled) {
    return (
      <Input
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
      className={classNames('rabbit-tree-select-wrapper is-multiple', 'rabbit-component', allowClear && _checkedPath.length && 'can-clear', className)}
      style={style}>
      <Popover
        ref={popoverRef}
        visible={visible}
        placement={placement}
        className={popupClassName}
        style={popupStyle}
        widthFollowTarget
        arrow="none"
        trigger={expandTrigger}
        onVisibleChange={handleChangeVisible}
        content={
          <MultipleTree
            ref={treeRef}
            defaultCheckedPath={_checkedPath}
            onChecked={handleChecked}
            {...extra}
          />
        }>
        {component}
      </Popover>
      <span className="suffix">{suffixIcon || <Icon type="arrowDown" />}</span>
      {allowClear && (
        <span
          className="clear"
          onClickCapture={handleClear}>
          {clearIcon || <Icon type="close" />}
        </span>
      )}
    </div>
  )
}
