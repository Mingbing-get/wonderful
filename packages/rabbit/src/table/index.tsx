import React, { useMemo } from 'react'
import classNames from 'classnames'
import { useTable, Column, ColumnGroup, useBlockLayout, useFlexLayout } from 'react-table'

import './index.scss'

type Props<T extends object> = {
  className?: string,
  style?: React.CSSProperties,
  columns: Column<T>[],
  data: T[]
}

export default function Table<T extends object>({
  className,
  style,
  columns,
  data
}: Props<T>) {
  const hasFooter = useMemo(() => {
    const stack = [...columns]
    while (stack.length > 0) {
      const current = stack.pop()
      if (!current) return false

      if (current.Footer) return true

      stack.push(...((current as ColumnGroup<T>)?.columns || []))
    }

    return false
  }, [columns])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data
  }, useBlockLayout, useFlexLayout)

  return (
    <table {...getTableProps()} border={1} className={classNames('rabbit-table-wrapper', className)} style={style}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
                {/* <div
                  {...column.getResizerProps()}
                  className={`resizer ${
                    column.isResizing ? 'isResizing' : ''
                  }`}
                /> */}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
      {
        hasFooter && (
          <tfoot>
            {footerGroups.map(group => (
              <tr {...group.getFooterGroupProps()}>
                {group.headers.map(column => (
                  <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                ))}
              </tr>
            ))}
          </tfoot>
        )
      }
    </table>
  )
}
