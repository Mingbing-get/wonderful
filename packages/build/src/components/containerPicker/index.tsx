import React, { useMemo, useState } from 'react'
import { Modal, Select } from '@douyinfe/semi-ui'

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

const Option = Select.Option

export default function ContainerPicker() {
  const {
    data,
    operationType,
    willAddElementType,
    willMoveId,
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

  function handleOk() {
    if (operationType === 'add') {
      if (willAddElementType) {
        const newElement = createElement(willAddElementType)
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
      title={`选择将要${operationType === 'add' ? '插入' : '移动到'}的容器`}
      visible={!!operationType}
      centered
      width='60%'
      onOk={handleOk}
      onCancel={handleCancel}
      closeOnEsc={true}
      getPopupContainer={getBuildContainer}
      className={'container-modal-wrapper'}
    >
      <Select value={selectedValue} onChange={val => setSelectedValue(val as string)}>
        {
          hasChildrenMarrows.map(marrow => (
            <Option key={marrow.id} value={marrow.id}>{getMarrowName(marrow)}</Option>
          ))
        }
      </Select>
    </Modal>
  )
}
