import { Placement } from './popover'
import { PopoverArrowType } from './popoverHandle'
import { ButtonProps } from './button'

export type TourStepType<T extends object = {}> = {
  title?: React.ReactNode
  content?: React.ReactNode
  arrow?: PopoverArrowType
  placement?: Placement
  nextButtonProps?: Partial<ButtonProps>
  prevButtonProps?: Partial<ButtonProps>
  onClose?: () => void
  target: () => HTMLElement | null
} & T

export type TourTipType = 'dot' | 'none' | 'simple'

export type TourProps = {
  steps: TourStepType[]
  open?: boolean
  arrow?: PopoverArrowType
  placement?: Placement
  current?: number
  finishButtonProps?: Partial<ButtonProps>
  tip?: TourTipType
  onClose?: (current: number) => void
  onFinish?: () => void
  onChange?: (current: number) => void
}
