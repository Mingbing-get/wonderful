import { TagColorType } from '../tag'

export type TagProps = {
  className?: string
  style?: React.CSSProperties
  closable?: boolean
  closeIcon?: React.ReactNode
  color?: string | TagColorType
  icon?: React.ReactNode
  children?: React.ReactNode
  onClose?: (e: React.MouseEvent) => void
  onCloseCapture?: (e: React.MouseEvent) => void
} & React.HTMLAttributes<HTMLSpanElement>
