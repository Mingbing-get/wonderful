import React from 'react'
import { IconPlus } from '@douyinfe/semi-icons'

import { MarrowImg } from '@marrow/global'

import Upload from '../../common/upload'
import { FormGridItem } from '../formGrid'
import { ChangeFn } from '../changeProps'

export default function getImgInfo(marrow: MarrowImg, handleChange: ChangeFn): FormGridItem[] {
  return [
    {
      key: 'src',
      label: '图片:',
      content: (
        <Upload source={marrow.src} onChange={imgDesc => handleChange(['src'], imgDesc?.src || imgDesc?.base64)}>
          <IconPlus size='extra-large' />
        </Upload>
      )
    }
  ]
}
