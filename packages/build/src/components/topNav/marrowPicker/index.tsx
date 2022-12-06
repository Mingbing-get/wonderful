import React, { useMemo } from 'react'
import { getMarrowName, getMarrowsByIds } from '@marrow/utils'

import { useBuildMarrow } from '../../../context'

import { Select } from '@douyinfe/semi-ui'
const Option = Select.Option

export default function MarrowPicker() {
  const { data, selectedId, currentLocationIds, setSelectedId } = useBuildMarrow()
  
  const marrows = useMemo(() => { 
    return getMarrowsByIds(data, currentLocationIds)
  }, [data, currentLocationIds])

  return (
    <Select
      style={{ width: 120 }}
      value={selectedId}
      placeholder="请选择对象"
      onChange={id => setSelectedId?.(id as string)}
    >
      {
        marrows.map(marrow => (
          <Option key={marrow.id} value={marrow.id}>
            {getMarrowName(marrow)}
          </Option>
        ))
      }
    </Select>
  )
}
