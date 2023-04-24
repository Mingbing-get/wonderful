import { PaginationProps } from '../types/pagination'
import { SaveSort, FilterMapType } from '../hooks/useTable'
import { TableHeadRow, Column, TableRow, DataType } from '../hooks/useTable/type'
import { RowSelection } from '../hooks/useTableRowSelection'
import { VirtualScrollY } from '../hooks/useVirtualScrollY'

export type TableProps<T extends DataType = DataType> = {
  className?: string,
  rowClassName?: string,
  style?: React.CSSProperties,
  columns: Column<T>[],
  data: T[],
  pagination?: Partial<PaginationProps>,
  scroll?: { x?: string | number, y?: string | number },
  virtualScrollY?: VirtualScrollY,
  loading?: boolean,
  rowSelection?: RowSelection<T>,
  onRow?: (row: TableRow<T>) => React.HtmlHTMLAttributes<HTMLTableRowElement>,
  onHeaderRow?: (headRow: TableHeadRow<T>) => React.HtmlHTMLAttributes<HTMLTableRowElement>,
  onFooterRow?: (headRow: TableHeadRow<T>) => React.HtmlHTMLAttributes<HTMLTableRowElement>,
  onFilter?: (filters: FilterMapType, data: TableRow<T>[]) => void,
  onSort?: (sorter: SaveSort<T>[], data: TableRow<T>[]) => void,
}