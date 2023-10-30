import { useState, useRef, useEffect } from 'react'
import compatible from '../../compatible'

export default function useResize<T extends HTMLElement>() {
  const [width, setWidth] = useState<number>(0)
  const resizeObserverRef = useRef<ResizeObserver>()
  const domRef = useRef<T>(null)

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target !== domRef.current) {
          continue
        }

        if (entry.contentBoxSize) {
          setWidth(entry.contentBoxSize[0].inlineSize)
        } else {
          setWidth(entry.contentRect.width)
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
    })
  }, [domRef.current])

  return {
    width,
    domRef,
  }
}
