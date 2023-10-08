import { Placement, VirtualElement, PopoverOffset } from '../popoverInstance'

export type PopoverArrowType = 'small' | 'large' | 'middle' | 'none'

export type PopoverHandleProps = {
  target?: VirtualElement
  content: React.ReactNode
  arrow?: PopoverArrowType
  placement?: Placement
  widthFollowTarget?: boolean
  offset?: PopoverOffset
  className?: string
  style?: React.CSSProperties
  onChangeWrapper?: (dom: HTMLDivElement) => void
}
