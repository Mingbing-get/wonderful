import React, { useCallback, useMemo, useState } from 'react'
import { Modal, Tab, Icon } from '@marrow/rabbit'

import { getBuildContainer } from '@marrow/utils'

import Animations from './animations'
import StartStyle from './startStyle'
import BaseInfo from './baseInfo'
import { useBuildMarrow } from '../../context'

import './index.scss'

const Item = Tab.Item

export default function EditProps() {
  const { editingId, setEditingId, setSelectedId } = useBuildMarrow()
  const [open, setOpen] = useState(false)

  const handleCancel = useCallback(() => {
    editingId && setSelectedId?.(editingId)
    setEditingId?.('')
  }, [editingId])

  const tabList = useMemo(() => (
    [
      {
        title: '基础信息',
        key: 'base-info',
        children: <BaseInfo />
      },
      {
        title: '初始化样式',
        key: 'start-style',
        children: <StartStyle />
      },
      {
        title: '动画配置',
        key: 'animations',
        children: <Animations />
      }
    ]
  ), [])
  return (
    <Modal
      header={
        <div className='slide-edit-props-title'>
          <p>编辑详细信息</p>
          {
            open ? (
              <Icon type='closeEye' style={{ cursor: 'pointer' }} onClick={() => setOpen(false)} />
            ) : (
              <Icon type='eye' style={{ cursor: 'pointer' }} onClick={() => setOpen(true)} />
            )
          }
        </div>
      }
      height='calc(90% - 45px)'
      visible={!!editingId}
      placement="bottom"
      style={{ opacity: open ? 0.8 : 1 }}
      onClose={handleCancel}
      getContainer={getBuildContainer}
      content={(
        <Tab>
          {
            tabList.map(({ title, key, children }) => (
              <Item title={title} key={key}>
                {children}
              </Item>
            ))
          }
        </Tab>
      )}
    />
  )
}
