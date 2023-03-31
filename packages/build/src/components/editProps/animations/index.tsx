import React, { useState, useMemo, useCallback, useEffect } from 'react'

import { getMarrowById, replaceMarrow } from '../../../../../utils/src'
import ChangeProps, { GetFormGridItems } from '../changeProps'
import { groups, getItems } from '../styleConfig'
import { getBaseItems, baseGroup } from './baseConfig'

import { useBuildMarrow } from '../../../context'
import TimeLine, { Node } from '../../common/timeLine'

const _groups = [baseGroup, ...groups]

export default function Animations() {
  const [selectIndex, setSelectIndex] = useState<number>(-1)

  const { data, editingId, setData } = useBuildMarrow()

  const currentMarrow = useMemo(() => {
    if (!editingId) return undefined
    
    return getMarrowById(data, editingId)
  }, [editingId, data])

  const nodes: Node[] = useMemo(() => {
    if (!currentMarrow?.animation || currentMarrow.animation.length === 0) return []

    return new Array(currentMarrow.animation.length).fill(1).map((_, index) => ({
      key: 'key_' + index,
      index
    }))
  }, [currentMarrow])

  useEffect(() => {
    if (nodes.length > 0) {
      setSelectIndex(0)
    }
  }, [])

  const getFormGridItems: GetFormGridItems = useCallback((marrow, handleChange) => {
    return [
      ...getBaseItems(marrow, ['animation', selectIndex], handleChange),
      ...getItems(marrow, ['animation', selectIndex], handleChange)
    ]
  }, [selectIndex])

  function handleAdd() {
    if (!currentMarrow?.animation) return
    currentMarrow.animation = [...currentMarrow.animation, {}]
    setSelectIndex(currentMarrow.animation.length - 1)
    replaceMarrow(data, currentMarrow.id, { ...currentMarrow })
    setData?.(data)
  }

  function handleDelete(node: Node) {
    if (!currentMarrow?.animation) return
    currentMarrow.animation.splice(node.index, 1)
    setSelectIndex(Math.min(node.index, currentMarrow.animation.length - 1))
    replaceMarrow(data, currentMarrow.id, { ...currentMarrow })
    setData?.(data)
  }

  function handlePick(node: Node) {
    setSelectIndex(node.index)
  }

  if (!currentMarrow) {
    return <></>
  }

  return (
    <div>
      <TimeLine
        nodes={nodes}
        selectIndex={selectIndex}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onPick={handlePick}
      />
      {
        selectIndex > -1 && (
          <ChangeProps getFormGridItems={getFormGridItems} groups={_groups} />
        )
      }
    </div>
  )
}