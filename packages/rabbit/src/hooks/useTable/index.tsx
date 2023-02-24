import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import classNames from 'classnames'
import { Column, TableHeadRow, TableRow, DataType, AccessorColumn, SortDir, TableCell, TableHeadCell } from './index.d'

import { generateHeaderAndFooter, generateBody, getHeadLastRowCells } from './utils'

import FilterTrigger from './filters/trigger'
import Sort from './sort'
import './filters/index.scss'

type Props<T extends DataType = DataType> = {
  columns: Column<T>[],
  data: T[],
  page?: PageConfig,
  tableWidth?: number,
  onFilter?: (filters: Record<string, Array<string>>, data: TableRow<T>[]) => void,
  onSort?: (sorter: SaveSort<T>[], data: TableRow<T>[]) => void,
}

export type SaveSort<T extends DataType> = {
  accessor: string,
  dir: SortDir,
  customSort?: (curRow: TableRow<T>, nextRow: TableRow<T>, dir: SortDir) => number
}

export type Col<T extends DataType> = {
  span: number,
  cell: TableHeadCell<T>,
  width?: number
}

export type PageConfig = {
  pageSize: number,
  page: number
}

export default function useTable<T extends DataType = DataType>({
  columns,
  data,
  page,
  tableWidth,
  onFilter,
  onSort,
}: Props<T>) {
  const [header, setHeader] = useState<TableHeadRow<T>[]>([])
  const [footer, setFooter] = useState<TableHeadRow<T>[]>([])
  const [body, setBody] = useState<TableRow<T>[]>([])
  const [filterMap, setFilterMap] = useState<Record<string, Array<string>>>({})
  const [sortList, setSortList] = useState<SaveSort<T>[]>([])

  const filterCounter = useRef({ pre: 0, cur: 0 })
  const sortCounter = useRef({ pre: 0, cur: 0 })
  const bodyRef = useRef<TableRow<T>[]>([])

  useEffect(() => {
    bodyRef.current = body
  }, [body])

  useEffect(() => {
    const { headRows, footRows } = generateHeaderAndFooter(columns)

    setHeader(headRows)
    setFooter(footRows)
  }, [columns])

  useEffect(() => {
    const bodyRows = generateBody(header, data)

    setBody(bodyRows)
  }, [header, data])

  const handleFilter = useCallback((column: AccessorColumn<T>, excludeIds: string[], filterValue: any) => {
    if (column.filter) {
      column.filter.filterValue = filterValue
    }
    setFilterMap((oldMap) => ({
      ...oldMap,
      [column.accessor]: excludeIds
    }))
    filterCounter.current.cur++
  }, [])

  const handleSort = useCallback((column: AccessorColumn<T>, dir: SortDir) => {
    if (column.sort) {
      column.sort.sortValue = dir
    }
    setSortList(oldSortList => {
      const index = oldSortList.findIndex(item => item.accessor === column.accessor)
      if (index !== -1) {
        oldSortList.splice(index, 1)
      }
      return [...oldSortList, { accessor: column.accessor, dir, customSort: column.sort?.customSort }]
    })
    sortCounter.current.cur++
  }, [])

  useEffect(() => {
    if (header.length === 0) return
    const headLastRowCell = getHeadLastRowCells(header)

    headLastRowCell.forEach(cell => {
      const column = cell.column as AccessorColumn<T>
      if (column.filter) {
        cell.renderFilter = (data) => (
          <FilterTrigger
            filter={column.filter}
            accessor={column.accessor}
            data={data}
            onFilter={(excludeIds, filterValue) => handleFilter(column, excludeIds, filterValue)}
          />
        )
      }
      if (column.sort) {
        if (column.sort.sortValue) {
          handleSort(column, column.sort.sortValue)
        }
        cell.renderSort = () => (
          <Sort
            sort={column.sort}
            onSort={(dir) => handleSort(column, dir)}
          />
        )
      }
    })
  }, [header])

  const cols = useMemo(() => {
    if (header.length === 0) return []
    const headLastRowCell = getHeadLastRowCells(header)
    
    const cols: Col<T>[] = []
    let fixedWidth = 0
    let leftSpan = 0
    headLastRowCell.forEach(cell => {
      const column = cell.column as AccessorColumn<T>
      fixedWidth += column.width || 0
      if (column.width === undefined) leftSpan += cell.colSpan
      cols.push({
        span: cell.colSpan,
        cell,
        width: column.width
      })
    })

    if (leftSpan && tableWidth && fixedWidth < tableWidth) {
      const leftWidth = tableWidth - fixedWidth
      const oneSpanWidth = leftWidth / leftSpan
      cols.forEach(col => {
        if (col.width === undefined) {
          col.width = oneSpanWidth * col.span
        }
      })
    }

    let leftSum = 0
    headLastRowCell.forEach((cell, index) => {
      cell.left = leftSum
      cell.width = cols[index]?.width || 0
      leftSum += cols[index]?.width || 0
    })

    headLastRowCell.forEach(cell => {
      let parent = cell.parent
      while (parent) {
        parent.left = parent.children?.[0]?.left || 0
        parent.width = parent.children?.reduce((total, cell) => total + (cell.width || 0), 0) || 0
        parent = parent.parent
      }
    })

    return cols
  }, [header, tableWidth])

  useEffect(() => {
    header.forEach(headerRow => {
      headerRow.cells.forEach((cell, index) => {
        if (cell.fixed) {
          cell.style = {
            ...cell.style,
            position: 'sticky',
            zIndex: 2,
            [cell.fixed]: cell.fixed === 'left' ? cell.left : (tableWidth ? tableWidth - (cell.left || 0) - (cell.width || 0) : 0)
          }
          if (cell.fixed === 'left' && !headerRow.cells[index + 1]?.fixed) {
            cell.className = classNames(cell.className, 'last-left-fixed')
          }
          if (cell.fixed === 'right' && !headerRow.cells[index - 1]?.fixed) {
            cell.className = classNames(cell.className, 'first-right-fixed')
          }
        }
      })
    })
  }, [header, cols, tableWidth])

  useEffect(() => {
    const footerLastRowCell = footer.length === 0 ? [] : getHeadLastRowCells(footer)
    let leftSum = 0
    footerLastRowCell.forEach((cell, index) => {
      cell.left = leftSum
      cell.width = cols[index]?.width || 0
      leftSum += cols[index]?.width || 0
    })

    footerLastRowCell.forEach(cell => {
      let parent = cell.parent
      while (parent) {
        parent.left = parent.children?.[0]?.left || 0
        parent.width = parent.children?.reduce((total, cell) => total + (cell.width || 0), 0) || 0
        parent = parent.parent
      }
    })

    footer.forEach(headerRow => {
      headerRow.cells.forEach((cell, index) => {
        if (cell.fixed) {
          cell.style = {
            ...cell.style,
            position: 'sticky',
            zIndex: 2,
            [cell.fixed]: cell.fixed === 'left' ? cell.left : (tableWidth ? tableWidth - (cell.left || 0) - (cell.width || 0) : 0)
          }
          if (cell.fixed === 'left' && !headerRow.cells[index + 1]?.fixed) {
            cell.className = classNames(cell.className, 'last-left-fixed')
          }
          if (cell.fixed === 'right' && !headerRow.cells[index - 1]?.fixed) {
            cell.className = classNames(cell.className, 'first-right-fixed')
          }
        }
      })
    })
  }, [footer, cols])

  const afterFilterBody = useMemo(() => {
    const excludeIds: string[] = []

    for (const key in filterMap) {
      excludeIds.push(...filterMap[key])
    }
    
    return body.filter(row => {
      return !excludeIds.includes(row.id)
    })
  }, [body, filterMap])

  const afterSortBody = useMemo(() => {
    return [...afterFilterBody].sort((cur, next) => {
      let base = 0
      for (let i = 0; i < sortList.length; i++) {
        const curSort = sortList[i]

        if (curSort.customSort) {
          base = curSort.customSort(cur, next, curSort.dir)
          if (base !== 0) break
        } else {
          if (curSort.dir === 'none') continue
          if (cur.data[curSort.accessor] === next.data[curSort.accessor]) continue

          const com = cur.data[curSort.accessor] < next.data[curSort.accessor] ? 1 : -1
          const dir = curSort.dir === 'asc' ? -1 : 1
          base = com * dir
          break
        }
      }
      return base
    })
  }, [afterFilterBody, sortList])

  const afterPageBody = useMemo(() => {
    if (!page) return afterSortBody

    return afterSortBody.slice(page.page * page.pageSize, (page.page + 1) * page.pageSize)
  }, [afterSortBody, page])

  const afterHandleBody = useMemo(() => {
    return afterPageBody.map((row, index) => {
      const cells: TableCell<T>[] = []
      row.cells.forEach(cell => {
        const column = cell.head.column as AccessorColumn<T>
        const cellCb = column.onCell?.(row as any, index)
        if (cellCb?.rowSpan !== 0 && cellCb?.colSpan !== 0) {
          cells.push({
            id: cell.id,
            rowSpan: cellCb?.rowSpan || 1,
            colSpan: cellCb?.colSpan || 1,
            content: cell.content,
            head: cell.head,
            className: classNames(
              cell.head.className?.includes('last-left-fixed') && 'last-left-fixed',
              cell.head.className?.includes('first-right-fixed') && 'first-right-fixed'
            ),
            style: {
              ...cellCb,
              ...(
                cell.head.fixed ?
                  {
                    position: 'sticky',
                    zIndex: 2,
                    [cell.head.fixed]: cell.head.style?.[cell.head.fixed]
                  } :
                  undefined
              )
            }
          })
        }
      })

      return { ...row, cells }
    })
  }, [afterPageBody])

  useEffect(() => {
    if (!onFilter || filterCounter.current.cur === filterCounter.current.pre) return
    
    filterCounter.current.pre = filterCounter.current.cur
    onFilter(filterMap, afterFilterBody)
  }, [filterMap, afterFilterBody, onFilter])

  useEffect(() => {
    if (!onSort || sortCounter.current.cur === sortCounter.current.pre) return

    sortCounter.current.pre = sortCounter.current.cur
    onSort(sortList, afterSortBody)
  }, [sortList, afterSortBody, onSort])

  return {
    header,
    footer,
    body,
    cols,
    afterHandleBody,
    afterFilterBody,
    afterFilterTotal: afterFilterBody.length
  }
}
