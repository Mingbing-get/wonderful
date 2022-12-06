import React, { useCallback } from 'react'
import { Select, Switch } from '@douyinfe/semi-ui'
import Input from '../../common/input'

import LoopStylePicker from './loopStylePicker'
import ChangeZIndex from './changeZIndex'
import getTextInfo from './textInfo'
import getImgInfo from './imgInfo'

import ChangeProps, { GetFormGridItems } from '../changeProps'

const Option = Select.Option

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
          >
            <Option key='spring' value='spring(1, 80, 10, 0)'>弹簧</Option>
            <Option key='linear' value='linear'>线性</Option>
          </Select>
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
        content: <Switch checked={marrow.completeIsDestroy} onChange={val => handleChange(['completeIsDestroy'], val)} />
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
