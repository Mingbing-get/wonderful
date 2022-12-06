import React, { useCallback, useMemo, useState } from 'react'
import { SideSheet, Tabs, TabPane } from '@douyinfe/semi-ui'
import { IconEyeClosedSolid, IconEyeOpened } from '@douyinfe/semi-icons'

import { getBuildContainer } from '@marrow/utils'

import Animations from './animations'
import StartStyle from './startStyle'
import BaseInfo from './baseInfo'
import { useBuildMarrow } from '../../context'

import './index.scss'

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
        tabName: '基础信息',
        itemKey: 'base-info',
        tabContent: <BaseInfo />
      },
      {
        tabName: '初始化样式',
        itemKey: 'start-style',
        tabContent: <StartStyle />
      },
      {
        tabName: '动画配置',
        itemKey: 'animations',
        tabContent: <Animations />
      }
    ]
  ), [])
  return (
    <SideSheet
      title={
        <div className='slide-edit-props-title'>
          <p>编辑详细信息</p>
          {
            open ? (
              <IconEyeClosedSolid onClick={() => setOpen(false)} />
            ) : (
              <IconEyeOpened onClick={() => setOpen(true)} />
            )
          }
        </div>
      }
      width='100%'
      height='calc(90% - 45px)'
      visible={!!editingId}
      placement="bottom"
      className='slide-edit-props'
      style={{ opacity: open ? 0.8 : 1 }}
      onCancel={handleCancel}
      getPopupContainer={getBuildContainer}
    >
      <Tabs className='tab-edit-props' type='line'>
        {
          tabList.map(({ tabName, tabContent, itemKey }) => (
            <TabPane tab={tabName} itemKey={itemKey} key={itemKey}>
              {tabContent}
            </TabPane>
          ))
        }
      </Tabs>
    </SideSheet>
  )
}
