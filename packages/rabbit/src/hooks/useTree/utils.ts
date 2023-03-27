import { BaseTreeNode, LinkTreeNode, TreeValue, TreeMode, InnerLocation } from './type'

// 将原始Forest转换成LinkForest
export function baseForestToLinkForest<T extends BaseTreeNode>(forest: T[], loadData?: (node: T) => void): LinkTreeNode<T>[] {
  return forest.map(tree => baseTreeToLinkTree(tree, undefined))

  function baseTreeToLinkTree(tree: T, parent?: LinkTreeNode<T>) {
    const newNode: LinkTreeNode<T> = {
      value: tree.value,
      data: tree,
      parent: parent,
      isLeft: loadData ? tree.isLeft : !tree.children?.length,
      disabled: tree.disabled
    }

    if (tree.children) {
      newNode.children = tree.children.map(tree => baseTreeToLinkTree(tree as T, newNode))
    }

    return newNode
  }
}
// 将LinkForest转换成原始的Forest
export function linkForestToBaseForest<T extends BaseTreeNode>(linkForest: LinkTreeNode<T>[]): T[] {
  return linkForest.map(linkTree => linkTreeToBaseTree(linkTree))

  function linkTreeToBaseTree(linkTree: LinkTreeNode<T>) {
    const newNode = linkTree.data
    newNode.children = linkTree.children?.map(linkTree => linkTreeToBaseTree(linkTree))

    return newNode
  }
}
// 设置某一个节点展开(其父节点都会展开)
export function changeExpand<T extends BaseTreeNode>(expandPath: TreeValue[][], linkForest: LinkTreeNode<T>[], loadData?: (node: T) => void) {
  expandPath.forEach(singleExpandPath => {
    let curList: LinkTreeNode<T>[] | undefined = linkForest
    singleExpandPath.forEach(value => {
      if (!curList) return

      const curLinkNode = curList.find(node => node.value === value)
      if (curLinkNode) {
        curLinkNode.isExpand = true
        if (curLinkNode.isLeft) {
          curList = undefined
        } else if (curLinkNode.children) {
          curList = curLinkNode.children
        } else {
          curList = undefined
          loadData?.(curLinkNode.data)
        }
      }
    })
  })
}
// 清空expand
export function clearExpand<T extends BaseTreeNode>(linkForest: LinkTreeNode<T>[]) {
  let curLinkList = linkForest
  while (true) {
    const expandLinkNode = curLinkList.find(node => node.isExpand)
    if (!expandLinkNode) return

    expandLinkNode.isExpand = false

    if (expandLinkNode.children) {
      curLinkList = expandLinkNode.children
    } else {
      return
    }
  }
}
// 从所有选择的路径标记LinkForest哪些节点被选中
export function changeCheckedAll<T extends BaseTreeNode>(multiple: boolean, mode: TreeMode, checkedPath: TreeValue[] | TreeValue[][], linkForest: LinkTreeNode<T>[]) {
  if (isMultiple(multiple, checkedPath)) {
    checkedPath.forEach(singleCheckedPath => {
      if (singleCheckedPath.length !== 0) {
        const curLinkTreeNode = findLinkByProperty(linkForest, 'value', singleCheckedPath[singleCheckedPath.length - 1])
        curLinkTreeNode && changeChecked(multiple, mode, linkForest, curLinkTreeNode, true)
      }
    })
  } else {
    if (checkedPath.length !== 0) {
      const curLinkTreeNode = findLinkByProperty(linkForest, 'value', checkedPath[checkedPath.length - 1])
      curLinkTreeNode && changeChecked(multiple, mode, linkForest, curLinkTreeNode, true)
    }
  }
}
// 从一个选择的节点标记LinkForest哪些节点被选中
export function changeChecked<T extends BaseTreeNode>(multiple: boolean, mode: TreeMode, linkForest: LinkTreeNode<T>[], curLinkTreeNode: LinkTreeNode<T>, checked: boolean) {
  if (multiple) {
    if (mode === 'ordinary') {
      setForestPropertyEffectSingleItem([curLinkTreeNode], 'checked', checked)
      setForestPropertyEffectSingleItem([curLinkTreeNode], 'halfChecked', false)
      resetParent(curLinkTreeNode.parent)
    } else if (mode === 'canCheckedParent') {
      if (checked) {
        curLinkTreeNode.checked = checked
        curLinkTreeNode.halfChecked = false
      } else {
        setForestPropertyEffectSingleItem([curLinkTreeNode], 'checked', false)
        setForestPropertyEffectSingleItem([curLinkTreeNode], 'halfChecked', false)
      }
      resetParent(curLinkTreeNode.parent)
    } else {
      curLinkTreeNode.checked = checked
    }
  } else {
    if (mode === 'ordinary') {
      if (curLinkTreeNode.isLeft) {
        checked && setForestPropertyEffectSingleItem(linkForest, 'checked', false)
        findLinkPath(curLinkTreeNode).forEach(node => node.checked = checked)
      }
    } else {
      checked && setForestPropertyEffectSingleItem(linkForest, 'checked', false)
      findLinkPath(curLinkTreeNode).forEach(node => node.checked = checked)
      curLinkTreeNode.children && setForestPropertyEffectSingleItem(curLinkTreeNode.children, 'checked', false)
    }
  }
}
// 从当前forest开始设置当前key为传递的值
export function setForestPropertyEffectSingleItem<T extends BaseTreeNode, K extends keyof LinkTreeNode<T>, V extends LinkTreeNode<T>[K]>(linkForest: LinkTreeNode<T>[], key: K, value: V) {
  let curForest = linkForest
  while (curForest.length > 0) {
    const effectLinkNodes = curForest.filter(node => node[key] !== value && !node.disabled)

    const _curForest: LinkTreeNode<T>[] = []
    effectLinkNodes.forEach(curLinkNode => {
      curLinkNode[key] = value
      if (curLinkNode.children) {
        _curForest.push(...curLinkNode.children)
      }
    })

    curForest = _curForest
  }
}
// 清空选择
export function clearChecked<T extends BaseTreeNode>(linkForest: LinkTreeNode<T>[]) {
  const stack = [...linkForest]
  while (stack.length > 0) {
    const curLinkNode = stack.pop()
    if (!curLinkNode) continue

    curLinkNode.checked = false
    curLinkNode.halfChecked = false

    if (curLinkNode.children) {
      stack.push(...curLinkNode.children)
    }
  }
}
// 判断是否是多选状态
export function isMultiple<T extends any>(multiple: boolean, checkedPath: T[] | T[][]): checkedPath is T[][] {
  return multiple
}
// 从一个节点找到该节点的路径
export function findLinkPath<T extends BaseTreeNode>(linkTreeNode: LinkTreeNode<T>) {
  const path = [linkTreeNode]

  let curLinkTreeNode = linkTreeNode.parent
  while (!!curLinkTreeNode) {
    path.unshift(curLinkTreeNode)
    curLinkTreeNode = curLinkTreeNode.parent
  }

  return path
}
// 以一个linkNode其中一个属性的值在linkForest中找到当前节点
export function findLinkByProperty<T extends BaseTreeNode, K extends keyof LinkTreeNode<T>, V extends LinkTreeNode<T>[K]>(linkForest: LinkTreeNode<T>[], key: K, data: V) {
  const stack = [...linkForest]

  while (stack.length > 0) {
    const linkTreeNode = stack.pop()
    if (!linkTreeNode) return

    if (linkTreeNode[key] === data) return linkTreeNode

    if (linkTreeNode.children) {
      stack.push(...linkTreeNode.children)
    }
  }

  return
}
// 从LinkForest中获取选中的linkTreeNode的path
export function getCheckedLinkPathFromLinkForest<T extends BaseTreeNode>(multiple: boolean, mode: TreeMode, linkForest: LinkTreeNode<T>[]) {
  if (multiple) {
    const checkedPath: LinkTreeNode<T>[][] = []
    const stack = [...linkForest] 
    while (stack.length > 0) {
      const curLinkNode = stack.pop()
      if (!curLinkNode) continue

      if (curLinkNode.checked) {
        if (mode !== 'canCheckedParent' || (mode === 'canCheckedParent' && !curLinkNode.children?.every(child => child.disabled || child.checked))) {
          checkedPath.push(findLinkPath(curLinkNode))
        }

        if (mode === 'ordinary' && curLinkNode.children?.some(child => child.checked)) continue
      }

      if (curLinkNode.children) {
        stack.push(...curLinkNode.children)
      }
    }
    return checkedPath
  } else {
    const checkedPath: LinkTreeNode<T>[] = []
    let curLinkList = linkForest.find(item => item.checked)
    while (curLinkList) {
      checkedPath.push(curLinkList)
      curLinkList = curLinkList.children?.find(item => item.checked)
    }
    return checkedPath
  }
}
// 从LinkForest中获取展开的linkTreeNode的path
export function getExpandLinkPathFromLinkForest<T extends BaseTreeNode>(linkForest: LinkTreeNode<T>[]) {
  const expandPath: LinkTreeNode<T>[][] = []
  const stack = [...linkForest]
  while (stack.length > 0) {
    const curLinkNode = stack.pop()
    if (!curLinkNode) continue

    if (curLinkNode.isExpand && !curLinkNode.children?.some(child => child.isExpand)) {
      expandPath.push(findLinkPath(curLinkNode))
    }

    if (curLinkNode.children) {
      stack.push(...curLinkNode.children)
    }
  }
  return expandPath
}
// 从LinkForest中的原始数据的指定key上查询指定的字符串
export function searchTextFromBaseTree<T extends BaseTreeNode, K extends keyof T, V extends (T[K] & string)>(linkForest: LinkTreeNode<T>[], keys: K[], searchTexts: V[], mode: TreeMode) {
  const searchRes: LinkTreeNode<T>[][] = []
  const stack = [...linkForest]
  while(stack.length > 0) {
    const curLinkNode = stack.pop()
    if (!curLinkNode) break

    const hasInclude = keys.some((key, i) => `${curLinkNode.data[key]}`.match(new RegExp(searchTexts[i], 'i')))
    if (hasInclude) {
      searchRes.push(...findAllPathAndTileChildren(curLinkNode, mode))
    } else if (curLinkNode.children) {
      stack.push(...curLinkNode.children)
    }
  }
  return searchRes
}
// 获取含有该节点的所有路径(到没有孩子的节点)
export function findAllPathAndTileChildren<T extends BaseTreeNode>(linkTreeNode: LinkTreeNode<T>, mode: TreeMode, parentPath?: LinkTreeNode<T>[]) {
  const _parentPath = parentPath || findLinkPath(linkTreeNode)
  const allPath: LinkTreeNode<T>[][] = []

  if (linkTreeNode.children) {
    if (mode !== 'ordinary') {
      allPath.push(_parentPath)
    }
    linkTreeNode.children?.forEach(child => {
      allPath.push(...findAllPathAndTileChildren(child, mode, [..._parentPath, child]))
    })
  } else {
    allPath.push(_parentPath)
  }

  return allPath
}
// 判断是否可以将某个节点移动到指定位置
export function canMove<T extends BaseTreeNode>(linkForest: LinkTreeNode<T>[], node: LinkTreeNode<T>, target: LinkTreeNode<T>, location: InnerLocation): boolean {
  if (target.disabled && location === 'children') return false

  const targetAncestor = findLinkPath(target)
  if (targetAncestor.includes(node)) return false

  const exitNodeList = node.parent?.children || linkForest
  const index = exitNodeList.findIndex(item => item === node) || 0
  if (location === 'before') {
    if (exitNodeList[index + 1] === target) return false
  } else if (location === 'after') {
    if (exitNodeList[index - 1] === target) return false
  } else {
    const nodeIndex = target.children?.findIndex(item => item === node)
    if (nodeIndex === 0) return false
  }

  return true
}
// 移动某个节点到制定位置
export function move<T extends BaseTreeNode>(linkForest: LinkTreeNode<T>[], multiple: boolean, node: LinkTreeNode<T>, target: LinkTreeNode<T>, location: InnerLocation) {
  const nodeParent = node.parent
  const exitNodeList = node.parent ? node.parent.children as LinkTreeNode<T>[] : linkForest
  const nodeIndex = exitNodeList.findIndex(item => item === node)
  exitNodeList.splice(nodeIndex, 1)
  if (nodeParent) {
    nodeParent.data.children = nodeParent.data.children?.filter(item => item !== node.data)
    if (!nodeParent.data.children?.length) {
      nodeParent.data.children = undefined
      nodeParent.isLeft = true
    }
  }

  if (location === 'children') {
    target.children = [node, ...(target.children || [])]
    target.data.children = [node.data, ...(target.data.children || [])]
    node.parent = target
    target.isLeft = false
    target.isExpand = true
  } else {
    const exitTargetList = target.parent ? target.parent.children as LinkTreeNode<T>[] : linkForest
    const targetIndex = exitTargetList.findIndex(item => item === target)
    if (location === 'before') {
      exitTargetList.splice(targetIndex, 0, node)
    } else {
      exitTargetList.splice(targetIndex + 1, 0, node)
    }

    if (target.parent) {
      node.parent = target.parent
    } else {
      node.parent = undefined
    }
  }

  if (nodeParent) {
    if (multiple) {
      resetParent(nodeParent)
    } else {
      node.checked && findLinkPath(nodeParent).forEach(linkNode => linkNode.checked = false)
    }
  }
  
  if (node.parent) {
    if (multiple) {
      resetParent(node.parent)
    } else {
      node.checked && findLinkPath(node.parent).forEach(linkNode => linkNode.checked = true)
    }
  }

  if (node.isExpand) {
    if (nodeParent) {
      if (!nodeParent?.children?.length) {
        nodeParent.isExpand = false
        nodeParent.children = undefined
      }
    }

    if (node.parent) {
      findLinkPath(node.parent).forEach(linkNode => linkNode.isExpand = true)
    }
  }
}
// 从新计算多选的祖先节点的选中状态
function resetParent<T extends BaseTreeNode>(nodeParent?: LinkTreeNode<T>) {
  if (!nodeParent) return

  findLinkPath(nodeParent).reverse().forEach(linkNode => {
    let halfChecked = false
    let checked = true
    linkNode.children?.forEach(child => {
      if (child.disabled) return

      halfChecked = !!(halfChecked || child.checked || child.halfChecked)
      if (checked) checked = !!child.checked
    })
    linkNode.checked = checked
    linkNode.halfChecked = checked ? false : halfChecked
  })
}
// 将TreeValue的path转换成linkTreeNode的path
export function checkedPathToLinkPath<T extends BaseTreeNode>(multiple: true, checkedPath: TreeValue[] | TreeValue[][], linkForest: LinkTreeNode<T>[]): LinkTreeNode<T>[][]
export function checkedPathToLinkPath<T extends BaseTreeNode>(multiple: false, checkedPath: TreeValue[] | TreeValue[][], linkForest: LinkTreeNode<T>[]): LinkTreeNode<T>[]
export function checkedPathToLinkPath<T extends BaseTreeNode>(multiple: boolean, checkedPath: TreeValue[] | TreeValue[][], linkForest: LinkTreeNode<T>[]) {
  if (isMultiple(multiple, checkedPath)) {
    return checkedPath.map(singlePath => _checkedPathToLinkPath(singlePath, linkForest))
  } else {
    return _checkedPathToLinkPath(checkedPath, linkForest)
  }
}

