export type SliderProps = {
  min?: number
  max?: number
  value?: number
  step?: number
  showLabel?: boolean
  className?: string
  style?: React.CSSProperties
  onChange?: (val: number) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'onChange' | 'defaultValue' | 'children'>
