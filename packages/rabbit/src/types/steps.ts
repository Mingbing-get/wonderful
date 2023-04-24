export type StepsStatus = 'wait' | 'process' | 'finish' | 'error'
export type StepsDirection = 'horizontal' | 'vertical'
export type StepsType = 'default' | 'navigation' | 'inline'
export type StepsItemType = {
  description?: React.ReactNode,
  disabled?: boolean,
  icon?: React.ReactNode,
  status?: StepsStatus,
  subTitle?: React.ReactNode,
  title: React.ReactNode,
}

export type StepsProps = {
  className?: string,
  style?: React.CSSProperties,
  items: StepsItemType[],
  current?: number,
  direction?: StepsDirection,
  percent?: number,
  status?: StepsStatus,
  type?: StepsType,
  onClick?: (current: number) => void,
}