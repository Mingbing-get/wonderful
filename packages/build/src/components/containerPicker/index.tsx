import React, { useMemo, useState } from 'react'
import { Modal, Select } from '@marrow/rabbit'

import {
  getAllIncludeChildren,
  getMarrowName,
  appendChildren,
  getCurrentMarrowParentId,
  replaceMarrow,
  getMarrowById,
  getBuildContainer,
  OUTER_ID
} from '@marrow/utils'
import { createElement } from '../elementStore/elementItems'

import { useBuildMarrow } from '../../context'

export default function ContainerPicker() {
  const {
    data,
    operationType,
    willAddElementType,
    willMoveId,
    marrowController,
    setOperationType,
    setData,
    setSelectedId,
    setEditingId
  } = useBuildMarrow()
  const [selectedValue, setSelectedValue] = useState(OUTER_ID)

  const hasChildrenMarrows = useMemo(() => {
    let includeChildrenMarrow = getAllIncludeChildren(data)

    if (operationType === 'move' && willMoveId) {
      const currentParent = getCurrentMarrowParentId(data, willMoveId)
      includeChildrenMarrow = includeChildrenMarrow.filter(marrow => marrow.id !== currentParent && marrow.id !== willMoveId)
      if (currentParent === OUTER_ID) {
        setSelectedValue(includeChildrenMarrow[0]?.id)
      }
    }

    return includeChildrenMarrow
  }, [data, willMoveId])

  const options = useMemo(() => {
    return hasChildrenMarrows.map(marrow => ({
      value: marrow.id,
      label: getMarrowName(marrow)
    }))
  }, [hasChildrenMarrows])

  function handleOk() {
    if (operationType === 'add') {
      if (willAddElementType) {
        const newElement = createElement(willAddElementType, marrowController?.getCurrentTime() || 0)
        if (selectedValue === 'outer') {
          setData?.([...data, newElement])
        } else {
          const currentMarrow = hasChildrenMarrows.find(marrow => marrow.id === selectedValue)
          currentMarrow && appendChildren(currentMarrow, newElement)
          setData?.(data)
        }
        setEditingId?.(newElement.id)
      }
    } else if (operationType === 'move') {
      const moveMarrow = willMoveId && getMarrowById(data, willMoveId)
      if (willMoveId && moveMarrow) {
        replaceMarrow(data, willMoveId)
        if (selectedValue === 'outer') {
          setData?.([...data, moveMarrow])
        } else {
          const currentMarrow = hasChildrenMarrows.find(marrow => marrow.id === selectedValue)
          currentMarrow && appendChildren(currentMarrow, moveMarrow)
          setData?.(data)
        }
        setSelectedId?.(willMoveId)
      }
    }
    setOperationType?.('')
  }

  function handleCancel() {
    if (willMoveId && operationType === 'move') {
      setSelectedId?.(willMoveId)
    }
    setOperationType?.('')
  }

  return (
    <Modal
      header={`选择将要${operationType === 'add' ? '插入' : '移动到'}的容器`}
      visible={!!operationType}
      width='60%'
      getContainer={getBuildContainer}
      onClose={handleCancel}
      footer={[
        { text: '取消', onClick: handleCancel },
        { text: '确定', type: 'primary', onClick: handleOk }
      ]}
      content={(
        <Select
          value={selectedValue}
          onChange={val => setSelectedValue(val as string)}
          options={options}
        />
      )}
    />
  )
}
