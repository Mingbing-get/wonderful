import React, { useCallback } from 'react'
import { Select, Switch, SelectOptionType } from '../../../../../rabbit/src'
import Input from '../../common/input'

import LoopStylePicker from './loopStylePicker'
import ChangeZIndex from './changeZIndex'
import getTextInfo from './textInfo'
import getImgInfo from './imgInfo'

import ChangeProps, { GetFormGridItems } from '../changeProps'

const easingStyleOptions: SelectOptionType<string>[] = [
  { value: 'spring(1, 80, 10, 0)', label: '弹簧' },
  { value: 'linear', label: '线性' }
]

export default function BaseInfo() {
  const getFormGridItems: GetFormGridItems = useCallback((marrow, handleChange) => {
    const baseItems = [
      {
        key: 'elementName',
        label: '名称:',
        content: <Input value={marrow.name} onChange={val => handleChange(['name'], val)} />
      },
      {
        key: 'zIndex',
        label: '调整层级:',
        content: (
          <ChangeZIndex
            value={marrow.startStyle?.zIndex as number}
            marrowType={marrow.type}
            onChange={val => handleChange(['startStyle', 'zIndex'], val)}
          />
        )
      },
      {
        key: 'easing',
        label: '运动方式:',
        content: (
          <Select
            value={marrow.timeLineParams?.easing || 'spring(1, 80, 10, 0)'}
            onChange={val => handleChange(['timeLineParams', 'easing'], val)}
            options={easingStyleOptions}
          />
        )
      },
      {
        key: 'loop',
        label: '重复方式:',
        content: <LoopStylePicker marrow={marrow} handleChange={handleChange} />
      },
      {
        key: 'completeIsDestroy',
        label: '完成后销毁:',
        content: <Switch value={marrow.completeIsDestroy} onChange={val => handleChange(['completeIsDestroy'], val)} />
      }
    ]

    switch (marrow.type) {
      case 'text':
        baseItems.push(...getTextInfo(marrow, handleChange))
        break
      case 'img':
        baseItems.push(...getImgInfo(marrow, handleChange))
        break
    }

    return baseItems
  }, [])

  return <ChangeProps getFormGridItems={getFormGridItems} />
}
