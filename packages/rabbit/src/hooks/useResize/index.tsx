import { useState, useRef, useEffect } from 'react'
import compatible from '../../compatible'

export default function useResize<T extends HTMLElement>() {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const resizeObserverRef = useRef<ResizeObserver>()
  const domRef = useRef<T>(null)

  useEffect(() => {
    if (typeof ResizeObserver !== 'function') return

    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target !== domRef.current) {
          continue
        }

        if (entry.contentBoxSize) {
          setWidth(entry.contentBoxSize[0].inlineSize)
          setHeight(entry.contentBoxSize[0].blockSize)
        } else {
          setWidth(entry.contentRect.width)
          setHeight(entry.contentRect.height)
        }
      }
    })

    return () => {
      resizeObserverRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!domRef.current) return

    resizeObserverRef.current?.observe(domRef.current)
    compatible.getBoundingClientRect(domRef.current).then((domRect) => {
      setWidth(domRect.width)
      setHeight(domRect.height)
    })
  }, [domRef.current])

  return {
    height,
    width,
    domRef,
  }
}
