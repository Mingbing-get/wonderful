export type ButtonType = 'primary' | 'danger' | 'success' | 'warning'

export type ButtonProps = {
  type?: ButtonType
  loading?: boolean
  block?: boolean
  disabled?: boolean
  ghost?: boolean
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>
