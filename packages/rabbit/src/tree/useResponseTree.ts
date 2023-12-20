import { useEffect, useRef } from 'react'

import { isSame } from '../utils'
import { TreeValue } from '../hooks/useTree/type'
import { SingleTreeProps, MultipleTreeProps, TreeNode } from '../types/tree'

import compatible from '../compatible'

type ChangeRecord<T extends Object> = { node: TreeNode<T>; res: boolean }

interface MultipleProps<T extends Object>
  extends Pick<MultipleTreeProps<T>, 'onChecked' | 'onExpand' | 'checkedPath' | 'expandPath' | 'expandIcon' | 'draggleIcon'> {
  hookCheckedPath: TreeValue[][]
  hookExpandPath: TreeValue[][]
  changeCheckedPath: (path: TreeValue[][]) => void
  changeExpandPath: (path: TreeValue[][]) => void
}

interface SingleProps<T extends Object>
  extends Pick<SingleTreeProps<T>, 'onChecked' | 'onExpand' | 'checkedPath' | 'expandPath' | 'expandIcon' | 'draggleIcon'> {
  hookCheckedPath: TreeValue[]
  hookExpandPath: TreeValue[][]
  changeCheckedPath: (path: TreeValue[]) => void
  changeExpandPath: (path: TreeValue[][]) => void
}

interface Return<T extends Object> {
  curCheckedRef: React.MutableRefObject<ChangeRecord<T> | undefined>
  curExpandRef: React.MutableRefObject<ChangeRecord<T> | undefined>
  expandHandleWidth: React.MutableRefObject<number>
  draggleHandleWidth: React.MutableRefObject<number>
  treeWrapperRef: React.RefObject<HTMLDivElement>
}

type Props<T extends Object> = MultipleProps<T> | SingleProps<T>
export function useResponseTree<T extends Object>(props: MultipleProps<T>): Return<T>
export function useResponseTree<T extends Object>(props: SingleProps<T>): Return<T>
export default function useResponseTree<T extends Object>({
  hookCheckedPath,
  hookExpandPath,
  checkedPath,
  expandPath,
  expandIcon,
  draggleIcon,

  onChecked,
  onExpand,
  changeCheckedPath,
  changeExpandPath,
}: Props<T>) {
  const hookCheckedPathRef = useRef<Props<T>['hookCheckedPath']>([])
  const hookExpandPathRef = useRef<TreeValue[][]>([])
  const curCheckedRef = useRef<ChangeRecord<T>>()
  const curExpandRef = useRef<ChangeRecord<T>>()
  const expandHandleWidth = useRef(0)
  const draggleHandleWidth = useRef(0)
  const treeWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    hookCheckedPathRef.current = hookCheckedPath

    if (curCheckedRef.current) {
      onChecked?.(hookCheckedPath as any, curCheckedRef.current.node, curCheckedRef.current.res)
      curCheckedRef.current = undefined
    }
  }, [hookCheckedPath, onChecked])

  useEffect(() => {
    hookExpandPathRef.current = hookExpandPath

    if (curExpandRef.current) {
      onExpand?.(hookExpandPath, curExpandRef.current.node, curExpandRef.current.res)
      curExpandRef.current = undefined
    }
  }, [hookExpandPath, onExpand])

  useEffect(() => {
    if (!checkedPath || isSame(checkedPath, hookCheckedPathRef.current)) return

    changeCheckedPath(checkedPath as any)
  }, [checkedPath])

  useEffect(() => {
    if (!expandPath || isSame(expandPath, hookExpandPathRef.current)) return

    changeExpandPath(expandPath)
  }, [expandPath])

  useEffect(() => {
    if (!treeWrapperRef.current) return

    const expandHandle = compatible.getElementsByClassName(treeWrapperRef.current, 'expand-handle')[0] as HTMLSpanElement
    if (expandHandle) {
      expandHandleWidth.current = expandHandle.offsetWidth
    }

    const draggleHandle = compatible.getElementsByClassName(treeWrapperRef.current, 'draggle-handle')[0] as HTMLSpanElement
    if (draggleHandle) {
      draggleHandleWidth.current = draggleHandle.offsetWidth
    }
  }, [treeWrapperRef.current, expandIcon, draggleIcon])

  return {
    curCheckedRef,
    curExpandRef,
    expandHandleWidth,
    draggleHandleWidth,
    treeWrapperRef,
  }
}
