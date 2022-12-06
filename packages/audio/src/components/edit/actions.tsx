import React, { useMemo } from 'react'

import Icon from '../fontIcons'
import { useAudioEdit } from './context'

export default function EditActions() {
  const { audioController, selectDuration, isExpand, setIsExpand, setShowControl, reDraw, setSelectDuration, setTimeDuration } = useAudioEdit()

  const hasSelected = useMemo(() => {
    if (!selectDuration) return false

    return selectDuration.start < selectDuration.end
  }, [selectDuration])

  function handleAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    audioController.addAudioByFile(file)
  }

  function handleScissor() {
    if (!selectDuration) return
    audioController.selectParagraph(selectDuration.start, selectDuration.end)
  }

  function handleExpand() {
    if (!selectDuration) return
    reDraw?.(selectDuration.start, selectDuration.end)

    setTimeDuration?.(selectDuration)
    setSelectDuration?.()
    setShowControl?.(false)
    setIsExpand?.(true)
  }

  function handleShrink() {
    if (!isExpand) return
    reDraw?.()
    
    setTimeDuration?.({ start: 0, end: audioController.getTotalTime() })
    setSelectDuration?.()
    setShowControl?.(false)
    setIsExpand?.(false)
  }

  function handleRepeat() {
    if (!selectDuration) return

    const curBuffer = audioController.getSourceNode().buffer
    const _start = Math.floor(selectDuration.start / 1000 * audioController.getContext().sampleRate)
    if (!curBuffer || curBuffer.length <= _start) return

    const totalLen = curBuffer.length
    const _end = Math.min(Math.ceil(selectDuration.end / 1000 * audioController.getContext().sampleRate), totalLen)

    audioController.insertAudio(selectDuration.end, curBuffer.getChannelData(0).slice(_start, _end), curBuffer.getChannelData(1).slice(_start, _end))
  }

  return (
    <div className='audio-edit-actions' onClick={e => e.stopPropagation()}>
      <label>
        <Icon type='add' />
        <input className='input-audio' type='file' accept='audio/*' onChange={handleAdd} />
      </label>
      <Icon type='scissor' className={hasSelected ? '' : 'disabled'} onClick={handleScissor} />
      <Icon type='expand' className={hasSelected ? '' : 'disabled'} onClick={handleExpand} />
      <Icon type='shrink' className={isExpand ? '' : 'disabled'} onClick={handleShrink} />
      <Icon type='repeat' className={hasSelected ? '' : 'disabled'} onClick={handleRepeat} />
    </div>
  )
}