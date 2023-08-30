import { SVGProps } from 'react'
import type { IconType } from '../icon'

export { IconType }
export type IconProps = {
  type: IconType
  className?: string
} & SVGProps<any>
