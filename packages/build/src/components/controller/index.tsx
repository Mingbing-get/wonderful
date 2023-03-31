import React, { useState, useEffect } from 'react'

import { AudioEdit } from '../../../../audio/src'
import { Slider } from '../../../../rabbit/src'
import { Icon } from '../../../../rabbit/src'

import { useBuildMarrow } from '../../context'

import './index.scss'

export default function Controller() {
  const [showController, setShowController] = useState(false)
  const [showAudioEdit, setShowAudioEdit] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)

  const {
    selectedId,
    marrowController,
    setSelectedId
  } = useBuildMarrow()

  useEffect(() => {
    if (!selectedId) return

    marrowController?.pause()
    setShowController(false)
    setShowAudioEdit(false)
  }, [selectedId, marrowController])

  useEffect(() => {
    marrowController?.addListener('changeCurrentTime', () => {
      setRefreshCount(val => val + 1)
    })
  }, [marrowController])

  function handleChange(value: number) {
    marrowController?.seek(value)
    setRefreshCount(refreshCount + 1)
  }

  function handleClickShowController() {
    setSelectedId?.('')
    setShowController(true)
  }

  function handleClickShowAudioEdit() {
    setSelectedId?.('')
    setShowAudioEdit(true)
  }

  function refresh(type: 'play' | 'pause' | 'restart' | 'back' | 'fast') {
    setRefreshCount(refreshCount + 1)
    switch(type) {
      case 'pause':
        marrowController?.pause()
        break
      case 'play':
        marrowController?.play()
        break
      case 'restart':
        marrowController?.restart()
        break
      case 'back':
        marrowController?.seek(marrowController.getCurrentTime() - 30)
        break
      case 'fast':
        marrowController?.seek(marrowController.getCurrentTime() + 30)
        break
    }
  }

  if (!marrowController) {
    return <></>
  }

  return (
    <div className='marrow-controller-wrapper' onClick={e => e.stopPropagation()}>
      {
        showController && (
          <div className='marrow-controller-bar'>
            <Icon type='restart' onClick={() => refresh('restart')} />
            {
              marrowController.getIsPlay() ? (
                <Icon type='pause' onClick={() => refresh('pause')} />
              ) : (
                <Icon type='play' onClick={() => refresh('play')} />
              )
            }
            <Icon type='backward' onClick={() => refresh('back')} />
            <Slider
              min={0}
              max={marrowController.getTotalTime()}
              value={marrowController.getCurrentTime()}
              showLabel={false}
              onChange={val => handleChange(val as number)}
            />
            <Icon type='backward' onClick={() => refresh('fast')} style={{ transform: 'rotateZ(180deg)' }} />
            <span className='marrow-controller-info'>
              {marrowController.getCurrentTime()}/{marrowController.getTotalTime()}(ms)
            </span>
          </div>
        )
      }
      {
        showAudioEdit && (
          <AudioEdit audioController={marrowController.getAudioController()} />
        )
      }
      {
        !showController && !showAudioEdit && (
          <div className='marrow-controller-handle-wrapper'>
            <div className='marrow-controller-handle' onClick={handleClickShowController}>
              <Icon type='outerPlay' />
            </div>
            <div className='marrow-controller-handle' onClick={handleClickShowAudioEdit}>
              <Icon type='music' />
            </div>
          </div>
        )
      }
    </div>
  )
}
