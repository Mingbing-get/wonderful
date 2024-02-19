import React, { useCallback, useContext, useEffect, useMemo } from 'react'

import { BoundaryDirection } from '../types/boundary'

import { computedSpan, findCurrentKeyAndNextKey } from './utils'

export interface ContainerInfo {
  span: number
  order: number
  minSpan?: number
}

export type BoundaryContext = {
  totalPixel: number
  direction: BoundaryDirection
  originContainers: Record<string, ContainerInfo>
  containers: Record<string, number>
  updateContext: React.Dispatch<React.SetStateAction<Omit<BoundaryContext, 'updateContext'>>>
}

const ConfigContext = React.createContext<BoundaryContext>({
  totalPixel: 0,
  direction: 'row',
  originContainers: {},
  containers: {},
  updateContext: () => {},
})

export function useBoundaryContainer(key: string, info: ContainerInfo) {
  const { direction, containers, updateContext } = useContext(ConfigContext)

  useEffect(() => {
    updateContext((old) => {
      if (old.originContainers[key]) return old

      const newContainers = { ...old.originContainers, [key]: info }
      return { ...old, originContainers: newContainers, containers: computedSpan(newContainers) }
    })
  }, [key, updateContext])

  return { direction, span: containers[key] || 0 }
}

export function useBoundaryHandle(order: number) {
  const { direction, totalPixel, originContainers, containers, updateContext } = useContext(ConfigContext)

  const { currentKey, nextKey } = useMemo(() => {
    return findCurrentKeyAndNextKey(originContainers, order)
  }, [originContainers, order])

  const { min, max } = useMemo(() => {
    const currentMin = currentKey ? originContainers[currentKey].minSpan || 0 : 0
    const nextMin = nextKey ? originContainers[nextKey].minSpan || 0 : 0

    const min = currentKey ? -((containers[currentKey] - currentMin) * totalPixel) / 100 : 0
    const max = nextKey ? ((containers[nextKey] - nextMin) * totalPixel) / 100 : -1

    return { min, max }
  }, [totalPixel, currentKey, nextKey, containers, originContainers])

  const handleUpdateSpan = useCallback(
    (offset: number) => {
      if (!currentKey || !nextKey) return

      const offsetSpan = (offset / totalPixel) * 100

      updateContext((old) => {
        const newContainers = { ...old.containers }
        newContainers[currentKey] += offsetSpan
        newContainers[nextKey] -= offsetSpan

        return { ...old, containers: newContainers }
      })
    },
    [currentKey, nextKey, totalPixel, updateContext]
  )

  return { direction, min, max, handleUpdateSpan }
}

export const BoundaryProvider = ConfigContext.Provider
