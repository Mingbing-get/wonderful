import { SVGProps } from 'react'
import { IconType } from '../icon'

export { IconType }
export type IconProps = {
  type: IconType;
  className?: string;
} & SVGProps<any>
