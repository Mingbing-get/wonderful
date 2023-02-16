import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Column, DataType, TableRow } from '../hooks/useTable/index.d'

import Checkbox from '../checkbox'

function isSameArray<T extends any = any>(arr1: T[], arr2: T[]) {
  if (arr1.length !== arr2.length) return false

  return arr1.every(item => arr2.includes(item))
}

export type RowSelection<T extends DataType> = {
  title?: React.ReactNode,
  width?: number,
  hideSelectAll?: boolean,
  renderCell?: (checked: boolean, rowRecord: TableRow<T>, index: number, handleChecked: (checked: boolean) => void) => React.ReactNode,
  onCurPageSelectedChange?: (rowIds: string[], rows: TableRow<T>[]) => void,
  onAfterFilterSelectedChange?: (rowIds: string[], rows: TableRow<T>[]) => void,
  onAllSelectedChange?: (rowIds: string[], rows: TableRow<T>[]) => void
}

type Props<T extends DataType> = {
  rowSelection?: RowSelection<T>,
  columns: Column<T>[],
  data: T[],
  handleBody: React.MutableRefObject<TableRow<T>[]>,
  filterBody: React.MutableRefObject<TableRow<T>[]>,
  body: React.MutableRefObject<TableRow<T>[]>,
  reRenderTable?: (cb: (old: number) => number) => void,
}

export default function useTableRowSelection<T extends DataType>({
  rowSelection,
  columns,
  data,
  handleBody,
  filterBody,
  body,
  reRenderTable
}: Props<T>) {
  const checkedIdsRef = useRef<string[]>([])
  const preCheckedIdsRef = useRef<string[]>([])
  const prePageCheckedIdsRef = useRef<string[]>([])
  const preFilterCheckedIdsRef = useRef<string[]>([])

  const handleChangeChecked = useCallback((checked: boolean, id: string) => {
    if (checked) {
      if (checkedIdsRef.current.includes(id)) return
      checkedIdsRef.current = [...checkedIdsRef.current, id]
    } else {
      checkedIdsRef.current = checkedIdsRef.current.filter(item => item !== id)
    }
    reRenderTable?.(old => old + 1)
  }, [])

  const handleChangeCheckedAll = useCallback((checked: boolean) => {
    const currentIds = handleBody.current.map(row => row.id)
    if (checked) {
      checkedIdsRef.current = [...new Set([...checkedIdsRef.current, ...currentIds])]
    } else {
      checkedIdsRef.current = checkedIdsRef.current.filter(item => !currentIds.includes(item))
    }
    reRenderTable?.(old => old + 1)
  }, [])

  const isCheckedAll = useCallback(() => {
    if (handleBody.current.length === 0) return false
    return handleBody.current.every(row => checkedIdsRef.current.includes(row.id))
  }, [])

  const isCheckedHalf = useCallback(() => {
    if (handleBody.current.length === 0) return false
    return handleBody.current.some(row => checkedIdsRef.current.includes(row.id))
  }, [])

  useEffect(() => {
    if (!rowSelection?.onCurPageSelectedChange) return

    const currentPageSelectedRows = handleBody.current.filter(row => checkedIdsRef.current.includes(row.id))
    const currentPageSelectedRowIds = currentPageSelectedRows.map(row => row.id)

    if (isSameArray(prePageCheckedIdsRef.current, currentPageSelectedRowIds)) return
    prePageCheckedIdsRef.current = [...currentPageSelectedRowIds]
    
    rowSelection.onCurPageSelectedChange(currentPageSelectedRowIds, currentPageSelectedRows)
  }, [handleBody.current, checkedIdsRef.current, rowSelection?.onCurPageSelectedChange])

  useEffect(() => {
    if (!rowSelection?.onAfterFilterSelectedChange) return

    const afterFilterSelectedRows = filterBody.current.filter(row => checkedIdsRef.current.includes(row.id))
    const afterFilterSelectedRowIds = afterFilterSelectedRows.map(row => row.id)

    if (isSameArray(preFilterCheckedIdsRef.current, afterFilterSelectedRowIds)) return
    preFilterCheckedIdsRef.current = [...afterFilterSelectedRowIds]

    rowSelection.onAfterFilterSelectedChange(afterFilterSelectedRowIds, afterFilterSelectedRows)
  }, [filterBody.current, checkedIdsRef.current, rowSelection?.onAfterFilterSelectedChange])

  useEffect(() => {
    if (!rowSelection?.onAllSelectedChange) return

    if (isSameArray(checkedIdsRef.current, preCheckedIdsRef.current)) return
    preCheckedIdsRef.current = [...checkedIdsRef.current]

    const selectedRows = body.current.filter(row => checkedIdsRef.current.includes(row.id))
    rowSelection.onAllSelectedChange([...checkedIdsRef.current], selectedRows)
  }, [body.current, checkedIdsRef.current, rowSelection?.onAllSelectedChange])

  const { data: selectionData, columns: selectionColumns } = useMemo(() => {
    if (!rowSelection) return { columns, data }

    const column: Column<T> = {
      Header: 1,
      accessor: '_table_selection_accessor',
      width: rowSelection.width || 40,
      fixed: 'left',
      renderHeaderCell: () => (
        <span>
          {!rowSelection.hideSelectAll && (
            <Checkbox
              checked={isCheckedAll()}
              halfChecked={isCheckedHalf()}
              onChange={handleChangeCheckedAll}
            />
          )}
          {rowSelection.title}
        </span>
      ),
      renderCell: (row, cell, index) => {
        const checked = checkedIdsRef.current.includes(row.id)

        if (rowSelection.renderCell) {
          return rowSelection.renderCell(checked, row, index, (checked) => {
            handleChangeChecked(checked, row.id)
          })
        }

        return <Checkbox
          checked={checked}
          onChange={checked => handleChangeChecked(checked, row.id)}
        />
      }
    }

    const newData = data.map(row => ({
      ...row,
      '_table_selection_accessor': 1
    }))

    return {
      columns: [column, ...columns],
      data: newData
    }
  }, [rowSelection, columns, data])

  return {
    selectionData,
    selectionColumns
  }
}
