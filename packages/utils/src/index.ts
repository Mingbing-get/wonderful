import { MARROW_ID_NAME, OUTER_ID } from './constants'

import { Marrow, MarrowContainer, StartStyle, TransformType, TransformAllType } from '@marrow/global'
import React from 'react'

export {
  MARROW_ID_NAME,
  OUTER_ID
}

// 根据位置获取处于当前位置上的所有marrow的id
export function getMarrowIdsByLocation(x: number, y: number): string[] {
  const elements = document.elementsFromPoint(x, y)
  return elements.reduce((total: string[], item) => {
    if (isElementButNotBodyOrHtml(item) && item.style.opacity !== '0') {
      const narrowId = item.getAttribute(MARROW_ID_NAME)
      if (narrowId) {
        total.push(narrowId)
      }
    }

    return total
  }, [])
}

// 判断当前element是不是body以内的元素
export function isElementButNotBodyOrHtml(element: Element): element is HTMLElement {
  return !!element.tagName && !['BODY', 'HTML'].includes(element.tagName)
}

// 遍历marrow
export function eachMarrow(data: Marrow[], fn: (marrow: Marrow) => boolean | void) {
  const stack: Marrow[] = [...data]
  let item = stack.pop()
  while (item) {
    if (fn(item)) break

    if (item?.type === 'container' && item.children) {
      stack.push(...item.children)
    }
    item = stack.pop()
  }
}

// 遍历marrow只暴露有孩子的节点
export function eachMarrowByHasChildren(data: Marrow[], fn: (marrow: Marrow, index: number, parent?: Marrow) => boolean | void) {
  const hasChildrenStack: Marrow[] = []
  for (let i = 0; i < data.length; i++) {
    if (fn(data[i], i)) return

    if (hasChildren(data[i])) {
      hasChildrenStack.push(data[i])
    }
  }

  while (hasChildrenStack.length > 0) {
    const item = hasChildrenStack.pop()
    if (item?.type !== 'container' || !item.children) continue

    for (let i = 0; i < item.children.length; i++) {
      if (fn(item.children[i], i, item)) return

      if (hasChildren(item.children[i])) {
        hasChildrenStack.push(item.children[i])
      }
    }
  }
}

// 根据id获取当前的marrow
export function getMarrowById(data: Marrow[], id: string): Marrow | undefined {
  let res: Marrow | undefined = undefined

  eachMarrow(data, (marrow: Marrow) => {
    if (marrow.id === id) {
      res = marrow
      return true
    }
  })

  return res
}

// 根据ids获取所有的marrow
export function getMarrowsByIds(data: Marrow[], ids: string[]): Marrow[] {
  const res: Marrow[] = []

  if (ids.length === 0) {
    return res
  }

  eachMarrow(data, (marrow: Marrow) => {
    if (ids.includes(marrow.id)) {
      res.push(marrow)
      if (res.length === ids.length) return true
    }
  })

  return res
}

// 获取所有可以包含children的容器
export function getAllIncludeChildren(data: Marrow[]): Marrow[] {
  const res: Marrow[] = [
    {
      id: OUTER_ID,
      name: '最外层容器',
      type: 'container',
      elementName: '容器',
    }
  ]

  eachMarrow(data, (marrow: Marrow) => {
    if (['container'].includes(marrow.type)) {
      res.push(marrow)
    }
  })

  return res
}

export function getCurrentMarrowParentId(data: Marrow[], curMarrowId: string): string {
  let parentId = ''
  eachMarrowByHasChildren(data, (item, i, parent) => {
    if (item.id === curMarrowId) {
      if (parent) {
        parentId = parent.id
      } else {
        parentId = OUTER_ID
      }
      return true
    }
  })

  return parentId
}

// 替换当前id的marrow
export function replaceMarrow(data: Marrow[], id: string, newMarrow?: Marrow): boolean {
  const replaceMarrow: Marrow[] = []
  if (newMarrow) {
    replaceMarrow.push(newMarrow)
  }

  let flag = false
  eachMarrowByHasChildren(data, (item, i, parent) => {
    if (item.id === id) {
      if (parent) {
        (parent as MarrowContainer).children?.splice(i, 1, ...replaceMarrow)
      } else {
        data.splice(i, 1, ...replaceMarrow)
      }
      flag = true
      return true
    }
  })

  return flag
}

