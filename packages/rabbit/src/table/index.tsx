import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

import Loading from '../loading'
import Pagination from '../pagination'
import useTable, { PageConfig } from '../hooks/useTable'
import { DataType, TableRow, AccessorColumn } from '../hooks/useTable/type'
import useResize from '../hooks/useResize'
import useSyncScrollX from '../hooks/useSyncScrollX'
import useVirtualScrollY from '../hooks/useVirtualScrollY'
import useTableRowSelection from '../hooks/useTableRowSelection'
import { TableProps } from '../types/table'

import './index.scss'

export default function Table<T extends DataType = DataType>({
  className,
  rowClassName,
  style,
  columns,
  data,
  pagination,
  scroll,
  virtualScrollY,
  loading,
  rowSelection,
  onRow,
  onHeaderRow,
  onFooterRow,
  onFilter,
  onSort,
  ...extra
}: TableProps<T>) {
  const [page, setPage] = useState<PageConfig>()
  const [renderTableCount, reRenderTable] = useState(0)
  const [syncScrollXDomList, setSyncScrollXDomList] = useState<(HTMLDivElement | null)[]>([])
  const headerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const handleBodyRef = useRef<TableRow<T>[]>([])
  const filterBodyRef = useRef<TableRow<T>[]>([])
  const _bodyRef = useRef<TableRow<T>[]>([])

  const { width, domRef: factWidthDom } = useResize<HTMLDivElement>()
  const { scrollX } = useSyncScrollX(syncScrollXDomList)

  const { selectionData, selectionColumns } = useTableRowSelection({
    rowSelection,
    data,
    columns,
    handleBody: handleBodyRef,
    filterBody: filterBodyRef,
    body: _bodyRef,
    reRenderTable,
  })

  const { header, footer, body, cols, afterHandleBody, afterFilterBody, afterFilterTotal } = useTable({
    columns: selectionColumns,
    data: selectionData,
    page,
    tableWidth: width,
    onFilter,
    onSort,
  })

  useEffect(() => {
    setSyncScrollXDomList([headerRef.current, bodyRef.current, footerRef.current])
  }, [headerRef.current, bodyRef.current, footerRef.current])

  useEffect(() => {
    if (!pagination) {
      setPage(undefined)
      return
    }

    setPage({
      page: pagination.total ? 0 : pagination.defaultCurrent || pagination.current || 0,
      pageSize: pagination.defaultPageSize || pagination.pageSize || 10,
    })
  }, [pagination])

  useEffect(() => {
    handleBodyRef.current = afterHandleBody
    setTimeout(() => {
      reRenderTable((old) => old + 1)
    })
  }, [afterHandleBody])

  useEffect(() => {
    filterBodyRef.current = afterFilterBody
  }, [afterFilterBody])

  useEffect(() => {
    _bodyRef.current = body
  }, [body])

  const handleChangePage = useCallback(
    (current: number, pageSize: number) => {
      if (!pagination) return

      setPage((oldPage) => {
        if (oldPage?.page === current) return oldPage

        return {
          page: pagination.total ? 0 : current,
          pageSize: oldPage?.pageSize || pageSize,
        }
      })
      pagination.onChange?.(current, pageSize)
    },
    [pagination]
  )

  const handleChangePageSize = useCallback(
    (current: number, pageSize: number) => {
      if (!pagination) return

      setPage((oldPage) => {
        if (oldPage?.pageSize === pageSize) return oldPage

        return {
          page: pagination.total ? 0 : oldPage?.page || current,
          pageSize,
        }
      })
      pagination.onChange?.(current, pageSize)
    },
    [pagination]
  )

  const { handleScroll, startShow, endShow, wrapperStyle, itemsStyle } = useVirtualScrollY(afterHandleBody.length, virtualScrollY)

  const afterSliceBody = useMemo(() => {
    return afterHandleBody.slice(startShow, endShow)
  }, [afterHandleBody, startShow, endShow])

  return (
    <div
      {...extra}
      className={classNames('rabbit-table-wrapper', 'rabbit-component', scroll?.x && 'can-scroll-x', scrollX && 'is-scroll-x', className)}
      ref={wrapperRef}
      style={style}>
      <div className="rabbit-table-content">
        <div
          className="fact-width-dom"
          ref={factWidthDom}
          style={{ width: scroll?.x }}
        />
        <div
          className="table-header scroll-hidden-bar"
          ref={headerRef}>
          <div>
            <table style={{ width: width }}>
              <colgroup>
                {cols.map((col, index) => (
                  <col
                    key={index}
                    width={col.width}
                    span={col.span}
                  />
                ))}
              </colgroup>
              <thead>
                {header.map((row, index) => (
                  <tr
                    {...onHeaderRow?.(row)}
                    className={rowClassName}
                    style={row.style}
                    key={row.id}>
                    {row.cells.map((cell) => (
                      <th
                        key={cell.id}
                        className={cell.className}
                        style={cell.style}
                        colSpan={cell.colSpan}
                        rowSpan={cell.rowSpan}>
                        <div className="t-header-cell cell">
                          <div className="table-head-content">{cell.column.renderHeaderCell?.(row, cell, index) || cell.content}</div>
                          {(cell.renderFilter || cell.renderSort) && (
                            <span className="table-control-wrapper">
                              {cell.renderFilter?.(body)}
                              {cell.renderSort?.()}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            </table>
          </div>
        </div>
        <div
          className="table-body scroll-hidden-bar"
          style={{ height: scroll?.y, ...wrapperStyle }}
          onScroll={handleScroll}
          ref={bodyRef}>
          <div style={itemsStyle}>
            <table style={{ width: width }}>
              <colgroup>
                {cols.map((col, index) => (
                  <col
                    key={index}
                    width={col.width}
                    span={col.span}
                  />
                ))}
              </colgroup>
              <tbody>
                {afterSliceBody.map((row, index) => (
                  <tr
                    {...onRow?.(row)}
                    className={rowClassName}
                    style={{ ...row.style, height: 'var(--tree-item-height)' }}
                    key={row.id}>
                    {row.cells.map((cell) => (
                      <th
                        key={cell.id}
                        className={cell.className}
                        style={cell.style}
                        colSpan={cell.colSpan}
                        rowSpan={cell.rowSpan}>
                        <div className="cell">{(cell.head.column as AccessorColumn<T>).renderCell?.(row, cell, index) || cell.content}</div>
                      </th>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="table-footer scroll-hidden-bar"
          ref={footerRef}>
          <div>
            <table style={{ width: width }}>
              <colgroup>
                {cols.map((col, index) => (
                  <col
                    key={index}
                    width={col.width}
                    span={col.span}
                  />
                ))}
              </colgroup>
              <tfoot>
                {footer.map((row, index) => (
                  <tr
                    {...onFooterRow?.(row)}
                    className={rowClassName}
                    style={row.style}
                    key={row.id}>
                    {row.cells.map((cell) => (
                      <th
                        key={cell.id}
                        className={cell.className}
                        style={cell.style}
                        colSpan={cell.colSpan}
                        rowSpan={cell.rowSpan}>
                        <div className="cell">{cell.column.renderFooterCell?.(row, cell, index) || cell.content}</div>
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      {pagination && (
        <Pagination
          className={classNames('table-pagination', pagination.className)}
          total={afterFilterTotal}
          {...pagination}
          onChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
        />
      )}
      {loading && (
        <div className="table-loading">
          <Loading size={4} />
        </div>
      )}
      <span className="table-re-render">{renderTableCount}</span>
    </div>
  )
}
