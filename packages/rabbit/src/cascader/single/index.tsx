import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import classNames from 'classnames'

import Icon from '../../icon'
import Popover from '../../popover'
import Panel from './panel'
import SearchPanel from './searchPanel'
import WithSearchTrigger from '../withSearchTrigger'

import useTree from '../../hooks/useTree'
import { LinkTreeNode, TreeValue } from '../../hooks/useTree/type'
import { checkedPathToLinkPath } from '../../hooks/useTree/utils'
import { isSame } from '../../utils'

import { CascaderOption, CascaderSingleProps, CascaderSingleDisplayRender, CascaderDropdownRender, CascaderNotFoundContent } from '../../types/cascader'
import { InputRef } from '../../types/input'

const defaultDisplayRender: CascaderSingleDisplayRender<any> = (labels, _) => labels.join(' / ')
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

export default function SingleCascader<T extends object>({
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
  displayRender = defaultDisplayRender,
  dropdownRender = defaultDropdownRender,
  notFoundContent = defaultNotFoundContent,
  onChange,
  loadData,
  onDropdownVisibleChange,
  onSearch,
  ...extra
}: CascaderSingleProps<T>) {
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [visiblePopover, setVisiblePopover] = useState(false)
  const [searchText, setSearchText] = useState('')
  const inputRef = useRef<InputRef>(null)
  const valueRef = useRef<TreeValue[]>([])
  const linkForestRef = useRef<LinkTreeNode<CascaderOption<T>>[]>([])

  const onChangeRef = useRef(onChange)
  const onSearchRef = useRef(onSearch)

  const { setChecked, setExpandNode, changeCheckedPath, clearChecked, linkForest, checkedPath } = useTree({
    multiple: false,
    expandSingle: true,
    mode,
    defaultCheckedPath: defaultValue,
    forest: options,
    loadData,
  })

  const checkedLinkNodePath = useMemo(() => {
    return checkedPathToLinkPath(false, checkedPath, linkForest)
  }, [checkedPath, linkForest])

  useEffect(() => {
    valueRef.current = checkedPath
    linkForestRef.current = linkForest
  }, [checkedPath, linkForest])

  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  useEffect(() => {
    if (!searchText) return

    onSearchRef?.current?.(searchText)
  }, [searchText])

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (!onChangeRef.current) return

    const values: TreeValue[] = []
    const checkedPath: CascaderOption<T>[] = []
    checkedLinkNodePath.forEach((linkNode) => {
      values.push(linkNode.value)
      checkedPath.push(linkNode.data)
    })

    onChangeRef.current(values, checkedPath)
  }, [checkedLinkNodePath])

  useEffect(() => {
    if (!value) return
    if (isSame(value, valueRef.current)) return

    changeCheckedPath?.(value)
  }, [value])

  const _displayRender = useCallback(
    (checkedLinkNodePath: LinkTreeNode<CascaderOption<T>>[]) => {
      const labels: string[] = []
      const checkedPath: CascaderOption<T>[] = []
      checkedLinkNodePath.forEach((linkNode) => {
        labels.push(linkNode.data.label || `${linkNode.value}`)
        checkedPath.push(linkNode.data)
      })
      return displayRender(labels, checkedPath)
    },
    [displayRender]
  )

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

  const handleChecked = useCallback(
    (data: CascaderOption<T>, checked: boolean, closePopover: boolean = true) => {
      setChecked(data, checked)
      closePopover && setVisiblePopover(false)
    },
    [setChecked]
  )

  if (disabled) {
    return (
      <div
        className={classNames('rabbit-cascader-wrapper rabbit-component', className)}
        {...extra}>
        <WithSearchTrigger
          disabled
          showPlaceholder={checkedLinkNodePath.length === 0}
          placeholder={placeholder}
          displayValue={_displayRender(checkedLinkNodePath)}
          suffixIcon={suffixIcon}
        />
      </div>
    )
  }

  return (
    <div
      className={classNames('rabbit-cascader-wrapper', 'rabbit-component', visiblePopover && 'is-focus', className)}
      {...extra}>
      <Popover
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
                  mode={mode}
                  setChecked={handleChecked}
                />,
                'search'
              )
            : dropdownRender(
                <Panel
                  linkForest={linkForest}
                  mode={mode}
                  expandIcon={expandIcon}
                  expandTrigger={expandTrigger}
                  setChecked={handleChecked}
                  setExpandNode={setExpandNode}
                />,
                'option'
              )
        }>
        <WithSearchTrigger
          allowClear={allowClear}
          showSearchInput={showSearchInput}
          showPlaceholder={checkedLinkNodePath.length === 0}
          placeholder={placeholder}
          displayValue={_displayRender(checkedLinkNodePath)}
          searchText={searchText}
          clearIcon={clearIcon}
          suffixIcon={suffixIcon}
          inputRef={inputRef}
          onChangeSearch={setSearchText}
          onClear={clearChecked}
        />
      </Popover>
    </div>
  )
}
