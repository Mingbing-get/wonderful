import React, { useMemo, useState, useCallback, useEffect } from 'react'

import Render from '@marrow/render'
import { getMarrowIdsByLocation } from '@marrow/utils'
import { Marrow, ElementType } from '@marrow/global'

import TopNav from './components/topNav'
import Controller from './components/controller'
import Mask from './components/mask'
import ElementStore from './components/elementStore'
import ContainerPicker from './components/containerPicker'
import EditProps from './components/editProps'

import { BuildMarrowProvider, BuildContext, OperationType } from './context'

import './index.scss'

type Props = {
  marrows: Marrow[],
  onChange?: (marrows: Marrow[]) => void,
  onSave?: (marrows: Marrow[]) => void,
}

export default function Build({
  marrows,
  onChange,
  onSave
}: Props) {
  const [currentLocationIds, setCurrentLocationIds] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState<string>()
  const [_marrows, setMarrows] = useState(marrows)
  const [showStore, setShowStore] = useState(false)
  const [operationType, setOperationType] = useState<OperationType>('')
  const [willAddElementType, setWillAddElementType] = useState<ElementType>()
  const [willMoveId, setWillMoveId] = useState<string>()
  const [editingId, setEditingId] = useState<string>()

  useEffect(() => {
    if (!!operationType || showStore || !!editingId) {
      setSelectedId('')
    }
  }, [operationType, showStore, editingId])

  function handleClick(e: React.MouseEvent) {
    if (!!operationType || showStore || !!editingId) return
    const currentLocationIds = getMarrowIdsByLocation(e.clientX, e.clientY)
    setCurrentLocationIds(currentLocationIds)
    setSelectedId(currentLocationIds[0])
  }

  const setData = useCallback((data: Marrow[]) => {
    onChange?.([...data])
    setMarrows([...data])
  }, [onChange])

  const buildContext: BuildContext = useMemo(() => ({
    data: _marrows,
    selectedId,
    currentLocationIds,
    showStore,
    operationType,
    willAddElementType,
    willMoveId,
    editingId,
    setSelectedId,
    setData,
    setShowStore,
    setOperationType,
    setWillAddElementType,
    setWillMoveId,
    setEditingId
  }), [_marrows, selectedId, currentLocationIds, showStore, operationType, willAddElementType, willMoveId, editingId])

  return (
    <div className='marrow-build-wrapper' onClick={handleClick}>
      <BuildMarrowProvider value={buildContext}>
        <Render marrows={_marrows} />
        <TopNav className='marrow-build-top-nav' onSave={() => onSave?.(_marrows)}/>
        <Controller />
        <Mask />
        <ElementStore />
        <ContainerPicker />
        <EditProps />
      </BuildMarrowProvider>
    </div>
  )
}
