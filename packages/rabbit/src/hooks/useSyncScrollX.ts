import { useEffect, useState, useRef, useCallback } from 'react'
import useDebounceAndThrottle from './useDebounceAndThrottle'

export default function useSyncScrollX(domList: (HTMLDivElement | null)[]) {
  const [scrollX, setScrollX] = useState(0)
  const domListRef = useRef(domList)

  const changeScrollX = useCallback((e: Event) => {
    const left = (e.target as HTMLDivElement).scrollLeft

    setScrollX(old => {
      if (old === left) return old
      domListRef.current.forEach(dom => {
        if (!dom) return
        dom.scrollLeft = left
      })
      return left
    })
  }, [])

  const scrollCb = useDebounceAndThrottle(changeScrollX)

  useEffect(() => {
    domListRef.current = domList

    domList.forEach(dom => {
      dom?.removeEventListener('scroll', scrollCb)
      dom?.addEventListener('scroll', scrollCb)
    })
  }, [domList])

  return {
    scrollX
  }
}
