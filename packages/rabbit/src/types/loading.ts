export type LoadingProps = {
  size?: number
  color?: string
} & Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>
