import React from 'react'
import { Marrow } from '../../../types/global'

import MarrowContainer from './container'
import MarrowText from './text'
import MarrowImg from './img'

type Props = {
  marrows: Marrow[],
}

export default function Main({
  marrows,
}: Props) {
  return (
    <>
      {
        marrows.map(marrow => {
          if (marrow.type === 'container') {
            return (
              <MarrowContainer
                key={marrow.id}
                {...marrow}
              />
            )
          }

          if (marrow.type === 'text') {
            return (
              <MarrowText
                key={marrow.id}
                {...marrow}
              />
            )
          }

          if (marrow.type === 'img') {
            return (
              <MarrowImg
                key={marrow.id}
                {...marrow}
              />
            )
          }
          return <></>
        })
      }
    </>
  )
}
