import React from 'react'

import { getMinZIndex, getMaxZIndex } from '@marrow/utils'
import { ElementType } from '@marrow/global'

import { useBuildMarrow } from '../../../../context'

import './index.scss'

type Props = {
  value?: number
  marrowType: ElementType
  onChange?: (val?: number) => void
}

function toDefault(marrowType: ElementType): number {
  if (marrowType === 'img') return -1
  return 0
}

export default function ChangeZIndex({
  value,
  marrowType,
  onChange
}: Props) {
  const { data } = useBuildMarrow()

  return (
    <div className='change-z-index-wrapper'>
      <span onClick={() => onChange?.((value || 0) - 1)}>-</span>
      <span onClick={() => onChange?.(getMinZIndex(data) - 1)}>置为最下层</span>
      <span onClick={() => onChange?.(toDefault(marrowType))}>恢复默认</span>
      <span onClick={() => onChange?.(getMaxZIndex(data) + 1)}>置为最上层</span>
      <span onClick={() => onChange?.((value || 0) + 1)}>+</span>
    </div>
  )
}
