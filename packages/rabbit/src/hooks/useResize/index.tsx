import { useState, useRef, useEffect, useCallback } from 'react'
import useDebounceAndThrottle from '../useDebounceAndThrottle'

import './index.scss'

export default function useResize() {
  const [width, setWidth] = useState<number>()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const changeSize = useCallback(() => {
    setWidth(oldWidth => {
      if (!iframeRef.current) return oldWidth
      const width = iframeRef.current.offsetWidth
      return width
    })
  }, [])

  const resizeCb = useDebounceAndThrottle(changeSize)

  useEffect(() => {
    if (!iframeRef.current) return
    iframeRef.current.setAttribute('class', 'rabbit-table-iframe')
    iframeRef.current.contentWindow?.addEventListener('resize', resizeCb)

    setWidth(iframeRef.current.offsetWidth)
  }, [iframeRef.current])

  return {
    width,
    iframeRef
  }
}
