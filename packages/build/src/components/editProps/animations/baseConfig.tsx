import React from 'react'
import InputNumber from '../../common/inputNumber'

import { Marrow } from '../../../../../types/global'

import { FormGroup } from '../formGrid'
import { ChangeFn } from '../changeProps'
import { getValueByPath } from '../styleConfig'

export function getBaseItems(marrow: Marrow, basePath: (string | number)[], handleChange: ChangeFn) {
  const baseItems = [
    {
      key: 'duration',
      label: '动画时间:',
      content: (
        <InputNumber
          suffix='ms'
          value={getValueByPath(marrow, basePath, 'duration') as number}
          onChange={val => handleChange([...basePath, 'duration'], val)}
        />
      )
    },
    {
      key: 'delay',
      label: '延迟时间:',
      content: (
        <InputNumber
          suffix='ms'
          value={getValueByPath(marrow, basePath, 'delay') as number}
          onChange={val => handleChange([...basePath, 'delay'], val)}
        />
      )
    },
  ]

  return baseItems
}

export const baseGroup: FormGroup = {
  key: 'baseConfig',
  label: '基本配置',
  includeKeys: ['duration', 'delay']
}