
export function getLocation(dom: HTMLElement) {
  let top = dom.offsetTop + dom.clientTop - dom.scrollTop
  let left = dom.offsetLeft + dom.clientLeft - dom.scrollLeft
  let current = dom.parentElement
  while (current) {
    top -= current.scrollTop
    left -= current.scrollLeft
    current = current.parentElement
  }
  
  return {
    top,
    left
  }
}

export type Rem2pxProps = {
  baseWidth?: number,
  baseMobilePx?: number,
  breakPoint?: number,
  pcPx?: number,
}
export function rem2px(clientWidth: number, {
  baseWidth = 320,
  baseMobilePx = 16,
  breakPoint = 720,
  pcPx = 16
}: Rem2pxProps = {}) {
  //用于适配rem，以640为基准，1rem=16px
  if (clientWidth >= breakPoint) {
    document.documentElement.style.fontSize = pcPx + 'px'
  } else {
    document.documentElement.style.fontSize = clientWidth * baseMobilePx / baseWidth + 'px';
  }
}

export type Tree = {
  key: string,
  children?: Tree[],
  [key: string]: any
}
type StackItem<T> = {
  path: string[],
  item: T
}
export function findItemByKeyFromForest<T extends Tree>(forest: T[], key: string): StackItem<T> | undefined {
  const stack = forest.map(tree => ({ path: [tree.key], item: tree }))

  while (stack.length > 0) {
    const curItem = stack.pop()
    if (!curItem) return

    if (curItem.item.key === key) {
      return curItem
    }

    if (!curItem.item.children?.length) continue

    stack.push(...curItem.item.children.map(tree => ({
      path: [...curItem.path, tree.key],
      item: tree as T
    })))
  }
}

export function isFunction<T>(obj: any): obj is T {
  return Object.prototype.toString.call(obj) === '[object Function]'
}

export function isSame(data1: any, data2: any): boolean {
  if (['string', 'symbol', 'boolean', 'undefined'].includes(typeof data1)
    || ['string', 'symbol', 'boolean', 'undefined'].includes(typeof data2)) {
    return data1 === data2
  }

  if (typeof data1 === 'number' || typeof data2 === 'number') {
    if (isNaN(data1)) return isNaN(data2)
    if (isNaN(data2)) return isNaN(data1)

    return data1 === data2
  }

  if (data1 === null || data2 === null) {
    return data1 === data2
  }

  const data1IsArray = Object.prototype.toString.call(data1) === '[object Array]'
  const data2IsArray = Object.prototype.toString.call(data2) === '[object Array]'

  if (data1IsArray !== data2IsArray) return false

  if (!data1IsArray) {
    for (const key in data1) {
      if (!isSame(data1[key], data2[key])) {
        return false
      }
    }
  } else {
    if (data1.length !== data2.length) return false

    const comparedIndex: number[] = []
    for (let i = 0; i < data1.length; i++) {
      const index = (data2 as any[]).findIndex((item, index) => !comparedIndex.includes(index) && isSame(item, data1[i]))
      if (index === -1) return false
      comparedIndex.push(index)
    }
  }

  return true
}
