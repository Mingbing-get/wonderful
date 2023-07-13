export type SwitchProps = {
  value?: boolean
  yesText?: string
  noText?: string
  onChange?: (value: boolean) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'onChange' | 'onClick' | 'children'>
