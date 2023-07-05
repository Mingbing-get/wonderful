export type TabItemProps = {
  title: React.ReactNode
  key: React.Key
  children: React.ReactElement
}

export type TabProps = {
  defaultActiveKey?: React.Key
  onChange?: (key: React.Key) => void
  children: React.ReactElement[] | React.ReactElement
  className?: string
  style?: React.CSSProperties
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'>
