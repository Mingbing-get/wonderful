import React, { useEffect } from 'react'
import anime from 'animejs'
import { MARROW_ID_NAME, createStyle } from '@marrow/utils'

import { Animation, TimeLineParams, StartStyle } from '@marrow/global'
import { useRenderMarrow } from '../../context'

export type Props = {
  id: string,
  animeRoot: React.RefObject<HTMLElement>,
  animation?: Animation[],
  timeLineParams?: TimeLineParams,
  startStyle?: StartStyle,
  appearTime?: number,
  completeIsDestroy?: boolean
}

export default function useAnime({
  id,
  animeRoot,
  animation,
  timeLineParams = {},
  startStyle,
  appearTime,
  completeIsDestroy
}: Props) {
  const { marrowController } = useRenderMarrow()

  useEffect(() => {
    if (!animeRoot.current) return

    // 重置样式
    animeRoot.current.setAttribute('style', createStyle(appearTime ? { ...(startStyle || {}), opacity: 0 } : startStyle))
    const animate = anime.timeline({
      targets: animeRoot.current,
      autoplay: marrowController.getAutoPlay(),
      ...timeLineParams,
    })

    if (appearTime) {
      animate.add({
        duration: 1,
        delay: appearTime - 1,
        opacity: startStyle?.opacity || 1
      })
    }

    animation?.forEach(frame => {
      animate.add(frame)
    })

    marrowController.addOrReplace(id, animate, {
      startStyle: startStyle,
      target: animeRoot.current,
      appearTime: appearTime,
      completeIsDestroy: completeIsDestroy
    })
  }, [id, animeRoot.current, timeLineParams, animation, startStyle])

  useEffect(() => {
    if (!animeRoot.current) return

    animeRoot.current.setAttribute(MARROW_ID_NAME, id)
  }, [id, animeRoot.current])
}
