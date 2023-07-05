export type CheckboxValueType = string | number

export type CheckboxOptionType = {
  label?: React.ReactNode
  value: CheckboxValueType
  disabled?: boolean
}

type CheckboxBaseProps<T extends CheckboxValueType> = {
  className?: string
  style?: React.CSSProperties
  value?: T[]
  defaultValue?: T[]
  onChange?: (value: T[]) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'onChange' | 'children'>

export type CheckboxGroupProps<T extends CheckboxValueType> =
  | (CheckboxBaseProps<T> & {
      options: CheckboxOptionType[]
    })
  | (CheckboxBaseProps<T> & {
      children: React.ReactNode
    })

export type CheckboxProps = {
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  checked?: boolean
  halfChecked?: boolean
  defaultChecked?: boolean
  value?: CheckboxValueType
  children?: React.ReactNode
  onChange?: (checked: boolean) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'onChange' | 'children'>
