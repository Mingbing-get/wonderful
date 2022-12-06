import React, { useEffect } from 'react'

import { Marrow } from '@marrow/global'

import Main from './components/main'
import MarrowController from './marrowController'

import './index.scss'

export {
  MarrowController
}

type Props = {
  marrows: Marrow[],
  autoplay?: boolean
}

export const marrowController = new MarrowController()

export default function Render({
  marrows,
  autoplay = false
}: Props) {
  marrowController.setAutoplay(autoplay)
  useEffect(() => {
    autoplay && marrowController.play()
  }, [])

  return (
    <div className= 'marrow-render-wrapper'>
      <Main marrows={marrows} />
    </div>
  )
}
