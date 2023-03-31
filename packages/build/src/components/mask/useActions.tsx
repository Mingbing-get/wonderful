import React, { useMemo } from 'react'
import { Icon } from '../../../../rabbit/src'

import { replaceMarrow } from '../../../../utils/src'
import { useBuildMarrow } from '../../context'

export default function useActions() {
  const { data, setData, setSelectedId, setOperationType, setWillMoveId, setEditingId } = useBuildMarrow()
  return useMemo(() => (
    [
      {
        icon: <Icon type='sync' style={{ color: '#fff' }} />,
        key: 'sync',
        onClick: (id: string) => {
          setOperationType?.('move')
          setWillMoveId?.(id)
        }
      },
      {
        icon: <Icon type='edit' style={{ color: '#fff' }} />,
        key: 'edit',
        onClick: (id: string) => {
          setEditingId?.(id)
        }
      },
      {
        icon: <Icon type='delete' style={{ color: 'red' }} />,
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
