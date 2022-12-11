import React, { useState, useEffect } from 'react'

import { marrowController } from '@marrow/render'
import { AudioEdit } from '@marrow/audio'
import { Slider } from '@marrow/rabbit'
import { Icon } from '@marrow/rabbit'

import { useBuildMarrow } from '../../context'

import './index.scss'

export default function Controller() {
  const [showController, setShowController] = useState(false)
  const [showAudioEdit, setShowAudioEdit] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)

  const {
    selectedId,
    setSelectedId
  } = useBuildMarrow()

  useEffect(() => {
    if (!selectedId) return

    marrowController.pause()
    setShowController(false)
    setShowAudioEdit(false)
  }, [selectedId])

  useEffect(() => {
    marrowController.addListener('changeCurrentTime', () => {
      setRefreshCount(val => val + 1)
    })
  }, [])

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
        marrowController.pause()
        break
      case 'play':
        marrowController.play()
        break
      case 'restart':
        marrowController.restart()
        break
      case 'back':
        marrowController.seek(marrowController.getCurrentTime() - 30)
        break
      case 'fast':
        marrowController.seek(marrowController.getCurrentTime() + 30)
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
              <svg width="40" height="12">
                <path d="M0 10 Q10 9, 14 6 Q20 0, 26 6 Q30 9, 40 10 Z" fill="#86abe6cc"></path>
              </svg>
            </div>
            <div className='marrow-controller-handle' onClick={handleClickShowAudioEdit}>
              <svg width="40" height="12">
                <path d="M0 10 Q10 9, 14 6 Q20 0, 26 6 Q30 9, 40 10 Z" fill="#86ab66cc"></path>
              </svg>
            </div>
          </div>
        )
      }
    </div>
  )
}
