import React, { FunctionComponent } from 'react'

import { SingleTreeContext, MultipleTreeContext } from './context'
import useTree from '../hooks/useTree'
import { SingleTreeProps, MultipleTreeProps } from '../types/tree'

type PickPropsKeys = 'data' | 'defaultCheckedPath' | 'defaultExpandPath' | 'loadData' | 'onCanMove' | 'onMove' | 'onUpdateTree'
type BaseSingleProps<T extends Object, P extends Pick<SingleTreeProps<T>, PickPropsKeys>> = P & {
  Render: FunctionComponent<P>
}

export function SingleTreeProvider<T extends Object, P extends Pick<SingleTreeProps<T>, PickPropsKeys>>({ Render, ...extra }: BaseSingleProps<T, P>) {
  const { data, defaultCheckedPath, defaultExpandPath, loadData, onCanMove, onMove, onUpdateTree } = extra

  const singleTreeValue = useTree({
    multiple: false,
    mode: 'unlink',
    forest: data,
    defaultCheckedPath,
    defaultExpandPath,
    loadData,
    onCanMove,
    onMove,
    onUpdateTree,
  })

  return (
    <SingleTreeContext.Provider value={singleTreeValue}>
      <Render {...(extra as any as P)} />
    </SingleTreeContext.Provider>
  )
}

export function withSingleTreeProvider(Render: FunctionComponent<SingleTreeProps<any>>) {
  return function <T extends Object>(props: SingleTreeProps<T>) {
    return (
      <SingleTreeProvider
        {...props}
        Render={Render}
      />
    )
  }
}

// multiple
type BaseMultipleProps<T extends Object> = MultipleTreeProps<T> & {
  Render: FunctionComponent<MultipleTreeProps<any>>
}

export function MultipleTreeProvider<T extends Object>({ Render, ...extra }: BaseMultipleProps<T>) {
  const { data, mode = 'ordinary', defaultCheckedPath, defaultExpandPath, loadData, onCanMove, onMove, onUpdateTree } = extra
  const multipleTreeValue = useTree({
    multiple: true,
    mode,
    forest: data,
    defaultCheckedPath,
    defaultExpandPath,
    loadData,
    onCanMove,
    onMove,
    onUpdateTree,
  })

  return (
    <MultipleTreeContext.Provider value={multipleTreeValue}>
      <Render {...extra} />
    </MultipleTreeContext.Provider>
  )
}

export function withMultipleTreeProvider(Render: FunctionComponent<MultipleTreeProps<any>>) {
  return function <T extends Object>(props: MultipleTreeProps<T>) {
    return (
      <MultipleTreeProvider
        {...props}
        Render={Render}
      />
    )
  }
}
