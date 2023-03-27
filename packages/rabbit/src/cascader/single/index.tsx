import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import classNames from 'classnames'

import Input from '../../input'
import Icon from '../../icon'
import Popover from '../../popover'
import Panel from './panel'
import SearchPanel from './searchPanel'

import useTree from '../../hooks/useTree'
import { LinkTreeNode, TreeValue } from '../../hooks/useTree/type'
import { checkedPathToLinkPath } from '../../hooks/useTree/utils'
import { isSame } from '../../utils'

import { CascaderOption, CascaderBaseProps, DropdownRender, NotFoundContent } from '../index'
import { InputRef } from 'rc-input'

export type DisplayRender = (labels: string[], checkedPath: CascaderOption[]) => React.ReactNode

type SingleProps = {
  defaultValue?: TreeValue[],
  value?: TreeValue[],
  onChange?: (value: TreeValue[], checkedPath: CascaderOption[]) => void,
  displayRender?: DisplayRender,
}

type Props = CascaderBaseProps & SingleProps

const defaultDisplayRender: DisplayRender = (labels, _) => labels.join(' / ')
const defaultDropdownRender: DropdownRender = (menus, _) => menus
const defaultNotFoundContent: NotFoundContent = () => (
  <div className='cascader-empty'>
    <Icon type='empty' style={{ fontSize: '4rem' }} />
    <p>无数据...</p>
  </div>
)

export default function SingleCascader({
  className,
  popupClassName,
  style,
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
}: Props) {
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [visiblePopover, setVisiblePopover] = useState(false)
  const [searchText, setSearchText] = useState('')
  const inputRef = useRef<InputRef>(null)
  const valueRef = useRef<TreeValue[]>([])
  const linkForestRef = useRef<LinkTreeNode<CascaderOption>[]>([])

  const {
    setChecked,
    setExpandNode,
    changeCheckedPath,
    clearChecked,
    linkForest,
    checkedPath,
  } = useTree({
    multiple: false,
    expandSingle: true,
    mode,
    defaultCheckedPath: defaultValue,
    forest: options,
    loadData
  })

  const checkedLinkNodePath = useMemo(() => {
    return checkedPathToLinkPath(false, checkedPath, linkForest)
  }, [checkedPath, linkForest])

  useEffect(() => {
    valueRef.current = checkedPath
    linkForestRef.current = linkForest
  }, [checkedPath, linkForest])

  useEffect(() => {
    if (!searchText) return

    onSearch?.(searchText)
  }, [searchText, onSearch])

  useEffect(() => {
    if (!onChange) return

    const values: TreeValue[] = []
    const checkedPath: CascaderOption[] = []
    checkedLinkNodePath.forEach(linkNode => {
      values.push(linkNode.value)
      checkedPath.push(linkNode.data)
    })

    onChange(values, checkedPath)
  }, [checkedLinkNodePath, onChange])

  useEffect(() => {
    if (!value) return
    if (isSame(value, valueRef.current)) return

    changeCheckedPath?.(value)
  }, [value])

  const _displayRender = useCallback((checkedLinkNodePath: LinkTreeNode<CascaderOption>[]) => {
    const labels: string[] = []
    const checkedPath: CascaderOption[] = []
    checkedLinkNodePath.forEach(linkNode => {
      labels.push(linkNode.data.label || `${linkNode.value}`)
      checkedPath.push(linkNode.data)
    })
    return displayRender(labels, checkedPath)
  }, [displayRender])

  const handleChangeVisible = useCallback((visible: boolean) => {
    setVisiblePopover(visible)
    onDropdownVisibleChange?.(visible)

    if (!showSearch) return
    setShowSearchInput(visible)
    if (visible) {
      inputRef.current?.focus()
    } else {
      setSearchText('')
    }
  }, [showSearch, onDropdownVisibleChange])

  const handleChecked = useCallback((data: CascaderOption, checked: boolean, closePopover: boolean = true) => {
    setChecked(data, checked)
    closePopover && setVisiblePopover(false)
  }, [setChecked])

  if (disabled) {
    return (
      <div
        className={classNames('rabbit-cascader-wrapper is-disabled', className)}
        style={style}
      >
        <div className={classNames('cascader-trigger')}>
          <div className={classNames('cascader-value', checkedLinkNodePath.length === 0 && 'show-placeholder')}>{
            checkedLinkNodePath.length > 0 ?
              _displayRender(checkedLinkNodePath) :
              placeholder
          }</div>
          <Input
            ref={inputRef}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <span className='cascader-icon'>
          <Icon className='cascader-arrow' type={showSearchInput ? 'search' : 'arrowDown'} />
        </span>
      </div>
    )
  }

  return (
    <div
      className={classNames('rabbit-cascader-wrapper', allowClear && 'allow-clear', className)}
      style={style}
    >
      <Popover
        arrow='none'
        className={popupClassName}
        style={popupStyle}
        trigger={expandTrigger}
        visible={visiblePopover}
        placement={placement}
        onVisibleChange={handleChangeVisible}
        content={
          linkForest.length === 0 ?
            notFoundContent() :
            ((showSearchInput && searchText) ?
              dropdownRender(<SearchPanel
                searchText={searchText}
                linkForest={linkForest}
                mode={mode}
                setChecked={handleChecked}
              />, 'search')
              :
              dropdownRender(<Panel
                linkForest={linkForest}
                mode={mode}
                expandIcon={expandIcon}
                expandTrigger={expandTrigger}
                setChecked={handleChecked}
                setExpandNode={setExpandNode}
              />, 'option'))
        }
      >
        <div className={classNames('cascader-trigger', showSearchInput && 'show-input')}>
          <div className={classNames('cascader-value', checkedLinkNodePath.length === 0 && 'show-placeholder')}>{
            checkedLinkNodePath.length > 0 ?
            _displayRender(checkedLinkNodePath) :
            placeholder
          }</div>
          <Input
            ref={inputRef}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onClickCapture={(e) => e.stopPropagation()}
          />
        </div>
      </Popover>
      <span className='cascader-icon'>
        <span className='cascader-arrow'>
          { suffixIcon || <Icon type={showSearchInput ? 'search' : 'arrowDown'} /> }
        </span>
        <span className='cascader-clear' onClick={(e) => { clearChecked(); e.stopPropagation() }}>
          { clearIcon || <Icon className='cascader-close' type='close' /> }
        </span>
      </span>
    </div>
  )
}
