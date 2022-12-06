import React, { useRef, useState, useEffect } from 'react'

import { useAudioEdit } from './context'
import Bar from '../bar'

let baseBeforeMaskWidth = 0
let baseAfterMaskWidth = 0

export default function SelectControl() {
  const [beforeMaskWidth, setBeforeMaskWidth] = useState(0)
  const [afterMaskWidth, setAfterMaskWidth] = useState(0)

  const beforeBarRef = useRef<HTMLDivElement>(null)
  const afterBarRef = useRef<HTMLDivElement>(null)

  const { showControl, wrapper, clickClientX, selectDuration, timeDuration, setSelectDuration } = useAudioEdit()

  useEffect(() => {
    const totalTime = timeDuration.end - timeDuration.start
    if (clickClientX === undefined || totalTime === 0 || !wrapper || !showControl) return

    const wrapperRect = wrapper.getBoundingClientRect()
    const before = clickClientX - wrapperRect.x

    baseBeforeMaskWidth = before
    baseAfterMaskWidth = wrapperRect.width - before
    setBeforeMaskWidth(before)
    setAfterMaskWidth(wrapperRect.width - before)
    setSelectDuration?.({
      start: before / wrapperRect.width * totalTime + timeDuration.start,
      end: before / wrapperRect.width * totalTime + timeDuration.start
    })
  }, [clickClientX, showControl])

  function handleChangeBefore(value: number) {
    setBeforeMaskWidth(baseBeforeMaskWidth + value)
  }

  function handleChangeAfter(value: number) {
    setAfterMaskWidth(baseAfterMaskWidth - value)
  }

  function handleEndChange() {
    if (!wrapper || !selectDuration) return

    const wrapperWidth = wrapper.getBoundingClientRect().width
    const total = timeDuration.end - timeDuration.start

    setSelectDuration?.({
      start: beforeMaskWidth / wrapperWidth * total + timeDuration.start,
      end: (wrapperWidth - afterMaskWidth) / wrapperWidth * total + timeDuration.start
    })
  }

  const {
    left: wrapperLeft,
    width: wrapperWidth
  } = wrapper?.getBoundingClientRect() || { left: 0, width: 0 }

  if (!showControl) return <></>

  return (
    <div className='audio-edit-control' onClick={e => e.stopPropagation()}>
      <div
        className='audio-edit-mask'
        style={{ width: beforeMaskWidth }}
      />
      <div className='audio-edit-control-bar' ref={beforeBarRef}>
        <Bar
          refDom={beforeBarRef}
          min={wrapperLeft}
          max={wrapperLeft + wrapperWidth - afterMaskWidth}
          onChange={handleChangeBefore}
          onEnd={handleEndChange}
        />
      </div>
      <div className='audio-edit-select'></div>
      <div className='audio-edit-control-bar' ref={afterBarRef}>
        <Bar
          refDom={afterBarRef}
          min={wrapperLeft + beforeMaskWidth}
          max={wrapperLeft + wrapperWidth}
          onChange={handleChangeAfter}
          onEnd={handleEndChange}
        />
      </div>
      <div
        className='audio-edit-mask'
        style={{ width: afterMaskWidth }}
      />
    </div>
  )
}