function _checkedPathToLinkPath<T extends BaseTreeNode>(checkedPath: TreeValue[], linkForest: LinkTreeNode<T>[]) {
  let curLinkForest: LinkTreeNode<T>[] | undefined = linkForest

  const linkPath = checkedPath.reduce((total: LinkTreeNode<T>[], value) => {
    if (!curLinkForest) return total

    const currentLinkTreeNode = curLinkForest.find(linkTree => linkTree.value === value)
    if (currentLinkTreeNode) {
      total.push(currentLinkTreeNode)
      curLinkForest = currentLinkTreeNode.children
    } else {
      curLinkForest = undefined
    }
    return total
  }, [])

  return linkPath
}
// 将linkTreeNode的path转换成TreeValue的path
export function linkPathToCheckedPath<T extends BaseTreeNode>(multiple: true, linkPath: LinkTreeNode<T>[] | LinkTreeNode<T>[][]): TreeValue[][]
export function linkPathToCheckedPath<T extends BaseTreeNode>(multiple: false, linkPath: LinkTreeNode<T>[] | LinkTreeNode<T>[][]): TreeValue[]
export function linkPathToCheckedPath<T extends BaseTreeNode>(multiple: boolean, linkPath: LinkTreeNode<T>[] | LinkTreeNode<T>[][]) {
  if (isMultiple(multiple, linkPath)) {
    return linkPath.map(_linkPathToCheckedPath)
  } else {
    return _linkPathToCheckedPath(linkPath)
  }
}

function _linkPathToCheckedPath<T extends BaseTreeNode>(linkPath: LinkTreeNode<T>[]) {
  return linkPath.map(linkTreeNode => linkTreeNode.value)
}
// 将linkTreeNode的path转换成原始数据的path
export function linkPathToDataPath<T extends BaseTreeNode>(multiple: true, linkPath: LinkTreeNode<T>[] | LinkTreeNode<T>[][]): T[][]
export function linkPathToDataPath<T extends BaseTreeNode>(multiple: false, linkPath: LinkTreeNode<T>[] | LinkTreeNode<T>[][]): T[]
export function linkPathToDataPath<T extends BaseTreeNode>(multiple: boolean, linkPath: LinkTreeNode<T>[] | LinkTreeNode<T>[][]) {
  if (isMultiple(multiple, linkPath)) {
    return linkPath.map(_linkPathToDataPath)
  } else {
    return _linkPathToDataPath(linkPath)
  }
}

function _linkPathToDataPath<T extends BaseTreeNode>(linkPath: LinkTreeNode<T>[]) {
  return linkPath.map(linkTreeNode => linkTreeNode.data)
}
