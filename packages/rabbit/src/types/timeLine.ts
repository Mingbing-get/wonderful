export type TimelineItemType<T extends Object = {}> = {
  color?: string
  dot?: React.ReactNode
  label?: React.ReactNode
  content?: React.ReactNode
} & T

export type TimelineMode = 'left' | 'right' | 'alternate'

export type TimeLineProps = {
  className?: string
  style?: React.CSSProperties
  items: TimelineItemType[]
  mode?: TimelineMode
  pending?: TimelineItemType | true
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>
