export type ButtonType = 'primary' | 'danger' | 'success' | 'warning' | 'default'

export type ButtonProps = {
  type?: ButtonType
  loading?: boolean
  block?: boolean
  disabled?: boolean
  ghost?: boolean
  round?: boolean
  children: React.ReactNode
} & React.HTMLAttributes<HTMLButtonElement>
