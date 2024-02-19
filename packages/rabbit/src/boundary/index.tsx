import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'

import { BoundaryProps, BoundaryContainerProps } from '../types/boundary'
import Container from './container'
import Handle from './handle'
import { BoundaryContext, BoundaryProvider } from './context'
import useResize from '../hooks/useResize'
import useChangeCallback from './useChangeCallback'

import './index.scss'

function Boundary({ direction = 'row', children, className, splitLineColor, minSpan, onLayoutChange, ...extra }: BoundaryProps) {
  const [context, setContext] = useState<Omit<BoundaryContext, 'updateContext'>>({
    totalPixel: 0,
    direction,
    originContainers: {},
    containers: {},
  })

  useChangeCallback({ fn: onLayoutChange, params: [context.containers, context.totalPixel] })

  const { domRef, width, height } = useResize<HTMLDivElement>()

  useEffect(() => {
    const totalPixel = direction === 'row' ? width : height

    setContext((old) => ({ ...old, direction, totalPixel }))
  }, [direction, width, height])

  const contextValue: BoundaryContext = useMemo(
    () => ({
      ...context,
      updateContext: setContext,
    }),
    [context]
  )

  return (
    <BoundaryProvider value={contextValue}>
      <div
        ref={domRef}
        className={classNames('rabbit-component', 'rabbit-boundary-wrapper', `direction-${direction}`, className)}
        {...extra}>
        {React.Children.map(children, (child, index) => {
          if (isContainerNode(child)) {
            return (
              <>
                {React.cloneElement(child, { _order: index, minSpan: child.props.minSpan || minSpan })}
                <Handle
                  _order={index}
                  lineColor={splitLineColor}
                />
              </>
            )
          }
          return child
        })}
      </div>
    </BoundaryProvider>
  )
}

function isContainerNode(child: React.ReactNode): child is React.ReactElement<BoundaryContainerProps, string | React.JSXElementConstructor<any>> {
  if (React.isValidElement(child) && child.type === Container) return true

  console.error('Boundary 中出现非 Boundary.Container组件, 可能会导致布局错误')
  return false
}

Boundary.Container = Container

export default Boundary
