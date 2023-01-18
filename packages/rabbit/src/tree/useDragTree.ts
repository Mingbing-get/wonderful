import React, { useRef, useState, useCallback } from 'react'

import { LinkTreeNode, InnerLocation } from '../hooks/useTree/index.d'
import { TreeNode } from './index'

type Props = {
  expandHandleWidth: number,
  draggleHandleWidth: number,
  stopTimeToChildren?: number,
  canMove?: (node: LinkTreeNode<TreeNode>, target: LinkTreeNode<TreeNode>, innerLocation: InnerLocation) => boolean, 
  onMove?: (node: LinkTreeNode<TreeNode>, target: LinkTreeNode<TreeNode>, innerLocation: InnerLocation) => void,
}

export default function useDragTree({
  expandHandleWidth,
  draggleHandleWidth,
  stopTimeToChildren = 2000,
  canMove,
  onMove
}: Props) {
  const expandHandleWidthRef = useRef(expandHandleWidth)
  const draggleHandleWidthRef = useRef(draggleHandleWidth)
  const dragLinkNode = useRef<LinkTreeNode<TreeNode>>()
  const dragTipStyleRef = useRef<React.CSSProperties>()
  const stopLongTime = useRef(false)
  const canMoveRef = useRef(false)
  const timer = useRef(0)
  const innerLocation = useRef<InnerLocation>()
  const [dragTipStyle, setDragTipStyle] = useState<React.CSSProperties>()

  expandHandleWidthRef.current = expandHandleWidth
  draggleHandleWidthRef.current = draggleHandleWidth

  const setTipStyle = useCallback((style?: React.CSSProperties) => {
    dragTipStyleRef.current = style
    setDragTipStyle(style)
  }, [])

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, linkNode: LinkTreeNode<TreeNode>) => {
    dragLinkNode.current = linkNode
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>, linkNode: LinkTreeNode<TreeNode>) => {
    e.preventDefault()
    if (linkNode === dragLinkNode.current || !dragLinkNode.current) {
      setTipStyle(undefined)
      return
    }

    const { top, height, left, width } = e.currentTarget.getBoundingClientRect()
    const y = e.clientY
    const isTop = y - top < height / 2

    innerLocation.current = isTop ? 'before' : (stopLongTime.current ? 'children' : 'after')
    canMoveRef.current = canMove?.(dragLinkNode.current, linkNode, innerLocation.current) === true

    const curStyle = {
      top: isTop ? top : top + height,
      left: left,
      width: width,
      '--bg-color': canMoveRef.current ? 'var(--rabbit-primary-color)' : 'var(--rabbit-disabled-color)'
    }

    if (curStyle.top === dragTipStyleRef.current?.top) {
      if (stopLongTime.current) {
        curStyle.left += (expandHandleWidthRef.current + draggleHandleWidthRef.current)
        curStyle.width -= (expandHandleWidthRef.current + draggleHandleWidthRef.current)
      }
      if (!isTop && (curStyle.width !== dragTipStyleRef.current?.width || curStyle.left !== dragTipStyleRef.current?.left)) {
        setTipStyle(curStyle)
      }
      return
    }

    stopLongTime.current = false
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      stopLongTime.current = true
    }, stopTimeToChildren)
    setTipStyle(curStyle)
  }, [stopTimeToChildren])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setTipStyle(undefined)
    stopLongTime.current = false
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, linkNode: LinkTreeNode<TreeNode>) => {
    e.preventDefault()
    setTipStyle(undefined)
    stopLongTime.current = false
    if (!dragLinkNode.current || !innerLocation.current || !canMoveRef.current) return

    onMove?.(dragLinkNode.current, linkNode, innerLocation.current)
  }, [onMove])

  return {
    dragTipStyle,
    handleDragOver,
    handleDragStart,
    handleDragLeave,
    handleDrop
  }
}
