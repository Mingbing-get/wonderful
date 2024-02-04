import { ButtonType } from './button'
export type ModalPlacement = 'center' | 'bottom' | 'top' | 'left' | 'right'

export type ModalFooterButton = {
  text: string
  type?: ButtonType
  onClick?: () => void
}

export type ModalProps = {
  header?: React.ReactNode
  content: React.ReactNode
  footer?: ModalFooterButton[]
  visible?: boolean
  width?: number | string
  height?: number | string
  placement?: ModalPlacement
  style?: React.CSSProperties
  className?: string
  zIndex?: number
  preventMouseOver?: boolean
  preventAutoClose?: boolean
  onVisibleChange?: (visible: boolean) => void
  onClose?: () => void
  getContainer?: () => HTMLElement
}
