import React, { useEffect, useMemo, useState, useImperativeHandle } from 'react'

import { Marrow } from '@marrow/global'
import { AudioInfo } from '@marrow/audio'

import Main from './components/main'
import MarrowController from './marrowController'
import { RenderMarrowProvider } from './context'

import './index.scss'

export {
  MarrowController
}

type Props = {
  marrows: Marrow[],
  audioInfo?: AudioInfo,
  autoplay?: boolean
}

function Render({
  marrows,
  audioInfo,
  autoplay = false
}: Props, ref: React.ForwardedRef<MarrowController | null>) {
  const [marrowController, _] = useState(new MarrowController())
  marrowController.setAutoplay(autoplay)

  useEffect(() => {
    marrowController.getAudioController().clearBuffer()
    audioInfo && marrowController.getAudioController().addAudioBufferByFloat32Array(audioInfo)
  }, [audioInfo])

  useEffect(() => {
    autoplay && marrowController.play()
  }, [])

  const value = useMemo(() => ({
    marrowController
  }), [])

  useImperativeHandle(ref, () => marrowController, [])

  return (
    <RenderMarrowProvider value={value}>
      <div className='marrow-render-wrapper'>
        <Main marrows={marrows} />
      </div>
    </RenderMarrowProvider>
  )
}

export default React.forwardRef<MarrowController | null, Props>(Render)
