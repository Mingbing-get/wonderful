import React, { useRef, useState, useCallback, useEffect } from 'react'

export type VirtualScroll = {
  height: number,
  itemHeight: number,
}

export default function useVirtualScroll(itemLength: number, virtualScroll?: VirtualScroll) {
  const showCount = useRef(0)
  const [startShow, setStartShow] = useState(0)
  const [wrapperStyle, setWrapperStyle] = useState<React.CSSProperties>({})
  const [itemsStyle, setItemsStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    if (!virtualScroll) return

    showCount.current = Math.ceil(virtualScroll.height / virtualScroll.itemHeight) * 3
    setWrapperStyle({
      overflowY: 'auto',
      height: virtualScroll.height
    })
  }, [virtualScroll])

  useEffect(() => {
    if (!virtualScroll) return

    setItemsStyle({
      height: itemLength * virtualScroll.itemHeight,
      paddingTop: startShow * virtualScroll.itemHeight,
      '--tree-item-height': `${virtualScroll.itemHeight}px`} as React.CSSProperties)
  }, [virtualScroll, itemLength, startShow])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (!virtualScroll) return
    e.stopPropagation()

    const count = Math.ceil(virtualScroll.height / virtualScroll.itemHeight)
    const minTop = count * virtualScroll.itemHeight

    const newStartShow = Math.floor(Math.floor(Math.max(0, e.currentTarget.scrollTop - minTop) / virtualScroll.itemHeight) / count) * count
    if (newStartShow === startShow) return
    setStartShow(newStartShow)
  }, [virtualScroll, startShow])

  return {
    handleScroll,
    startShow,
    endShow: virtualScroll ? startShow + showCount.current : undefined,
    wrapperStyle,
    itemsStyle,
  }
}
