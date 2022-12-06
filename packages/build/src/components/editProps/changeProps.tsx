import React, { useMemo, useCallback } from 'react'

import { getMarrowById, changeObjectByPath, replaceMarrow } from '@marrow/utils'

import FormGrid, { FormGridItem, FormGroup } from './formGrid'
import { useBuildMarrow } from '../../context'
import { Marrow } from '@marrow/global'

export type ChangeFn = (path: (string | number)[], value: any) => void
export type GetFormGridItems = (currentMarrow: Marrow, handleChange: ChangeFn) => FormGridItem[]

type Props = {
  getFormGridItems: GetFormGridItems,
  groups?: FormGroup[]
}

export default function ChangeProps({
  getFormGridItems,
  groups
}: Props) {
  const { editingId, data, setData } = useBuildMarrow()

  const currentMarrow = useMemo(() => editingId ? getMarrowById(data, editingId) : undefined, [editingId, data])

  const handleChange: ChangeFn = useCallback((path, value) => {
    if (!currentMarrow) return

    const afterChange = changeObjectByPath(currentMarrow, path, value)
    replaceMarrow(data, currentMarrow.id, afterChange)
    setData?.(data)
  }, [currentMarrow, data])

  const formGridItems: FormGridItem[] = useMemo(() => {
    if (!currentMarrow) return []

    return getFormGridItems(currentMarrow, handleChange)
  }, [currentMarrow, handleChange, getFormGridItems])

  if (!currentMarrow) {
    return <></>
  }

  return (
    <FormGrid items={formGridItems} formGroup={groups} />
  )
}
