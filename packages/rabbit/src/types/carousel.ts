export type CarouselDotPosition = 'top' | 'bottom' | 'left' | 'right'
export type CarouselEffect = 'scrollX' | 'fade'
export type CarouselRef = {
  goTo: (slideNumber: number, useAnimate: boolean) => void
  next: () => void
  prev: () => void
  pause: () => void
  start: () => void
}

export type CarouselProps = {
  className?: string
  style?: React.CSSProperties
  autoPlay?: boolean
  singlePlay?: boolean
  speed?: number
  duration?: number
  dotPosition?: CarouselDotPosition
  dots?: boolean | string
  hiddenSwitchBtn?: boolean
  effect?: CarouselEffect
  slidesToRows?: number
  slidesToColumns?: number
  children?: React.ReactNode | React.ReactNode[]
  itemSpace?: number | string
  customBtn?: (type: 'prev' | 'next') => React.ReactNode
  customPaging?: (page: number) => React.ReactNode
  afterChange?: (current: number) => void
  beforeChange?: (from: number, to: number) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>
