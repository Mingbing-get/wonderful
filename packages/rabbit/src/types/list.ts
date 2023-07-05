import { VirtualScrollY } from '../hooks/useVirtualScrollY'

export type ListItemType<T extends object = {}> = {
  key: React.Key
  component: React.ReactNode
} & T

export type ListLoadMore = {
  action?: React.ReactNode // 触底时 有action则渲染按钮，否则直接触发加载
  total?: number // 没有total则可以无限加载, 否则当数量达到total后不再渲染加载更多或者触发加载方法
  loading?: React.ReactNode
  notMore?: React.ReactNode
  onLoad: () => void
}

export type ListProps = {
  className?: string
  style?: React.CSSProperties
  itemClassName?: string
  itemStyle?: React.CSSProperties
  items: ListItemType[]
  virtualScroll?: VirtualScrollY
  loadMore?: ListLoadMore
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>
