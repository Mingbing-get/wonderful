export type RateCharacterFn = (index: number) => React.ReactNode

export type RateProps = {
  allowClear?: boolean
  allowHalf?: boolean
  character?: React.ReactNode | RateCharacterFn
  className?: string
  style?: React.CSSProperties
  count?: number
  defaultValue?: number
  value?: number
  disabled?: boolean
  checkColor?: string
  unCheckColor?: string
  toolTips?: string[]
  onChange?: (value: number) => void
  onHoverChange?: (value: number) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children' | 'value' | 'defaultValue'>
