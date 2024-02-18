import React, { useMemo, useState, useRef, useImperativeHandle, useCallback } from 'react'
import classNames from 'classnames'

import Icon from '../icon'
import useResize from '../hooks/useResize'
import { CarouselProps, CarouselRef } from '../types/carousel'

import { computedCarouselItems } from './computedCarouselItems'
import usePageTurn from './usePageTurn'

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
  const [offset, setOffset] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  const touchStart = useRef(-1)

  const { width: carouselShowWidth, domRef: wrapperRef } = useResize<HTMLDivElement>()
  const { current, factCurrent, _speed, setSpeed, goTo, next, prev, pause, start } = usePageTurn({
    speed,
    duration,
    total: totalPage,
    autoPlay,
    onBeforeChange: beforeChange,
    onAfterChange: afterChange,
  })

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

  const carouselItems = useMemo(() => {
    if (!children) return

    const items = computedCarouselItems(children as React.ReactElement[], slidesToRows, slidesToColumns, carouselShowWidth, factCurrent)
    setTotalPage(items.length - 2)
    return items
  }, [children, slidesToRows, slidesToColumns, carouselShowWidth, factCurrent])

  const singlePlayShow = useMemo(() => {
    if (singlePlay || carouselItems?.length || 0 > 3) {
      start()
      return true
    }
    pause()
    return false
  }, [singlePlay, carouselItems])

  const handleNext = useCallback(() => {
    next()
    start()
  }, [next, start])

  const handlePrev = useCallback(() => {
    prev()
    start()
  }, [prev, start])

  const handleGoTo = useCallback(
    (slideNumber: number) => {
      goTo(slideNumber, true)
      start()
    },
    [goTo, start]
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation()
      if (effect === 'fade') return

      touchStart.current = (e.targetTouches || e.touches)[0].clientX
      pause()
      setSpeed(0)
    },
    [effect, pause]
  )

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.stopPropagation()
    if (touchStart.current === -1) return

    setOffset((e.targetTouches || e.touches)[0].clientX - touchStart.current)
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation()
      if (touchStart.current === -1) return

      start()
      setOffset(0)
      setSpeed(speed)

      const dis = Math.abs(e.changedTouches[0].clientX - touchStart.current)

      if (dis < carouselShowWidth / 3) {
        touchStart.current = -1
        return
      }

      if (e.changedTouches[0].clientX < touchStart.current) {
        next()
      } else {
        prev()
      }
      touchStart.current = -1
    },
    [start, next, prev, carouselShowWidth]
  )

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
          {new Array(totalPage).fill(1).map((_, index) => (
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
