import { useCallback, useEffect, useRef, useState } from 'react'

interface Options {
  speed: number
  duration: number
  total: number
  autoPlay?: boolean
  onBeforeChange?: (from: number, to: number) => void
  onAfterChange?: (current: number) => void
}

export default function usePageTurn({ speed, duration, total, autoPlay, onBeforeChange, onAfterChange }: Options) {
  const [current, setCurrent] = useState(0)
  const [factCurrent, setFactCurrent] = useState(0)
  const [_speed, setSpeed] = useState(0)

  const currentRef = useRef(0)
  const totalRef = useRef(total)
  const timer = useRef<number | NodeJS.Timeout>()

  useEffect(() => {
    totalRef.current = total
  }, [total])

  const goTo = useCallback(
    (slideNumber: number, useAnimate: boolean) => {
      if (slideNumber === currentRef.current) return

      let _slideNumber = slideNumber
      if (slideNumber < -1) {
        _slideNumber = -1
      } else if (slideNumber > totalRef.current) {
        _slideNumber = totalRef.current
      }

      if (useAnimate) {
        setSpeed(speed)
      }

      let factSlideNumber = _slideNumber
      if (totalRef.current === _slideNumber) {
        factSlideNumber = 0
      } else if (_slideNumber === -1) {
        factSlideNumber = totalRef.current - 1
      }

      onBeforeChange?.(currentRef.current, factSlideNumber)
      setCurrent(_slideNumber)
      setFactCurrent(factSlideNumber)
      currentRef.current = _slideNumber

      setTimeout(() => {
        onAfterChange?.(factSlideNumber)
        setSpeed(0)
        setTimeout(() => {
          if (totalRef.current === _slideNumber) {
            setCurrent(0)
            currentRef.current = 0
          } else if (_slideNumber === -1) {
            setCurrent(totalRef.current - 1)
            currentRef.current = totalRef.current - 1
          }
        }, 100)
      }, speed)
    },
    [speed, onBeforeChange, onAfterChange]
  )

  const next = useCallback(() => {
    goTo(currentRef.current + 1, true)
  }, [goTo])

  const prev = useCallback(() => {
    goTo(currentRef.current - 1, true)
  }, [goTo])

  const pause = useCallback(() => {
    if (timer.current === undefined) return

    clearInterval(timer.current)
    timer.current = undefined
  }, [])

  const start = useCallback(() => {
    if (!duration) return
    pause()

    timer.current = setInterval(() => {
      next()
    }, duration)
  }, [next, duration])

  useEffect(() => {
    if (autoPlay) {
      start()
    }
    pause()
  }, [autoPlay])

  return { current, factCurrent, _speed, setSpeed, goTo, next, prev, pause, start }
}
