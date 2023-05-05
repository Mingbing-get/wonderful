import React, { useRef, useState, useEffect } from 'react'
import classNames from 'classnames'

import Loading from '../loading'
import useVirtualScrollY from '../hooks/useVirtualScrollY'
import { ListProps } from '../types/list'
import './index.scss'

export default function List({ className, style, itemClassName, itemStyle, items, virtualScroll, loadMore }: ListProps) {
  const [touchBottom, setTouchBottom] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const listItemsRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const lastTouchBottom = useRef(0)

  const { handleScroll, startShow, endShow, wrapperStyle, itemsStyle } = useVirtualScrollY(items.length, virtualScroll)

  useEffect(() => {
    setLoading(false)
  }, [items.length])

  useEffect(() => {
    const hasMore = !!loadMore?.total && items.length < loadMore.total
    setHasMore(hasMore)
  }, [items, loadMore])

  useEffect(() => {
    if (!loadingRef.current) return

    loadingRef.current.style.height = `${loadingRef.current.offsetHeight}px`
  }, [loadingRef.current])

  function handleWrapperScroll(e: React.UIEvent<HTMLDivElement>) {
    handleScroll(e)

    if (!listItemsRef.current || lastTouchBottom.current !== 0 || !loadMore) return
    let flag = false
    if (Math.abs(e.currentTarget.scrollTop + e.currentTarget.offsetHeight - listItemsRef.current.offsetHeight) < 20) {
      setTouchBottom(true)
      flag = true

      if (!loadMore.action && (!loadMore.total || loadMore.total > items.length)) {
        handleLoadMore()
      }
    } else if (touchBottom) {
      setTouchBottom(false)
      flag = true
    }

    if (flag) {
      lastTouchBottom.current++
      setTimeout(() => {
        requestAnimationFrame(() => {
          lastTouchBottom.current--
        })
      }, 60)
    }
  }

  function handleLoadMore() {
    setLoading(true)
    loadMore?.onLoad()
  }

  return (
    <div
      className={classNames('rabbit-list-wrapper', className)}
      style={{ ...style, ...wrapperStyle }}
      onScroll={handleWrapperScroll}>
      <div
        ref={listItemsRef}
        className="list-items"
        style={itemsStyle}>
        {items.slice(startShow, endShow).map((item) => (
          <div
            key={item.key}
            className={classNames('list-item', itemClassName)}
            style={itemStyle}>
            {item.component}
          </div>
        ))}
      </div>
      {touchBottom &&
        loadMore &&
        (!hasMore ? (
          <div className="rabbit-list-not-more">{loadMore.notMore || '没有更多...'}</div>
        ) : loading ? (
          <div
            className="rabbit-list-loading"
            ref={loadingRef}>
            {loadMore.loading || <Loading />}
          </div>
        ) : (
          <div
            className="rabbit-list-load-more"
            onClick={handleLoadMore}>
            {loadMore.action}
          </div>
        ))}
    </div>
  )
}
