import React from 'react'
import Input from '../../common/input'

import { MarrowText } from '../../../../../types/global'

import { FormGridItem } from '../formGrid'
import { ChangeFn } from '../changeProps'

export default function getTextInfo(marrow: MarrowText, handleChange: ChangeFn): FormGridItem[] {
  return [
    {
      key: 'text',
      label: '文本:',
      content: <Input value={marrow.text} onChange={val => handleChange(['text'], val)} />
    }
  ]
}
