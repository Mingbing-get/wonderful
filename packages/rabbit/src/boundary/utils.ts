import { ContainerInfo } from './context'

export function computedSpan(containers: Record<string, ContainerInfo>) {
  const symbolKeys = Object.keys(containers)
  if (symbolKeys.length === 0) return {}

  let zeroCount = 0
  const newValue: Record<string, number> = {}
  const total = symbolKeys.reduce((total: number, key) => {
    if (containers[key].span === 0) zeroCount++
    return total + containers[key].span
  }, 0)

  if (total === 0) {
    for (const key of symbolKeys) {
      newValue[key] = (1 / symbolKeys.length) * 100
    }
  } else if (total < 100) {
    const scale = zeroCount === 0 ? 100 / total : 1
    const zeroSpan = zeroCount === 0 ? 0 : (100 - total) / zeroCount

    for (const key of symbolKeys) {
      newValue[key] = containers[key].span === 0 ? zeroSpan : containers[key].span * scale
    }
  } else {
    const scale = 100 / total

    for (const key of symbolKeys) {
      newValue[key] = containers[key].span * scale
    }
  }

  return newValue
}

export function findCurrentKeyAndNextKey(containers: Record<string, ContainerInfo>, order: number) {
  const symbols = Object.keys(containers)

  let currentKey: string | undefined
  let nextKey: string | undefined
  let nextOrder = Infinity
  for (const key of symbols) {
    if (containers[key].order === order) {
      currentKey = key
    }
    if (containers[key].order > order && nextOrder > containers[key].order) {
      nextKey = key
      nextOrder = containers[key].order
    }
  }

  return { currentKey, nextKey }
}
