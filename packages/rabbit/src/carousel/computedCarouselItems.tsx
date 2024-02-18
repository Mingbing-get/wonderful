import React from 'react'
import classNames from 'classnames'

export function computedCarouselItems(children: React.ReactNode[], slidesToRows: number, slidesToColumns: number, carouselShowWidth: number, current: number) {
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
