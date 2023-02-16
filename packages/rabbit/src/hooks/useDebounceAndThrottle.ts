import { useRef, useCallback } from 'react'

export default function useDebounceAndThrottle<T extends any[]>(cb: (...augment: T) => any, delay: number = 60) {
  const timerRef = useRef<number>()
  const timer1Ref = useRef<boolean>()

  const fn = useCallback((...augment: T) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(cb, delay, ...augment)

    if (timer1Ref.current) return
    timer1Ref.current = true
    cb(...augment)
    setTimeout(() => {
      timer1Ref.current = false
    }, delay)
  }, [cb])

  return fn
}
