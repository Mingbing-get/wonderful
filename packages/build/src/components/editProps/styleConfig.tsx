import React from 'react'
import InputNumber from '../common/inputNumber'

import { replaceUnit } from '@marrow/utils'
import { ElementType, Marrow } from '@marrow/global'

import { FormGridItem, FormGroup } from './formGrid'
import ColorPicker from '../common/colorPicker'
import InputRotate from '../common/inputRotate'
import { ChangeFn } from './changeProps'

const omitMap: Record<ElementType, string[]> = {
  'container': ['color', 'fontSize'],
  'img': ['color', 'backgroundColor', 'fontSize'],
  'text': ['width', 'height']
}

export function getNumberValue(value?: number | string): number | undefined {
  if (!value) return undefined

  const number = replaceUnit('' + value)

  return number === '' ? undefined : Number(number)
}

export function addSuffix(suffix: string, value?: string | number): string | undefined {
  if (value === undefined) return undefined

  return `${value}${suffix}`
}

function omitItems(baseItems: FormGridItem[], type: ElementType): FormGridItem[] {
  const curOmitKeys = omitMap[type]

  return baseItems.filter(item => !curOmitKeys.includes(item.key))
}

export function getValueByPath(object: any, basePath: (string | number)[], key: string): string | number | undefined {
  let cur = object
  basePath.forEach(item => {
    cur = cur[item]
    if (!cur) return undefined
  })

  return cur?.[key]
}

export function getItems(marrow: Marrow, basePath: (string | number)[], handleChange: ChangeFn) {
  const baseItems = [
    {
      key: 'translateX',
      label: '向右偏移:',
      content: (
        <InputNumber
          suffix='rem'
          value={getNumberValue(getValueByPath(marrow, basePath, 'translateX'))}
          onChange={val => handleChange([...basePath, 'translateX'], addSuffix('rem', val))}
        />
      )
    },
    {
      key: 'translateY',
      label: '向下偏移:',
      content: (
        <InputNumber
          suffix='rem'
          value={getNumberValue(getValueByPath(marrow, basePath, 'translateY'))}
          onChange={val => handleChange([...basePath, 'translateY'], addSuffix('rem', val))}
        />
      )
    },
    {
      key: 'scaleX',
      label: '横向缩放:',
      content: (
        <InputNumber
          suffix='x'
          value={getValueByPath(marrow, basePath, 'scaleX') as number}
          onChange={val => handleChange([...basePath, 'scaleX'], val)}
        />
      )
    },
    {
      key: 'scaleY',
      label: '纵向缩放:',
      content: (
        <InputNumber
          suffix='x'
          value={getValueByPath(marrow, basePath, 'scaleY') as number}
          onChange={val => handleChange([...basePath, 'scaleY'], val)}
        />
      )
    },
    {
      key: 'rotateX',
      label: '横轴旋转:',
      content: (
        <InputRotate
          value={getNumberValue(getValueByPath(marrow, basePath, 'rotateX'))}
          onChange={val => handleChange([...basePath, 'rotateX'], addSuffix('deg', val))}
        />
      )
    },
    {
      key: 'rotateY',
      label: '纵轴旋转:',
      content: (
        <InputRotate
          value={getNumberValue(getValueByPath(marrow, basePath, 'rotateY'))}
          onChange={val => handleChange([...basePath, 'rotateY'], addSuffix('deg', val))}
        />
      )
    },
    {
      key: 'rotateZ',
      label: '平面旋转:',
      content: (
        <InputRotate
          value={getNumberValue(getValueByPath(marrow, basePath, 'rotateZ'))}
          onChange={val => handleChange([...basePath, 'rotateZ'], addSuffix('deg', val))}
        />
      )
    },
    {
      key: 'width',
      label: '宽度:',
      content: (
        <InputNumber
          suffix='rem'
          value={getNumberValue(getValueByPath(marrow, basePath, 'width'))}
          onChange={val => handleChange([...basePath, 'width'], addSuffix('rem', val))}
        />
      )
    },
    {
      key: 'height',
      label: '高度:',
      content: (
        <InputNumber
          suffix='rem'
          value={getNumberValue(getValueByPath(marrow, basePath, 'height'))}
          onChange={val => handleChange([...basePath, 'height'], addSuffix('rem', val))}
        />
      )
    },
    {
      key: 'fontSize',
      label: '字体大小:',
      content: (
        <InputNumber
          suffix='rem'
          value={getNumberValue(getValueByPath(marrow, basePath, 'fontSize'))}
          onChange={val => handleChange([...basePath, 'fontSize'], addSuffix('rem', val))}
        />
      )
    },
    {
      key: 'color',
      label: '文字颜色:',
      content: (
        <ColorPicker
          value={getValueByPath(marrow, basePath, 'color') as string}
          onChange={val => handleChange([...basePath, 'color'], val)}
        />
      )
    },
    {
      key: 'backgroundColor',
      label: '背景颜色:',
      content: (
        <ColorPicker
          value={getValueByPath(marrow, basePath, 'backgroundColor') as string}
          onChange={val => handleChange([...basePath, 'backgroundColor'], val)}
        />
      )
    },
  ]

  return omitItems(baseItems, marrow.type)
}

export const groups: FormGroup[] = [
  {
    key: 'transform',
    label: '变换',
    includeKeys: ['translateX', 'translateY', 'scaleX', 'scaleY', 'rotateX', 'rotateY', 'rotateZ']
  },
  {
    key: 'size',
    label: '大小',
    includeKeys: ['width', 'height']
  },
  {
    key: 'font',
    label: '字体',
    includeKeys: ['fontSize', 'color']
  },
  {
    key: 'background',
    label: '背景',
    includeKeys: ['backgroundColor']
  }
]