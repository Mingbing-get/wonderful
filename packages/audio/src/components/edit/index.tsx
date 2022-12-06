import React, { useEffect, useRef, useState, useMemo } from 'react'
import classNames from 'classnames'

import AudioController from '../../audioController'
import { AudioEditProvider, TimeDuration, AudioEditContext } from './context'

import DrawAudio, { DrawAudioRef } from './drawAudio'
import SelectControl from './selectControl'
import Actions from './actions'
import Ruler from '../ruler'

import './index.scss'

type Props = {
  audioController: AudioController,
  style?: React.CSSProperties,
  className?: string
}

const units = ['s']
const radixs = [1000]
const thresholds = [0]

export default function AudioEdit({
  audioController,
  style,
  className
}: Props) {
  const [showControl, setShowControl] = useState(false)
  const [timeDuration, setTimeDuration] = useState<TimeDuration>({ start: 0, end: 0 }) // (ms)
  const [selectDuration, setSelectDuration] = useState<TimeDuration>()
  const [isExpand, setIsExpand] = useState(false)
  const [clickClientX, setClickClientX] = useState<number>()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const drawAudioRef = useRef<DrawAudioRef>()

  useEffect(() => {
    setTimeDuration({ start: 0, end: audioController.getTotalTime() })
    audioController.addListener('changeBuffer', () => {
      setTimeDuration({ start: 0, end: audioController.getTotalTime() })
      setSelectDuration(undefined)
      setShowControl(false)
      setIsExpand(false)
    })
  }, [])

  function handleShowControl(e: React.MouseEvent) {
    if (audioController.getTotalTime() === 0) return

    setClickClientX(e.clientX)
    setShowControl(true)
  }

  const audioEdit: AudioEditContext = useMemo(() => ({
    audioController,
    showControl,
    timeDuration,
    selectDuration,
    isExpand,
    clickClientX,
    wrapper: wrapperRef.current,
    setShowControl,
    setTimeDuration,
    setSelectDuration,
    setIsExpand,
    reDraw: drawAudioRef.current?.reDraw
  }), [showControl, timeDuration, selectDuration, isExpand, clickClientX, drawAudioRef.current, wrapperRef.current])

  return (
    <div
      ref={wrapperRef}
      className={classNames('audio-edit-wrapper', className)}
      style={style}
      onClick={handleShowControl}
    >
      <div className='audio-edit-draw'>
        <DrawAudio audioController={audioController} ref={drawAudioRef} />
      </div>
      <Ruler
        min={timeDuration.start}
        max={timeDuration.end}
        units={units}
        radixs={radixs}
        thresholds={thresholds}
        fixed={3}
      />
      <AudioEditProvider value={audioEdit}>
        <SelectControl />
        <Actions />
      </AudioEditProvider>
    </div>
  )
}