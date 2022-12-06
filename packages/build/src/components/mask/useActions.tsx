import React, { useMemo } from 'react'
import { IconDeleteStroked, IconEdit, IconSync } from '@douyinfe/semi-icons'

import { replaceMarrow } from '@marrow/utils'
import { useBuildMarrow } from '../../context'

export default function useActions() {
  const { data, setData, setSelectedId, setOperationType, setWillMoveId, setEditingId } = useBuildMarrow()
  return useMemo(() => (
    [
      {
        icon: <IconSync size='small' style={{ color: '#fff' }} />,
        key: 'sync',
        onClick: (id: string) => {
          setOperationType?.('move')
          setWillMoveId?.(id)
        }
      },
      {
        icon: <IconEdit size='small' style={{ color: '#fff' }} />,
        key: 'edit',
        onClick: (id: string) => {
          setEditingId?.(id)
        }
      },
      {
        icon: <IconDeleteStroked size='small' style={{ color: 'red' }} />,
        key: 'delete',
        onClick: (id: string) => {
          const isReplace = replaceMarrow(data, id)
          if (isReplace) {
            setData?.(data)
            setSelectedId?.('')
          }
        }
      }
    ]
  ), [data])
}
