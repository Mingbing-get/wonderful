import { IconType } from '../icon'

export type MessageType = 'success' | 'info' | 'warn' | 'error'

export type MessageProps = {
  type?: MessageType,
  delay?: number,
  displayTime?: number,
  content: React.ReactNode,
  icon?: IconType,
}