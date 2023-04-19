import React, { SVGProps } from 'react'
import classNames from 'classnames'

import useSprite from './useSprite'
import pathMap from './iconKeyList'
import './index.scss'

export type IconType = keyof (typeof pathMap)

export const pathKeys = Object.keys(pathMap) as IconType[]

export type Props = {
  type: IconType;
  className?: string;
} & SVGProps<any>

function Icon({
  type,
  className,
  ...extra
}: Props, ref?: React.ForwardedRef<SVGSVGElement>) {
  const svgPath = useSprite(type)

  return (
    <svg
      className={classNames('rabbit-icon', className)}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...extra}
      ref={ref}
      dangerouslySetInnerHTML={{ __html: svgPath || '' }}
    />
  )
}

export default React.forwardRef<SVGSVGElement, Props>(Icon)
