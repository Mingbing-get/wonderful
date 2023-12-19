import React, { ForwardedRef, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'

import compatible from '../../compatible'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  wrapperStyle?: React.CSSProperties
  itemsStyle?: React.CSSProperties
  dragTipStyle?: React.CSSProperties
  showLine?: boolean
  deep: number
  renderItems: React.ReactNode[]
  lineOffset: number
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void
}

function TreeWrapper(
  { className, style, itemsStyle, wrapperStyle, dragTipStyle, showLine, deep, renderItems, lineOffset, onScroll, ...extra }: Props,
  ref?: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      {...extra}
      ref={ref}
      className={classNames('rabbit-tree-wrapper', 'rabbit-component', className)}
      style={{ ...style, ...wrapperStyle }}
      onScroll={onScroll}>
      {showLine && (
        <div className="tree-lines">
          {new Array(deep).fill(0).map((_, index) => (
            <div
              key={index}
              className="tree-line"
              style={{ left: `calc(${index}rem + ${lineOffset}px)` }}
            />
          ))}
        </div>
      )}
      <div
        className="tree-items"
        style={itemsStyle}>
        {renderItems}
      </div>
      {dragTipStyle &&
        createPortal(
          <div
            className="tree-drag-tip rabbit-component"
            style={dragTipStyle}>
            <span className="circle"></span>
            <span className="line"></span>
          </div>,
          compatible.getBody()
        )}
    </div>
  )
}

export default forwardRef(TreeWrapper)
