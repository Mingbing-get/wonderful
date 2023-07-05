export interface SelectTriggerProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  suffix?: React.ReactNode
  disabled?: boolean
}
