import React, { useState, useEffect, useRef, useCallback } from 'react'

import { PaginationProps, PaginationItemRender } from '../types/pagination'

import SimplePagination from './simple'
import CommonPagination from './common'

import './index.scss'

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
  onPageSizeChange,
  ...extra
}: PaginationProps) {
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
    resetCurrent(Math.floor((currentRef.current * prePageSize) / pageSize))
  }, [pageSize])

  const resetCurrent = useCallback(
    (currentPage?: number) => {
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
    },
    [total]
  )

  const handleJumperBlur = useCallback(() => {
    if (jumperPage === undefined) return

    resetCurrent(jumperPage - 1)
    setJumperPage(undefined)
  }, [jumperPage])

  const handleJumperKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code !== 'Enter' || jumperPage === undefined) return

      resetCurrent(jumperPage - 1)
      setJumperPage(undefined)
    },
    [jumperPage]
  )

  const handleChangePage = useCallback((currentPage: number) => {
    if (disabled) return

    resetCurrent(currentPage)
  }, [])

  const handleChangePageSize = useCallback((pageSize?: number) => {
    if (pageSize === undefined || pageSize === pageSizeRef.current) return

    const prePageSize = pageSizeRef.current
    pageSizeRef.current = pageSize
    setPageSize(pageSize)
    onPageSizeChange?.(currentRef.current, pageSize)
    resetCurrent(Math.floor((currentRef.current * prePageSize) / pageSize))
  }, [])

  if (hideOnSinglePage && total <= _pageSize) {
    return <></>
  }

  if (simple) {
    return (
      <SimplePagination
        {...extra}
        disabled={disabled}
        className={className}
        style={style}
        itemRender={itemRender}
        current={_current}
        total={total}
        pageSize={_pageSize}
        onJumperPage={setJumperPage}
        onChangePage={handleChangePage}
        onJumperBlur={handleJumperBlur}
        onJumperKeyUp={handleJumperKeyUp}
      />
    )
  }

  return (
    <CommonPagination
      {...extra}
      disabled={disabled}
      className={className}
      style={style}
      itemRender={itemRender}
      current={_current}
      total={total}
      pageSize={_pageSize}
      pageSizeOptions={pageSizeOptions}
      showItemCount={showItemCount}
      showQuickJumper={showQuickJumper}
      jumperPage={jumperPage}
      showTotal={showTotal}
      onJumperPage={setJumperPage}
      onChangePage={handleChangePage}
      onJumperBlur={handleJumperBlur}
      onJumperKeyUp={handleJumperKeyUp}
      onChangePageSize={handleChangePageSize}
    />
  )
}
