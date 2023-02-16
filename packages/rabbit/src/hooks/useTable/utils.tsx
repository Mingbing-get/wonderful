import React from 'react'
import { Column, TableHeadRow, TableHeadCell, TableRow, TableCell, HeadColumn, DataType, AccessorColumn } from './index.d'

// body
export function generateBody<T extends DataType>(header: TableHeadRow<T>[], data: T[]) {
  if (header.length === 0) return []

  const bodyRow: TableRow<T>[] = data.map((row, index) => {
    const cells: TableCell<T>[] = []
    getHeadLastRowCells(header).forEach(head => {
      const column = head.column as AccessorColumn<T>
      
      cells.push({
        id: generateKey(),
        rowSpan: 1,
        colSpan: 1,
        content: row[column.accessor] === undefined ? <span>&nbsp;</span> : row[column.accessor],
        head: head,
      })
    })

    return {
      id: generateKey(),
      data: row,
      cells,
    }
  })

  return bodyRow
}

export function getHeadLastRowCells<T extends DataType>(headerRows: TableHeadRow<T>[]) {
  const headLastRowCells: TableHeadCell<T>[] = []
  headerRows[0].cells.forEach(cell => {
    let cells = [cell]
    while (true) {
      const newCells: TableHeadCell<T>[] = []
      let hasChildren = false
      cells.forEach(cell => {
        if (cell.children) {
          hasChildren = true
          newCells.push(...cell.children)
        } else {
          newCells.push(cell)
        }
      })
      cells = newCells
      if (!hasChildren) {
        break
      }
    }
    headLastRowCells.push(...cells)
  })
  return headLastRowCells
}

// header and footer
export function generateHeaderAndFooter<T extends DataType>(columns: Column<T>[]) {
  const cells = generateCells(columns)

  return unitCellsToRows(cells.cells, cells.maxDep)
}

type UnitCell<T extends DataType> = {
  head: React.ReactNode,
  foot?: React.ReactNode,
  rowSpan: number,
  colSpan: number,
  fixed?: 'left' | 'right',
  column: Column<T>,
  parent?: UnitCell<T>,
  children?: UnitCell<T>[],
  headCell?: TableHeadCell<T>,
  footCell?: TableHeadCell<T>,
}
function generateCells<T extends DataType>(columns: Column<T>[], parent?: UnitCell<T>) {
  const cells: UnitCell<T>[] = []
  let maxDep = 0

  columns.forEach(column => {
    const cell: UnitCell<T> = {
      rowSpan: column.rowSpan || 1,
      colSpan: column.colSpan || 1,
      head: column.Header,
      foot: column.Footer,
      fixed: column.fixed || parent?.fixed,
      column,
      parent,
    }
    if (isHeadColumn(column)) {
      const cellDep = generateCells(column.columns, cell)
      cell.children = cellDep.cells
      if (cellDep.maxDep > maxDep) { maxDep = cellDep.maxDep }

      if (cell.colSpan === 1) {
        cell.colSpan = cell.children.reduce((total, child) => total + child.colSpan, 0) || 1
      }
    } else {
      const dep = getDepFromLastChild(cell)
      if (dep > maxDep) { maxDep = dep }
    }
    cells.push(cell)
  })

  return { cells, maxDep }
}

function unitCellsToRows<T extends DataType>(cells: UnitCell<T>[], maxDep: number) {
  const headRows: TableHeadRow<T>[] = []
  let footRows: TableHeadRow<T>[] = []
  let _cells: UnitCell<T>[] = cells
  while (_cells.length > 0) {
    const newCell: UnitCell<T>[] = []
    _cells.forEach(cell => {
      if (cell.children) {
        newCell.push(...cell.children)
      } else {
        const dep = getDepFromLastChild(cell)
        if (dep < maxDep) cell.rowSpan = maxDep - dep + 1
      }
    })

    headRows.push({ cells: unitCellsToHeadCells(_cells, 'head'), id: generateKey() })
    footRows.push({ cells: unitCellsToHeadCells(_cells, 'foot'), id: generateKey() })
    _cells = newCell
  }
  // 挂载parent和children
  _cells = cells
  while (_cells.length > 0) {
    const newCell: UnitCell<T>[] = []
    _cells.forEach(cell => {
      if (cell.children) {
        newCell.push(...cell.children)
      }
      if (cell.headCell) {
        cell.headCell.parent = cell.parent?.headCell
        cell.headCell.children = cell.children?.reduce((total: TableHeadCell<T>[], child) => {
          child.headCell && total.push(child.headCell)
          return total
        }, [])
      }
      if (cell.footCell) {
        cell.footCell.parent = cell.parent?.footCell
        cell.footCell.children = cell.children?.reduce((total: TableHeadCell<T>[], child) => {
          child.footCell && total.push(child.footCell)
          return total
        }, [])
      }
    })
    _cells = newCell
  }
  // 检查footer是否需要删除 <span>&nbsp;</span>
  for (let i = footRows.length - 1; i >= 0; i--) {
    if (footRows[i].cells.some(cell => !!cell.content)) {
      footRows = footRows.slice(0, i + 1)
      break
    }
  }

  footRows.forEach(footRow => {
    footRow.cells.forEach(cell => {
      !cell.content && (cell.content = <span>&nbsp;</span>)
    })
  })
  return { headRows, footRows }
}

function unitCellsToHeadCells<T extends DataType>(cells: UnitCell<T>[], key: 'head' | 'foot') {
  const headCells: TableHeadCell<T>[] = []
  cells.forEach(cell => {
    const headCell: TableHeadCell<T> = {
      id: generateKey(),
      rowSpan: cell.rowSpan,
      colSpan: cell.colSpan,
      column: cell.column,
      content: cell[key] || '',
      fixed: cell.fixed
    }
    if (key === 'foot') {
      cell.footCell = headCell
    } else {
      cell.headCell = headCell
    }
    headCells.push(headCell)
  })
  return headCells
}

function getDepFromLastChild<T extends { rowSpan: number, parent?: T }>(cell: T) {
  let dep = 0
  let _cell: T | undefined = cell
  while (_cell) {
    dep += _cell.rowSpan
    _cell = _cell.parent
  }
  return dep
}

// public
export function generateKey() {
  return `${new Date().getTime()}-${Math.floor(Math.random() * 1000000)}-${Math.floor(Math.random() * 1000000)}`
}

export function findFixedCols<T extends DataType>(header: TableHeadRow<T>[]) {
  if (header.length === 0) return { leftCols: [], rightCols: [] }

  const leftCols: number[] = []
  const rightCols: number[] = []
  const headerLastRow = getHeadLastRowCells(header)
  headerLastRow.forEach((cell, index) => {
    if (cell.fixed === 'left') {
      leftCols.push(index)
    } else if (cell.fixed === 'right') {
      rightCols.push(index)
    }
  })

  return { leftCols, rightCols }
}

export function isHeadColumn<T extends DataType>(column: Column<T>): column is HeadColumn<T> {
  return !!(column as any).columns
}
