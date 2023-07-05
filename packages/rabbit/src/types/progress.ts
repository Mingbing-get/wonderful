export type ProgressType = 'line' | 'circle'
export type ProgressStatus = 'success' | 'error' | 'normal'
export type ProgressStartPosition = 'top' | 'left' | 'right' | 'bottom'
export type ProgressLinearGradientColor = Record<number, string>

export type ProgressBaseProps = {
  percent: number
  hiddenInfo?: boolean
  status?: ProgressStatus
  strokeWidth?: number
  strokeColor?: string | ProgressLinearGradientColor
  successColor?: string | ProgressLinearGradientColor
  errorColor?: string | ProgressLinearGradientColor
  trailColor?: string
  format?: (percent: number, status: ProgressStatus) => React.ReactNode
}

export type ProgressCircleProps = {
  type: 'circle'
  width?: number
  gapDegree?: number
  startPosition?: ProgressStartPosition
}

export type ProgressProps = (
  | (ProgressBaseProps & {
      type?: 'line'
    })
  | (ProgressBaseProps & ProgressCircleProps)
) &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>
