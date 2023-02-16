import React, { useState, useEffect, useRef, useMemo } from 'react'
import classNames from 'classnames'

import Select, { OptionType } from '../select'
import InputNumber from '../inputNumber'
import Icon from '../icon'
import './index.scss'

export type PaginationItemType = 'page' | 'prev' | 'next' | 'ellipsis'
type PaginationItemRender = (page: number, type: PaginationItemType, originalElement: React.ReactNode) => React.ReactNode

export type Props = {
  className?: string,
  style?: React.CSSProperties,
  total: number,
  defaultCurrent?: number,
  defaultPageSize?: number,
  current?: number,
  pageSize?: number,
  pageSizeOptions?: number[],
  showItemCount?: number,
  disabled?: boolean,
  hideOnSinglePage?: boolean,
  showQuickJumper?: boolean,
  simple?: boolean,
  itemRender?: PaginationItemRender,
  showTotal?: (total: number, range: [number, number]) => React.ReactNode,
  onChange?: (current: number, pageSize: number) => void,
  onPageSizeChange?: (current: number, pageSize: number) => void,
}

const defaultItemRender: PaginationItemRender = (_, __, originalElement) => originalElement

export default function Pagination({
  className,
  style,
  total,
  defaultCurrent,
  defaultPageSize,
  current,
  pageSize,
  pageSizeOptions,
  showItemCount = 5,
  disabled,
  hideOnSinglePage,
  showQuickJumper,
  simple,
  itemRender = defaultItemRender,
  showTotal,
  onChange,
  onPageSizeChange
}: Props) {
  const [jumperPage, setJumperPage] = useState<number>()
  const [_current, setCurrent] = useState(defaultCurrent || current || 0)
  const [_pageSize, setPageSize] = useState(defaultPageSize || pageSize || 10)
  const currentRef = useRef(defaultCurrent || current || 0)
  const pageSizeRef = useRef(defaultPageSize || pageSize || 10)

  useEffect(() => {
    if (current === undefined || current === currentRef.current) return

    resetCurrent(current)
  }, [current])

  useEffect(() => {
    if (!pageSize || pageSize <= 0 || pageSize === pageSizeRef.current) return

    const prePageSize = pageSizeRef.current
    pageSizeRef.current = pageSize
    setPageSize(pageSize)
    resetCurrent(Math.floor(currentRef.current * prePageSize / pageSize))
  }, [pageSize])

  const items = useMemo(() => {
    if (simple) return []

    const items: React.ReactNode[] = []
    const maxPage = Math.ceil(total / _pageSize) - 1
    const hasFirstPage = _current === Math.ceil(showItemCount / 2)
    const hasPreEllipse = _current > Math.ceil(showItemCount / 2)
    const hasLastPage = maxPage - _current === Math.ceil(showItemCount / 2)
    const hasNextEllipse = maxPage - _current > Math.ceil(showItemCount / 2)

    if (hasFirstPage || hasPreEllipse) {
      items.push(<span className='pagination-item' key={0} onClick={() => handleChangePage(0)}>{itemRender(0, 'page', <span className='pagination-page-btn'>1</span>)}</span>)
    }
    if (hasPreEllipse) {
      items.push(<span className='pagination-ellipsis-btn' key='ellipsis-prev'>{itemRender(-1, 'ellipsis', <Icon type='ellipsis' />)}</span>)
    }

    const start = Math.max(_current - Math.floor((showItemCount - 1) / 2), 0)
    const end = Math.min(_current + Math.floor((showItemCount - 1) / 2), maxPage)
    for (let i = start; i <= end; i++) {
      items.push(<span className='pagination-item' key={i} onClick={() => handleChangePage(i)}>{itemRender(i, 'page', <span className={classNames('pagination-page-btn', i === _current && 'is-active')}>{i + 1}</span>)}</span>)
    }

    if (hasNextEllipse) {
      items.push(<span className='pagination-ellipsis-btn' key='ellipsis-next'>{itemRender(-1, 'ellipsis', <Icon type='ellipsis' />)}</span>)
    }
    if (hasLastPage || hasNextEllipse) {
      items.push(<span className='pagination-item' key={maxPage} onClick={() => handleChangePage(maxPage)}>{itemRender(maxPage, 'page', <span className='pagination-page-btn'>{maxPage + 1}</span>)}</span>)
    }

    return items
  }, [_current, _pageSize, total, showItemCount, itemRender])

  const _pageSizeOptions: OptionType<number>[] = useMemo(() => {
    if (!pageSizeOptions) return []

    return pageSizeOptions.map(item => ({
      value: item,
      label: `${item}条/页`
    }))
  }, [pageSizeOptions])

  const range: [number, number] = useMemo(() => {
    return [_current * _pageSize, Math.min((_current + 1) * _pageSize, total)]
  }, [_current, _pageSize, total])

  function resetCurrent(currentPage?: number) {
    if (currentPage === undefined) return

    const maxPage = Math.ceil(total / pageSizeRef.current) - 1
    let newCurrent = currentPage
    if (currentPage < 0) {
      newCurrent = 0
    } else if (maxPage < currentPage) {
      newCurrent = maxPage
    }

    if (newCurrent === currentRef.current) return
    currentRef.current = newCurrent
    setCurrent(newCurrent)
    onChange?.(newCurrent, pageSizeRef.current)
  }

  function handleChangePageSize(pageSize?: number) {
    if (pageSize === undefined || pageSize === pageSizeRef.current) return
    
    const prePageSize = pageSizeRef.current
    pageSizeRef.current = pageSize
    setPageSize(pageSize)
    onPageSizeChange?.(currentRef.current, pageSize)
    resetCurrent(Math.floor(currentRef.current * prePageSize / pageSize))
  }

  function handleJumperBlur() {
    if (jumperPage === undefined) return

    resetCurrent(jumperPage - 1)
    setJumperPage(undefined)
  }

  function handleJumperKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code !== 'Enter' || jumperPage === undefined) return
    
    resetCurrent(jumperPage - 1)
    setJumperPage(undefined) 
  }

  function handleChangePage(currentPage: number) {
    if (disabled) return

    resetCurrent(currentPage)
  }

  if (hideOnSinglePage && total <= _pageSize) {
    return <></>
  }

  if (simple) {
    return (
      <div className={classNames('rabbit-pagination-wrapper', disabled && 'is-disabled', className)} style={style}>
        <div onClick={() => handleChangePage(_current - 1)}>
          {
            itemRender(-1, 'prev', <div className='pagination-prev-btn'><Icon type='arrowLeft' /></div>)
          }
        </div>
        <InputNumber
          className='pagination-simple-input'
          showStepBtn={false}
          disabled={disabled}
          value={_current + 1}
          onChange={setJumperPage}
          onBlur={handleJumperBlur}
          onKeyUp={handleJumperKeyUp}
        />
        <span className='pagination-simple-text'>/</span>
        <span className='pagination-simple-text'>{Math.ceil(total / _pageSize)}</span>
        <div onClick={() => handleChangePage(_current + 1)}>
          {
            itemRender(-1, 'next', <div className='pagination-next-btn'><Icon type='arrowRight' /></div>)
          }
        </div>
      </div>
    )
  }

  return (
    <div className={classNames('rabbit-pagination-wrapper', disabled && 'is-disabled', className)} style={style}>
      {
        showTotal && (
          <div className='pagination-total'>
            {showTotal(total, range)}
          </div>
        )
      }
      <div onClick={() => handleChangePage(_current - 1)}>
        {
          itemRender(-1, 'prev', <div className='pagination-prev-btn'><Icon type='arrowLeft' /></div>)
        }
      </div>
      {items}
      <div onClick={() => handleChangePage(_current + 1)}>
        {
          itemRender(-1, 'next', <div className='pagination-next-btn'><Icon type='arrowRight' /></div>)
        }
      </div>
      {
        _pageSizeOptions.length > 0 && (
          <Select
            style={{ width: '5rem', minWidth: '5rem' }}
            value={_pageSize}
            options={_pageSizeOptions}
            onChange={handleChangePageSize}
            disabled={disabled}
          />
        )
      }
      {
        showQuickJumper && (
          <div className='pagination-quick-jumper'>
            跳至
            <InputNumber
              style={{ width: '3rem', minWidth: '3rem' }}
              showStepBtn={false}
              disabled={disabled}
              value={jumperPage}
              onChange={setJumperPage}
              onBlur={handleJumperBlur}
              onKeyUp={handleJumperKeyUp}
            />
            页
          </div>
        )
      }
    </div>
  )
}
