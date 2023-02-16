import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import classNames from 'classnames'

import Input from '../../input'
import Icon from '../../icon'
import Popover, { PopoverRef } from '../../popover'
import Tag from '../../tag'
import Panel from './panel'
import SearchPanel from './searchPanel'

import useTree from '../../hooks/useTree'
import { LinkTreeNode, TreeValue } from '../../hooks/useTree/index.d'
import { checkedPathToLinkPath, linkPathToDataPath } from '../../hooks/useTree/utils'
import useMultipleDisplay from '../../hooks/useMultipleDisplay'
import { isSame } from '../../utils'

import { CascaderOption, CascaderBaseProps, DropdownRender, NotFoundContent } from '../index'

export type DisplayRender = (labels: string[][], checkedPath: CascaderOption[][]) => React.ReactNode

type MultipleProps = {
  defaultValue?: TreeValue[][],
  value?: TreeValue[][],
  onChange?: (value: TreeValue[][], checkedPath: CascaderOption[][]) => void,
  displayRender?: DisplayRender,
}

type Props = CascaderBaseProps & MultipleProps

const defaultDisplayRender = (checkedPath: CascaderOption[][], onClose: (data: CascaderOption) => void) => {
  return checkedPath.map((singlePath, index) => {
    const curLastNode = singlePath.pop()
    if (!curLastNode) return <></>

    return (
      <Tag className='multiple-display-tag' closable key={curLastNode?.value} onCloseCapture={(e) => { onClose(curLastNode); e.stopPropagation() }}>
        {curLastNode?.label || curLastNode?.value}
      </Tag>
    )
  })
}
const defaultDropdownRender: DropdownRender = (menus, _) => menus
const defaultNotFoundContent: NotFoundContent = () => (
  <div className='cascader-empty'>
    <Icon type='empty' style={{ fontSize: '4rem' }} />
    <p>无数据...</p>
  </div>
)

export default function MultipleCascader({
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
  displayRender,
  dropdownRender = defaultDropdownRender,
  notFoundContent = defaultNotFoundContent,
  onChange,
  loadData,
  onDropdownVisibleChange,
  onSearch,
}: Props) {
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [visiblePopover, setVisiblePopover] = useState(false)
  const valueRef = useRef<TreeValue[][]>([])
  const popoverRef = useRef<PopoverRef>()

  const {
    setChecked,
    setExpandNode,
    changeCheckedPath,
    clearChecked,
    linkForest,
    checkedPath,
  } = useTree({
    multiple: true,
    expandSingle: true,
    mode,
    defaultCheckedPath: defaultValue,
    forest: options,
    loadData
  })

  const checkedLinkNodePath = useMemo(() => {
    return checkedPathToLinkPath(true, checkedPath, linkForest)
  }, [checkedPath, linkForest])

  const _displayRender = useCallback((checkedLinkNodePath: LinkTreeNode<CascaderOption>[][]) => {
    const labels: string[][] = []
    const checkedPath: CascaderOption[][] = []
    checkedLinkNodePath.forEach(linkPath => {
      labels.push(linkPath.map(linkNode => linkNode.data.label || `${linkNode.value}`))
      checkedPath.push(linkPath.map(linkNode => linkNode.data))
    })

    return displayRender ? displayRender(labels, checkedPath) : defaultDisplayRender(checkedPath, onClose)

    function onClose(data: CascaderOption) {
      setChecked(data, false)
    }
  }, [displayRender, setChecked])

  const { component, inputRef, searchText, setSearchText } = useMultipleDisplay({
    hasValue: checkedLinkNodePath.length > 0,
    showSearchInput,
    children: checkedLinkNodePath.length > 0 ?
      _displayRender(checkedLinkNodePath) :
      placeholder
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
        popoverRef.current?.resetVirtualElement()
        popoverRef.current?.update()
      })
    })
  }, [checkedLinkNodePath])

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
            value={searchText}
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
        ref={popoverRef}
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
                setChecked={setChecked}
              />, 'search')
              :
              dropdownRender(<Panel
                linkForest={linkForest}
                mode={mode}
                expandIcon={expandIcon}
                expandTrigger={expandTrigger}
                setChecked={setChecked}
                setExpandNode={setExpandNode}
              />, 'option'))
        }
      >
        {component}
      </Popover>
      <span className='cascader-icon'>
        <span className='cascader-arrow'>
          {suffixIcon || <Icon type={showSearchInput ? 'search' : 'arrowDown'} />}
        </span>
        <span className='cascader-clear' onClick={(e) => { clearChecked(); e.stopPropagation() }}>
          {clearIcon || <Icon className='cascader-close' type='close' />}
        </span>
      </span>
    </div>
  )
}
