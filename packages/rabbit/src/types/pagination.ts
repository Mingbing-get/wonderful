export type PaginationItemType = 'page' | 'prev' | 'next' | 'ellipsis'
export type PaginationItemRender = (page: number, type: PaginationItemType, originalElement: React.ReactNode) => React.ReactNode

export type PaginationProps = {
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