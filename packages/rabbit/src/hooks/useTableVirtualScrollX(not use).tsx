import React, { useState, useCallback, useEffect } from 'react'
import useDebounceAndThrottle from './useDebounceAndThrottle'
import { TableHeadRow, TableRow, DataType } from './useTable/index.d'
import { Col } from './useTable'
import { findFixedCols } from './useTable/utils'
import { isSame } from '../utils'

type Props<T extends DataType> = {
  header: TableHeadRow<T>[],
  body: TableRow<T>[],
  cols: Col<T>[],
  viewWidth?: number,
}

type FixedCols = {
  leftCols: number[],
  rightCols: number[]
}

function isSameArray(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false

  return arr1.every(item => arr2.includes(item))
}

export default function useTableVirtualScrollX<T extends DataType>({
  header,
  body,
  cols,
  viewWidth
}: Props<T>) {
  const [scrollLeft, setScrollLeft] = useState(0)
  const [_body, setBody] = useState(body)
  const [showColSpanList, setShowColSpanList] = useState<number[]>([])
  const [fixedCols, setFixedCols] = useState<FixedCols>({ leftCols: [], rightCols: [] })

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return
    e.stopPropagation()

    setScrollLeft(e.currentTarget.scrollLeft)
  }, [])

  useEffect(() => {
    const fixedCols = findFixedCols(header)
    setFixedCols(old => {
      if (isSame(old, fixedCols)) return old
      return fixedCols
    })
  }, [header])

  useEffect(() => {
    if (!viewWidth) return

    const showColSpan: number[] = []
    let hiddenLeftWidth = scrollLeft
    let computedLeftWidth = 0
    let sumSpan = 0
    for (let index = 0; index < cols.length; index++) {
      const col = cols[index]
      sumSpan += col.span
      const isLeftFixed = fixedCols.leftCols.includes(index)
      const isRightFixed = fixedCols.rightCols.includes(index)
      if (!isLeftFixed) {
        hiddenLeftWidth -= (col.width || 0)
      }
      computedLeftWidth += (col.width || 0)
      let hidden = hiddenLeftWidth > 0 && !isLeftFixed && !isRightFixed
      if (hidden) continue

      showColSpan.push(sumSpan)
    }
    setShowColSpanList(oldSpanList => {
      if (isSameArray(oldSpanList, showColSpan)) return oldSpanList

      return showColSpan
    })
  }, [scrollLeft, cols, viewWidth, fixedCols])

  useEffect(() => {
    // 计算body
    const rowSpanMap: Record<number, number> = {}
    const newBody: TableRow<T>[] = []
    body.forEach(row => {
      let sumSpan = 0
      newBody.push({
        ...row,
        cells: row.cells.map((cell) => {
          if (rowSpanMap[sumSpan + 1]) {
            rowSpanMap[sumSpan + 1]--
          }
          sumSpan += cell.colSpan + (rowSpanMap[sumSpan] || 0)
          if (cell.rowSpan > 1) {
            new Array(cell.colSpan).fill(1).forEach((_, index) => {
              rowSpanMap[sumSpan - index] = cell.rowSpan - 1 + (rowSpanMap[sumSpan - index] || 0)
            })
          }
          return {
            ...cell,
            content: showColSpanList.some(item => Math.abs(item - sumSpan) < cell.colSpan) ? cell.content : <span>&nbsp;</span>
          }
        })
      })
    })

    setBody(newBody)
  }, [showColSpanList, body])

  return {
    vBody: _body,
    handleScroll: useDebounceAndThrottle(handleScroll)
  }
}
