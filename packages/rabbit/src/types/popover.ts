import type { Placement, PopoverOffset } from '../popoverInstance/type'
import Instance from '../popoverInstance'
import { PopoverArrowType } from './popoverHandle'

export { Placement }
export type PopoverRef = Instance

export type PopoverProps = {
  children: React.ReactElement
  content: React.ReactNode
  trigger?: 'click' | 'hover' | 'focus'
  arrow?: PopoverArrowType
  placement?: Placement
  offset?: PopoverOffset
  visible?: boolean
  preventControlVisible?: boolean
  delay?: number
  hoverOpenDelay?: number
  widthFollowTarget?: boolean
  className?: string
  style?: React.CSSProperties
  onVisibleChange?: (visible: boolean) => void
}
