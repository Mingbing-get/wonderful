import type { Placement, Instance } from '@popperjs/core'

export { Placement, Instance }
export type PopoverRef = Instance & {
  resetVirtualElement: () => void
}
export type PopoverArrowType = 'small' | 'large' | 'middle' | 'none'

export type PopoverProps = {
  children: React.ReactElement
  content: React.ReactNode
  trigger?: 'click' | 'hover' | 'focus'
  arrow?: PopoverArrowType
  placement?: Placement
  visible?: boolean
  delay?: number
  hoverOpenDelay?: number
  widthFollowTarget?: boolean
  className?: string
  style?: React.CSSProperties
  onVisibleChange?: (visible: boolean) => void
}
