import React, { useState, useMemo, useCallback } from 'react'
import classNames from 'classnames'

import List, { LoadMore } from '../list'
import Checkbox from '../checkbox'
import Popover from '../popover'
import Icon from '../icon'
import Input from '../input'
import { VirtualScroll } from '../hooks/useVirtualScrollY'
import { TransferOptionType } from './index'
import './panel.scss'

type Props = {
  className?: string,
  style?: React.CSSProperties,
  options: TransferOptionType[],
  selectedValues: (number | string)[],
  showSearch?: boolean,
  showSelectAll?: boolean,
  title?: React.ReactNode,
  selectAllLabel?: React.ReactNode,
  selectInvertLabel?: React.ReactNode,
  loadMore?: LoadMore,
  virtualScroll?: VirtualScroll,
  filterOption?: (inputValue: string, option: TransferOptionType) => boolean,
  footerRender?: () => React.ReactNode,
  onSelectChange?: (changeOptions: TransferOptionType[], selected?: boolean) => void,
}

export default function Panel({
  className,
  style,
  options,
  selectedValues,
  showSearch,
  showSelectAll = true,
  title,
  selectAllLabel = '全选所有',
  selectInvertLabel = '反选所有',
  loadMore,
  virtualScroll,
  filterOption,
  footerRender,
  onSelectChange
}: Props) {
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState('')

  const footerNode = useMemo(() => {
    return footerRender?.()
  }, [footerRender])

  const selectedAll = useMemo(() => {
    return options.filter(option => !option.disabled).length <= selectedValues.length
  }, [options, selectedValues])

  const handleSelectedAll = useCallback(() => {
    setVisible(false)
    onSelectChange?.(options.filter(option => !option.disabled), true)
  }, [options, onSelectChange])

  const handleSelectedInvert = useCallback(() => {
    setVisible(false)
    onSelectChange?.(options.filter(option => !option.disabled && !selectedValues.includes(option.value)), true)
    onSelectChange?.(options.filter(option => !option.disabled && selectedValues.includes(option.value)), false)
  }, [options, selectedValues, onSelectChange])

  const handleChangeSelectedAll = useCallback((selectedAll: boolean) => {
    onSelectChange?.(options.filter(option => !option.disabled), selectedAll)
  }, [options, onSelectChange])

  const handleClickItem = useCallback((option: TransferOptionType) => {
    if (option.disabled) return

    onSelectChange?.([option], !selectedValues.includes(option.value))
  }, [onSelectChange, selectedValues])

  const listItems = useMemo(() => {
    const _options = options.filter(option => {
      return filterOption ?
        filterOption(searchText, option) :
        `${option.label || option.value}`.includes(searchText)
    })

    return _options.map(option => ({
      key: option.value,
      component: (
        <div
          onClick={() => handleClickItem(option)}
          className={classNames('transfer-panel-option', selectedValues.includes(option.value) && 'is-selected', option.disabled && 'is-disabled')}
        >
          <Checkbox className='transfer-checkbox' checked={selectedValues.includes(option.value)} disabled={option.disabled}/>
          <span>
            {option.label || option.value}
          </span>
        </div>
      )
    }))
  }, [options, selectedValues, searchText, filterOption, handleClickItem])

  return (
    <div className='transfer-panel-wrapper'>
      <div className='transfer-panel-header'>
        <div className='header-left'>
          {
            showSelectAll && (<>
              <Checkbox
                className='transfer-checkbox'
                checked={selectedAll}
                halfChecked={selectedValues.length !== 0}
                onChange={handleChangeSelectedAll}
              />
              <Popover
                visible={visible}
                onVisibleChange={setVisible}
                arrow='none'
                content={
                  <div className='change-selected-box'>
                    <div className='select-all' onClick={handleSelectedAll}>
                      {selectAllLabel}
                    </div>
                    <div className='select-invert' onClick={handleSelectedInvert}>
                      {selectInvertLabel}
                    </div>
                  </div>
                }
              >
                <Icon type='arrowDown' />
              </Popover>
            </>)
          }
          <span className='selected-tip'>
            {selectedValues.length}/{options.length}项
          </span>
        </div>
        <div className='header-right'>
          {title}
        </div>
      </div>
      <div className='transfer-panel-body'>
        {
          showSearch && (
            <Input
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              suffix={<Icon type='search' />}
            />
          )
        }
        <List
          className={className}
          style={style}
          items={listItems}
          loadMore={loadMore}
          virtualScroll={virtualScroll}
        />
      </div>
      {
        footerNode && (
          <div className='transfer-panel-footer'>
            {footerNode}
          </div>
        )
      }
    </div>
  )
}
