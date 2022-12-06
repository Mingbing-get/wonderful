import React from 'react'
import { SideSheet } from '@douyinfe/semi-ui'

import { getBuildContainer } from '@marrow/utils'
import { ElementType } from '@marrow/global'

import elements from './elementItems'
import { useBuildMarrow } from '../../context'

import './index.scss'

export default function ElementStore() {
  const { showStore, setShowStore, setOperationType, setWillAddElementType } = useBuildMarrow()

  function handleSelected(type: string) {
    setWillAddElementType?.(type as ElementType)
    setOperationType?.('add')
    setShowStore?.(false)
  }

  return (
    <SideSheet
      title="选择元素"
      width='70%'
      visible={showStore}
      placement="left"
      onCancel={e => setShowStore?.(false)}
      getPopupContainer={getBuildContainer}
    >
      <div className='element-store-wrapper'>
        {
          elements.map(({ type, elementName, icon }) => (
            <div className='element-store-item' key={type} onClick={() => handleSelected(type)}>
              {icon}
              <span className='element-store-item-text'>
                {elementName}
              </span>
            </div>
          ))
        }
      </div>
    </SideSheet>
  )
}
