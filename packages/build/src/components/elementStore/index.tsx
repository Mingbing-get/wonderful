import React from 'react'
import { Modal } from '../../../../rabbit/src'

import { getBuildContainer } from '../../../../utils/src'
import { ElementType } from '../../../../types/global'

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
    <Modal
      header="选择元素"
      width='70%'
      visible={showStore}
      placement="left"
      onClose={() => setShowStore?.(false)}
      getContainer={getBuildContainer}
      content={(
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
      )}
    />
  )
}
