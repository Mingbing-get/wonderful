import React, { useMemo, useState, useRef, useEffect, useCallback, useImperativeHandle } from 'react'
import classNames from 'classnames'

import Icon from '../icon'
import useResize from '../hooks/useResize'
import { CarouselProps, CarouselRef } from '../types/carousel'

import './index.scss'

function Carousel(
  {
    className,
    style,
    autoPlay = true,
    singlePlay = true,
    speed = 500,
    duration = 5000,
    dotPosition = 'bottom',
    dots = true,
    hiddenSwitchBtn,
    effect = 'scrollX',
    slidesToRows = 1, // 显示多少行
    slidesToColumns = 1, // 显示多少列
    children,
    itemSpace = '1rem',
    customBtn,
    customPaging,
    afterChange,
    beforeChange,
    ...extra
  }: CarouselProps,
  ref?: React.ForwardedRef<CarouselRef>
) {
  const [current, setCurrent] = useState(0)
  const [factCurrent, setFactCurrent] = useState(0)
  const [_speed, setSpeed] = useState(0)
  const [offset, setOffset] = useState(0)

  const currentRef = useRef(0)
  const totalRef = useRef(0)
  const touchStart = useRef(-1)
  const timer = useRef<number | NodeJS.Timeout>()

  const { width: carouselShowWidth, domRef: wrapperRef } = useResize<HTMLDivElement>()

  const carouselItems = useMemo(() => {
    if (!children) return

    const items = computedCarouselItems(children as React.ReactElement[], slidesToRows, slidesToColumns, carouselShowWidth, factCurrent)
    totalRef.current = items.length - 2
    return items
  }, [children, slidesToRows, slidesToColumns, carouselShowWidth, factCurrent])

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

      beforeChange?.(currentRef.current, factSlideNumber)
      setCurrent(_slideNumber)
      setFactCurrent(factSlideNumber)
      currentRef.current = _slideNumber

      setTimeout(() => {
        afterChange?.(factSlideNumber)
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
    [speed, beforeChange, afterChange]
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

  const singlePlayShow = useMemo(() => {
    if (singlePlay || carouselItems?.length || 0 > 3) {
      start()
      return true
    }
    pause()
    return false
  }, [singlePlay, carouselItems])

  useImperativeHandle(
    ref,
    () => ({
      goTo,
      next,
      prev,
      pause,
      start,
    }),
    [goTo, next, prev, pause, start]
  )

  function handleNext() {
    stop()
    next()
    start()
  }

  function handlePrev() {
    stop()
    prev()
    start()
  }

  function handleGoTo(slideNumber: number) {
    stop()
    goTo(slideNumber, true)
    start()
  }

  function handleTouchStart(e: React.TouchEvent) {
    e.stopPropagation()
    if (effect === 'fade') return

    touchStart.current = e.targetTouches[0].clientX
    pause()
    setSpeed(0)
  }

  function handleTouchMove(e: React.TouchEvent) {
    e.stopPropagation()
    if (touchStart.current === -1) return

    setOffset(e.targetTouches[0].clientX - touchStart.current)
  }

  function handleTouchEnd(e: React.TouchEvent) {
    e.stopPropagation()
    if (touchStart.current === -1) return

    start()
    setOffset(0)
    setSpeed(speed)
    touchStart.current = -1

    const dis = Math.abs(e.changedTouches[0].clientX - touchStart.current)
    if (dis < carouselShowWidth / 3) return

    if (e.changedTouches[0].clientX < touchStart.current) {
      next()
    } else {
      prev()
    }
  }

  return (
    <div
      {...extra}
      className={classNames('rabbit-carousel-wrapper', 'rabbit-component', `effect-${effect}`, className)}
      onMouseEnter={() => pause()}
      onMouseLeave={() => start()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={style}
      ref={wrapperRef}>
      <div
        className="carousel-scroll"
        style={
          {
            '--speed': `${_speed / 1000}s`,
            '--item-space': itemSpace,
            transform: effect === 'scrollX' ? `translateX(${-(current + 1) * carouselShowWidth + offset}px)` : '',
          } as React.CSSProperties
        }>
        {carouselItems}
      </div>
      {singlePlayShow && dots && (
        <div className={classNames('carousel-dots', dots, `carousel-position-${dotPosition}`)}>
          {new Array(totalRef.current).fill(1).map((_, index) => (
            <span
              key={index}
              className={classNames(index === factCurrent && 'is-active', 'carousel-dot-box')}
              onClick={() => handleGoTo(index)}>
              {customPaging ? customPaging(index) : <span className="carousel-dot"></span>}
            </span>
          ))}
        </div>
      )}
      {singlePlayShow && !hiddenSwitchBtn && (
        <>
          <div
            className="carousel-switch-prev"
            onClick={() => handlePrev()}>
            {customBtn ? (
              customBtn('prev')
            ) : (
              <Icon
                type="arrowLeft"
                className="carousel-icon-btn"
              />
            )}
          </div>
          <div
            className="carousel-switch-next"
            onClick={() => handleNext()}>
            {customBtn ? (
              customBtn('next')
            ) : (
              <Icon
                type="arrowRight"
                className="carousel-icon-btn"
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default React.forwardRef<CarouselRef, CarouselProps>(Carousel)

function computedCarouselItems(children: React.ReactNode[], slidesToRows: number, slidesToColumns: number, carouselShowWidth: number, current: number) {
  const items: JSX.Element[] = []
  let columnWrapper: React.ReactNode[] = []
  let rowWrapper: JSX.Element[] = []
  let first: JSX.Element | undefined = undefined
  let last: JSX.Element | undefined = undefined

  React.Children.map(children, (child, i) => {
    columnWrapper.push(
      <div
        key={i}
        className="carousel-item">
        {child}
      </div>
    )
    if (columnWrapper.length === slidesToRows) {
      rowWrapper.push(
        <div
          key={i}
          className="carousel-column">
          {columnWrapper}
        </div>
      )
      columnWrapper = []
    }

    if (rowWrapper.length === slidesToColumns) {
      if (items.length === 0) {
        last = (
          <div
            key={(children?.length || 0) + 1}
            className="carousel-show"
            style={{ width: carouselShowWidth }}>
            {rowWrapper}
          </div>
        )
      }

      first = (
        <div
          key={-1}
          className="carousel-show"
          style={{ width: carouselShowWidth }}>
          {rowWrapper}
        </div>
      )

      items.push(
        <div
          key={i}
          className={classNames('carousel-show', items.length === current && 'is-active')}
          style={{ width: carouselShowWidth }}>
          {rowWrapper}
        </div>
      )
      rowWrapper = []
    }
  })

  if (columnWrapper.length > 0) {
    rowWrapper.push(
      <div
        key={children?.length}
        className="carousel-column">
        {columnWrapper}
      </div>
    )
  }

  if (rowWrapper.length > 0) {
    first = (
      <div
        key={-1}
        className="carousel-show"
        style={{ width: carouselShowWidth }}>
        {rowWrapper}
      </div>
    )
    items.push(
      <div
        key={children?.length}
        className="carousel-show"
        style={{ width: carouselShowWidth }}>
        {rowWrapper}
      </div>
    )
  }

  last && items.push(last)
  first && items.unshift(first)

  return items
}
