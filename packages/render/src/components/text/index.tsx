import React, { useRef } from 'react'

import useAnime, { Props as UseAnimeProps } from '../hooks/useAnime'
import './index.scss'

type Props = {
  text: string,
} & Omit<UseAnimeProps, 'animeRoot'>

export default function MarrowText({
  text,
  ...extra
}: Props) {
  const animeRoot = useRef<HTMLDivElement>(null)

  useAnime({ animeRoot, ...extra })

  return (
    <div className='marrow-item marrow-text' ref={animeRoot}>
      {text}
    </div>
  )
}
