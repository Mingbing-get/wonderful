import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import classNames from 'classnames'

import Input from '../../input'
import Icon from '../../icon'
import Popover from '../../popover'
import Tag from '../../tag'
import Panel from './panel'
import SearchPanel from './searchPanel'

import useTree from '../../hooks/useTree'
import { LinkTreeNode, TreeValue } from '../../hooks/useTree/type'
import { checkedPathToLinkPath, linkPathToDataPath } from '../../hooks/useTree/utils'
import useMultipleDisplay from '../../hooks/useMultipleDisplay'
import { isSame } from '../../utils'

import { CascaderOption, CascaderMultipleProps, CascaderDropdownRender, CascaderNotFoundContent } from '../../types/cascader'
import { PopoverRef } from '../../types/popover'

const defaultDisplayRender = <T extends object>(checkedPath: CascaderOption<T>[][], onClose: (data: CascaderOption<T>) => void) => {
  return checkedPath.map((singlePath, index) => {
    const curLastNode = singlePath.pop()
    if (!curLastNode) return <></>

    return (
      <Tag
        className="multiple-display-tag"
        closable
        key={curLastNode?.value}
        onClose={(e) => {
          onClose(curLastNode)
          e.stopPropagation()
        }}>
        {curLastNode?.label || curLastNode?.value}
      </Tag>
    )
  })
}
const defaultDropdownRender: CascaderDropdownRender = (menus, _) => menus
const defaultNotFoundContent: CascaderNotFoundContent = () => (
  <div className="cascader-empty">
    <Icon
      type="empty"
      style={{ fontSize: '4rem' }}
    />
    <p>无数据...</p>
  </div>
)

export default function MultipleCascader<T extends object>({
  className,
  popupClassName,
  popupStyle,
  options,
  mode = 'ordinary',
  defaultValue,
  value,
  showSearch,
  allowClear = true,
  disabled,
  placeholder,
  expandTrigger = 'click',
  placement = 'bottom-start',
  clearIcon,
  expandIcon,
  suffixIcon,
  displayRender,
  dropdownRender = defaultDropdownRender,
  notFoundContent = defaultNotFoundContent,
  onChange,
  loadData,
  onDropdownVisibleChange,
  onSearch,
  ...extra
}: CascaderMultipleProps<T>) {
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [visiblePopover, setVisiblePopover] = useState(false)
  const valueRef = useRef<TreeValue[][]>([])
  const popoverRef = useRef<PopoverRef>()

  const { setChecked, setExpandNode, changeCheckedPath, clearChecked, linkForest, checkedPath } = useTree({
    multiple: true,
    expandSingle: true,
    mode,
    defaultCheckedPath: defaultValue,
    forest: options,
    loadData,
  })

  const checkedLinkNodePath = useMemo(() => {
    return checkedPathToLinkPath(true, checkedPath, linkForest)
  }, [checkedPath, linkForest])

  const _displayRender = useCallback(
    (checkedLinkNodePath: LinkTreeNode<CascaderOption<T>>[][]) => {
      const labels: string[][] = []
      const checkedPath: CascaderOption<T>[][] = []
      checkedLinkNodePath.forEach((linkPath) => {
        labels.push(linkPath.map((linkNode) => linkNode.data.label || `${linkNode.value}`))
        checkedPath.push(linkPath.map((linkNode) => linkNode.data))
      })

      return displayRender ? displayRender(labels, checkedPath) : defaultDisplayRender(checkedPath, onClose)

      function onClose(data: CascaderOption<T>) {
        setChecked(data, false)
      }
    },
    [displayRender, setChecked]
  )

  const { component, inputRef, searchText, setSearchText } = useMultipleDisplay({
    hasValue: checkedLinkNodePath.length > 0,
    showSearchInput,
    children: checkedLinkNodePath.length > 0 ? _displayRender(checkedLinkNodePath) : placeholder,
  })

  useEffect(() => {
    valueRef.current = checkedPath
  }, [checkedPath])

  useEffect(() => {
    if (!searchText) return

    onSearch?.(searchText)
  }, [searchText, onSearch])

  useEffect(() => {
    if (!onChange) return

    onChange(valueRef.current, linkPathToDataPath(true, checkedLinkNodePath))
  }, [checkedLinkNodePath, onChange])

  useEffect(() => {
    if (!value) return
    if (isSame(value, valueRef.current)) return

    changeCheckedPath?.(value)
  }, [value])

  useEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        popoverRef.current?.forceUpdate()
      })
    })
  }, [checkedLinkNodePath])

  const handleChangeVisible = useCallback(
    (visible: boolean) => {
      setVisiblePopover(visible)
      onDropdownVisibleChange?.(visible)

      if (!showSearch) return
      setShowSearchInput(visible)
      if (visible) {
        inputRef.current?.focus()
      } else {
        setSearchText('')
      }
    },
    [showSearch, onDropdownVisibleChange]
  )

  if (disabled) {
    return (
      <div
        className={classNames('rabbit-cascader-wrapper rabbit-component is-disabled', className)}
        {...extra}>
        <div className={classNames('cascader-trigger')}>
          <div className={classNames('cascader-value', checkedLinkNodePath.length === 0 && 'show-placeholder')}>
            {checkedLinkNodePath.length > 0 ? _displayRender(checkedLinkNodePath) : placeholder}
          </div>
          <Input
            value={searchText}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <span className="cascader-icon">
          <Icon
            className="cascader-arrow"
            type={showSearchInput ? 'search' : 'arrowDown'}
          />
        </span>
      </div>
    )
  }

  return (
    <div
      className={classNames('rabbit-cascader-wrapper rabbit-component', visiblePopover && 'is-focus', allowClear && 'allow-clear', className)}
      {...extra}>
      <Popover
        ref={popoverRef}
        arrow="none"
        className={popupClassName}
        style={popupStyle}
        trigger={expandTrigger}
        visible={visiblePopover}
        placement={placement}
        onVisibleChange={handleChangeVisible}
        content={
          linkForest.length === 0
            ? notFoundContent()
            : showSearchInput && searchText
            ? dropdownRender(
                <SearchPanel
                  searchText={searchText}
                  linkForest={linkForest}
                  setChecked={setChecked}
                />,
                'search'
              )
            : dropdownRender(
                <Panel
                  linkForest={linkForest}
                  mode={mode}
                  expandIcon={expandIcon}
                  expandTrigger={expandTrigger}
                  setChecked={setChecked}
                  setExpandNode={setExpandNode}
                />,
                'option'
              )
        }>
        {component}
      </Popover>
      <span className="cascader-icon">
        <span className="cascader-arrow">
          {suffixIcon || (
            <Icon
              className={classNames('icon-arrow-down-fill')}
              type={showSearchInput ? 'search' : 'arrowDownFill'}
            />
          )}
        </span>
        <span
          className="cascader-clear"
          onClick={(e) => {
            clearChecked()
            e.stopPropagation()
          }}>
          {clearIcon || (
            <Icon
              className="cascader-close"
              type="close"
            />
          )}
        </span>
      </span>
    </div>
  )
}
