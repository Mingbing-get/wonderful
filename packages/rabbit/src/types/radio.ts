export type RadioValueType = string | number

export type RadioOptionType = {
  label?: string,
  value: RadioValueType,
  disabled?: boolean,
}

type BaseProps<T extends RadioValueType> = {
  className?: string,
  style?: React.CSSProperties,
  value?: T,
  defaultValue?: T,
  onChange?: (value?: T) => void
}

export type RadioGroupProps<T extends RadioValueType> = (BaseProps<T> & {
  options: RadioOptionType[]
}) | (BaseProps<T> & {
  children: React.ReactNode
})

export type RadioProps = {
  className?: string,
  style?: React.CSSProperties,
  value?: RadioValueType,
  disabled?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  children: React.ReactNode,
  onChange?: (checked: boolean) => void
}