import React from 'react'

export type DataType = Record<string, any>

export type Column<T extends DataType = DataType> = HeadColumn<T> | AccessorColumn<T>

export type BaseColumn<T extends DataType> = {
  Header: React.ReactNode,
  Footer?: React.ReactNode,
  colSpan?: number,
  rowSpan?: number,
  fixed?: 'left' | 'right',
  renderHeaderCell?: (rowRecord: TableHeadRow<T>, cell: TableHeadCell<T>, index: number) => React.ReactNode,
  renderFooterCell?: (rowRecord: TableHeadRow<T>, cell: TableHeadCell<T>, index: number) => React.ReactNode,
}

export type HeadColumn<T extends DataType> = {
  columns: Column<T>[]
} & BaseColumn<T>

export type AccessorColumn<T extends DataType> = {
  accessor: string,
  width?: number,
  filter?: ColumnFilter<T>,
  data?: T[],
  onCell?: OnCellFn<T>,
  renderCell?: (rowRecord: TableRow<T>, cell: TableCell<T>, index: number) => React.ReactNode,
  sort?: ColumnSort<T>,
} & BaseColumn<T>

export type OnCellFn<T extends DataType> = (row: T, index: number) => (React.CSSProperties & {
  colSpan?: number,
  rowSpan?: number
}) | undefined

// filter----------------
export type ColumnFilter<T extends DataType, D extends any = any> = {
  render: FilterRender<T, D> | FilterType,
  icon?: React.ReactNode,
  filterValue?: D,
}

export type FilterRenderProps<T extends DataType, D extends any = any> = {
  data: TableRow<T>[],
  filterValue?: D,
  onFilter: (excludeIds: string[], filterValue: D) => void,
  closePopover: () => void,
  setEffect: (effect: boolean) => void,
}

export type FilterRender<T extends DataType, D extends any = any> = (props: FilterRenderProps<T, D>) => React.ReactElement

export type FilterType = 'text' | 'checkbox' | 'radio'

// sort-------------------------
export type ColumnSort<T extends DataType> = {
  render?: SortRender,
  sortValue?: SortDir,
  customSort?: (curRow: TableRow<T>, nextRow: TableRow<T>, dir: SortDir) => number
}

export type SortRenderProps = {
  sortValue?: SortDir,
  onSort: (value: SortDir) => void,
}

export type SortRender = (props: SortRenderProps) => React.ReactElement

export type SortDir = 'desc' | 'asc' | 'none'

// ----------------
export type TableHeadRow<T extends DataType> = {
  cells: TableHeadCell<T>[],
  style?: React.CSSProperties,
  id: string
}

export type TableHeadCell<T extends DataType> = {
  rowSpan: number,
  colSpan: number,
  content: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
  column: Column<T>,
  parent?: TableHeadCell<T>,
  children?: TableHeadCell<T>[],
  id: string,
  accessor?: string,
  fixed?: 'left' | 'right',
  left?: number,
  width?: number,
  renderFilter?: (body: TableRow<T>[]) => React.ReactNode,
  renderSort?: () => React.ReactNode
}

export type TableRow<T extends DataType> = {
  cells: TableCell<T>[],
  style?: React.CSSProperties,
  data: T,
  id: string
}

export type TableCell<T extends DataType> = {
  id: string,
  rowSpan: number,
  colSpan: number,
  content: React.ReactNode,
  head: TableHeadCell<T>,
  style?: React.CSSProperties,
  className?: string
}