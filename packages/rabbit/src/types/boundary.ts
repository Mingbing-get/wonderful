export type BoundaryDirection = 'row' | 'column'

export interface BoundaryProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: BoundaryDirection
  splitLineColor?: string
  minSpan?: number
  onLayoutChange?: (layouts: Record<string, number>, totalPixel: number) => void
}

export interface BoundaryContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  _order?: number
  span?: number
  minSpan?: number
  onChangeSpan?: (span: number) => void
}
