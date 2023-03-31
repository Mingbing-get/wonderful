import React from 'react'

import { MarrowImg } from '../../../../../types/global'
import { Upload, Icon } from '../../../../../rabbit/src'

import { FormGridItem } from '../formGrid'
import { ChangeFn } from '../changeProps'

export default function getImgInfo(marrow: MarrowImg, handleChange: ChangeFn): FormGridItem[] {
  return [
    {
      key: 'src',
      label: '图片:',
      content: (
        <Upload source={marrow.src} onChange={imgDesc => handleChange(['src'], imgDesc?.src || imgDesc?.base64)}>
          <Icon type='add' />
        </Upload>
      )
    }
  ]
}
