export type ColorPickerProps = {
  className?: string
  style?: React.CSSProperties
  value?: string
  children?: React.ReactNode
  onChange?: (value?: string) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'color' | 'defaultValue' | 'children' | 'onChange'>
