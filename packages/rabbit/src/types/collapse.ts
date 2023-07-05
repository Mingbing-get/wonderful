export type CollapsePanelProps = {
  header: React.ReactNode
  panelKey: React.Key
  children: React.ReactElement
  isOpen?: boolean
  className?: string
  style?: React.CSSProperties
  onToggleOpen?: (key: React.Key) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>

export type CollapseProps = {
  className?: string
  style?: React.CSSProperties
  isOpenOnly?: boolean
  children: React.ReactElement[] | React.ReactElement
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>
