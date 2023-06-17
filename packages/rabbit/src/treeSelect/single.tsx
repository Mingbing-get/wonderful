import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

import SingleTree from '../tree/single'
import { TreeValue } from '../hooks/useTree/type'
import { checkedPathToLinkPath } from '../hooks/useTree/utils'
import Popover from '../popover'
import Input from '../input'
import Icon from '../icon'

import { TreeNode, TreeRef } from '../types/tree'
import { SingleTreeSelectProps } from '../types/treeSelect'

export default function SingleTreeSelect({
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
}: SingleTreeSelectProps) {
  const [visible, setVisible] = useState(false)
  const [_checkedPath, setCheckedPath] = useState(defaultCheckedPath || checkedPath || [])
  const treeRef = useRef<TreeRef>()
  const initRef = useRef(false)

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      if (checkedPath === undefined) return
    }
    setCheckedPath(checkedPath || [])
  }, [checkedPath])

  const inputValue = useMemo(() => {
    if (!treeRef.current || !_checkedPath) return ''

    const linkPath = checkedPathToLinkPath(false, _checkedPath, treeRef.current.forest)
    if (displayRender) {
      return displayRender(
        _checkedPath,
        linkPath.map((linkNode) => linkNode.data)
      )
    }

    return linkPath.map((linkNode) => linkNode.data.label || linkNode.value).join(' / ')
  }, [_checkedPath, displayRender])

  const handleChecked = useCallback(
    (checkedPath: TreeValue[], node: TreeNode, isChecked: boolean) => {
      setCheckedPath(checkedPath)
      onChecked?.(checkedPath, node, isChecked)
      onChange?.(checkedPath)
    },
    [onChecked, onChange]
  )

  const handleClear = useCallback(() => {
    treeRef.current?.clearChecked()
    setCheckedPath([])
    onChange?.([])
  }, [onChange])

  const handleChangeVisible = useCallback(
    (visible: boolean) => {
      setVisible(visible)
      onPopoverVisibleChange?.(visible)
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
        <SingleTree
          ref={treeRef}
          defaultCheckedPath={_checkedPath}
          onChecked={handleChecked}
          {...extra}
        />
      }>
      <Input
        value={inputValue}
        placeholder={placeholder}
        readOnly
        style={style}
        className={classNames('rabbit-tree-select-wrapper', 'rabbit-component', allowClear && _checkedPath.length && 'can-clear', className)}
        suffix={
          <>
            {<span className="suffix">{suffixIcon || <Icon type="arrowDown" />}</span>}
            {allowClear && (
              <span
                className="clear"
                onClickCapture={handleClear}>
                {clearIcon || <Icon type="close" />}
              </span>
            )}
          </>
        }
      />
    </Popover>
  )
}
