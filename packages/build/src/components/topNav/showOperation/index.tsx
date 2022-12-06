import React, { useMemo } from 'react'

import { getMarrowById, getMarrowName } from '@marrow/utils'

import { getElementName } from '../../elementStore/elementItems'
import { useBuildMarrow } from '../../../context'

import './index.scss'

export default function ShowOperation() {
  const { data, operationType, willAddElementType, willMoveId, editingId } = useBuildMarrow()

  const operationName = useMemo(() => {
    if (operationType === 'add') return '添加'
    if (operationType === 'move') return '移动'
    if (editingId) return '编辑'
    return ''
  }, [operationType, editingId])

  const operationObject = useMemo(() => {
    if (!operationName) return ''

    if (operationName === '添加') return willAddElementType ? getElementName(willAddElementType) : ''

    if (['移动', '编辑'].includes(operationName)) {
      const curId = operationName === '移动' ? willMoveId : editingId

      if (!curId) return ''
      const moveMarrow = getMarrowById(data, curId)
      if (!moveMarrow) return ''
      return getMarrowName(moveMarrow)
    }
  }, [data, willAddElementType, willMoveId, editingId])

  if (!operationName) {
    return <></>
  }

  return (
    <p className='show-operation'>{operationName}: {operationObject}</p>
  )
}
