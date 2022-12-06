import React, { useRef } from 'react'

import useAnime, { Props as UseAnimeProps } from '../hooks/useAnime'
import './index.scss'

type Props = {
  src: string,
} & Omit<UseAnimeProps, 'animeRoot'>

export default function MarrowImg({
  src,
  ...extra
}: Props) {
  const animeRoot = useRef<HTMLImageElement>(null)

  useAnime({ animeRoot, ...extra })

  return (
    <img className='marrow-item marrow-img' ref={animeRoot} src={src} />
  )
}