// 插入节点
export function appendChildren(marrow: Marrow, willAppendMarrow: Marrow): boolean {
  if (marrow.type !== 'container') return false

  marrow.children = [...(marrow.children || []), willAppendMarrow]

  return true
}

// 获取当前marrow的name
export function getMarrowName(marrow: Marrow): string {
  return marrow.name || `${marrow.elementName}-${marrow.id}`
}

// 获取最大的zIndex
export function getMaxZIndex(data: Marrow[]): number {
  let zIndex = 0
  eachMarrow(data, (marrow) => {
    if (marrow.startStyle?.zIndex && marrow.startStyle.zIndex > zIndex) {
      zIndex = marrow.startStyle.zIndex as number
    }
  })

  return zIndex
}

// 获取最小的zIndex
export function getMinZIndex(data: Marrow[]): number {
  let zIndex = -1
  eachMarrow(data, (marrow) => {
    if (marrow.startStyle?.zIndex && marrow.startStyle.zIndex < zIndex) {
      zIndex = marrow.startStyle.zIndex as number
    }
  })

  return zIndex
}

// 根据path修改值
export function changeObjectByPath<T extends Record<string, any>>(object: T, path: (string | number)[], value: any): T {
  if (path.length === 1) {
    return { ...object, [path[0]]: value }
  }

  let parent: any
  let cur: any = object
  path.forEach((key, index) => {
    if (index === path.length - 1) {
      parent[path[path.length - 2]] = { ...cur, [key]: value }
    } else {
      const curType = Object.prototype.toString.call(cur)
      if (curType === '[object Object]') {
        cur = { ...cur }
      } else if (curType === '[object Array]') {
        cur = [...cur]
      } else {
        return object
      }

      if (index === 0) {
        object = cur
      } else {
        parent[path[index - 1]] = cur
      }
      
      parent = cur
      cur = cur[key]
    }
  })

  return object
}

// 去掉单位(最后面的非数字)
export function replaceUnit(str: string): string {
  return str.replace(/[^\d]*$/, '')
}

// 合并transform
export function mergeTransform(style?: StartStyle): React.CSSProperties | undefined {
  // 'translateX' | 'translateY' | 'translateZ' | 'scaleX' | 'scaleY' | 'rotateX' | 'rotateY' | 'rotateZ'
  if (!style || style.transform) {
    return style
  }

  const copyStyle = { ...style }
  const updateMap: Record<TransformType, [TransformAllType, number]> = {
    translateX: ['translate', 0],
    translateY: ['translate', 1],
    translateZ: ['translate', 2],
    scaleX: ['scale', 0],
    scaleY: ['scale', 1],
    rotateX: ['rotate', 0],
    rotateY: ['rotate', 1],
    rotateZ: ['rotate', 2]
  }
  const transform: Record<TransformAllType, (number | string)[]> = {
    translate: [0, 0, 0],
    scale: [1, 1, 1],
    rotate: [0, 0, 0]
  }

  for (const _key in updateMap) {
    const key = _key as TransformType
    if (copyStyle[key]) {
      const [type, index] = updateMap[key]
      transform[type][index] = copyStyle[key] || transform[type][index]
      delete copyStyle[key]
    }
  }

  let transformStr = ''
  for (const _key in transform) {
    const key = _key as TransformAllType
    transformStr += `${key}X(${transform[key][0]}) ${key}Y(${transform[key][1]}) ${key}Z(${transform[key][2]}) `
  }

  copyStyle.transform = transformStr

  return copyStyle
}

// 生成style字符串
export function createStyle(style?: StartStyle): string {
  if (!style) return ''

  const _style = mergeTransform(style)
  const styleArr: string[] = []
  for (const key in _style) {
    styleArr.push(`${upperToMiddleLine(key)}: ${(_style as any)[key]}`)
  }

  return styleArr.join(';')
}

// 将驼峰转中划线
export function upperToMiddleLine(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 阻止冒泡
export function stopPropagation(e: React.MouseEvent, handle?: (e: React.MouseEvent) => void) {
  handle?.(e)
  e.stopPropagation()
  return false
}

// 判断是否有children
export function hasChildren(marrow: Marrow): boolean {
  return marrow.type === 'container' && !!marrow.children
}

// 生成随机ID
export function generateId(): string {
  return `${new Date().getTime()}-${Math.floor(Math.random() * 100000000)}`
}

// 获取最外层容器
export function getBuildContainer(): HTMLElement {
  return document.querySelector('.marrow-build-wrapper') as HTMLElement
}
