export type SwitchProps = {
  value?: boolean
  yesText?: string
  noText?: string
  disabled?: boolean
  onChange?: (value: boolean) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'onChange' | 'onClick' | 'children'>
