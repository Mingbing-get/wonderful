import React, { useRef } from 'react'

import useAnime, { Props as UseAnimeProps } from '../hooks/useAnime'
import Main from '../main'
import { Marrow } from '../../../../types/global'
import './index.scss'

type Props = {
  children?: Marrow[],
} & Omit<UseAnimeProps, 'animeRoot'>

export default function MarrowContainer({ 
  children,
  ...extra
}: Props) {
  const animeRoot = useRef<HTMLDivElement>(null)

  useAnime({ animeRoot, ...extra })

  return (
    <div className='marrow-item marrow-container' ref={animeRoot}>
      {
        children && <Main marrows={children} />
      }
    </div>
  )
}
