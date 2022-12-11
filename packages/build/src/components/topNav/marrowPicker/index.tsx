import React, { useMemo } from 'react'
import { getMarrowName, getMarrowsByIds } from '@marrow/utils'
import { Select } from '@marrow/rabbit'

import { useBuildMarrow } from '../../../context'

export default function MarrowPicker() {
  const { data, selectedId, currentLocationIds, setSelectedId } = useBuildMarrow()
  
  const marrowOptions = useMemo(() => { 
    return getMarrowsByIds(data, currentLocationIds).map(marrow => ({
      value: marrow.id,
      label: getMarrowName(marrow)
    }))
  }, [data, currentLocationIds])

  return (
    <Select
      style={{ width: '8rem' }}
      value={selectedId}
      placeholder="请选择对象"
      onChange={id => setSelectedId?.(id as string)}
      options={marrowOptions}
    />
  )
}
