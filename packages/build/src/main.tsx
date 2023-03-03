import React, { useMemo, useState, useCallback, useEffect, useRef, useImperativeHandle } from 'react'

import Render, { MarrowController } from '@marrow/render'
import { getMarrowIdsByLocation } from '@marrow/utils'
import { Marrow, ElementType } from '@marrow/global'
import { AudioInfo } from '@marrow/audio'

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
  audioInfo?: AudioInfo,
  onChange?: (marrows: Marrow[]) => void,
  onSave?: (marrows: Marrow[], audioInfo: AudioInfo | null) => void,
}

function Build({
  marrows,
  audioInfo,
  onChange,
  onSave
}: Props, ref: React.ForwardedRef<MarrowController | null>) {
  const [currentLocationIds, setCurrentLocationIds] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState<string>()
  const [_marrows, setMarrows] = useState(marrows)
  const [showStore, setShowStore] = useState(false)
  const [operationType, setOperationType] = useState<OperationType>('')
  const [willAddElementType, setWillAddElementType] = useState<ElementType>()
  const [willMoveId, setWillMoveId] = useState<string>()
  const [editingId, setEditingId] = useState<string>()
  const [marrowController, setMarrowController] = useState<MarrowController | null>(null)

  const marrowControllerRef = useRef<MarrowController>(null)

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

  useEffect(() => {
    setMarrowController(marrowControllerRef.current)
  }, [marrowControllerRef.current])

  useImperativeHandle(ref, () => marrowController as any, [marrowController])

  const buildContext: BuildContext = useMemo(() => ({
    data: _marrows,
    selectedId,
    currentLocationIds,
    showStore,
    operationType,
    willAddElementType,
    willMoveId,
    editingId,
    marrowController,
    setSelectedId,
    setData,
    setShowStore,
    setOperationType,
    setWillAddElementType,
    setWillMoveId,
    setEditingId
  }), [_marrows, selectedId, currentLocationIds, showStore, operationType, willAddElementType, willMoveId, editingId, marrowController])

  return (
    <div className='marrow-build-wrapper' onClick={handleClick}>
      <BuildMarrowProvider value={buildContext}>
        <Render audioInfo={audioInfo} marrows={_marrows} ref={marrowControllerRef} />
        <TopNav className='marrow-build-top-nav' onSave={() => onSave?.(_marrows, marrowController?.getAudioController()?.getFloat32ArrayFromAudio() || null)}/>
        <Controller />
        <Mask />
        <ElementStore />
        <ContainerPicker />
        <EditProps />
      </BuildMarrowProvider>
    </div>
  )
}

export default React.forwardRef<MarrowController | null, Props>(Build)
