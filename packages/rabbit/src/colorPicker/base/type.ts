export interface ColorObject {
  r: number
  g: number
  b: number
  a?: number
}

export interface HSVObject {
  h: number
  s: number
  v: number
  a?: number
}

export interface BaseColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
  value?: string
  onChange?: (value?: string) => void
  shortcutList?: string[]
}
