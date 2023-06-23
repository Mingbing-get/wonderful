import React, { FunctionComponent } from 'react'

import { SingleTreeContext, MultipleTreeContext } from './context'
import useTree from '../hooks/useTree'
import { SingleTreeProps, MultipleTreeProps } from '../types/tree'

type BaseSingleProps = Pick<SingleTreeProps, 'data' | 'defaultCheckedPath' | 'defaultExpandPath' | 'loadData' | 'onCanMove' | 'onMove'> & {
  Render: FunctionComponent<any>
}

function SingleTreeProvider<T extends BaseSingleProps>({ Render, ...extra }: T) {
  const { data, defaultCheckedPath, defaultExpandPath, loadData, onCanMove, onMove } = extra
  const singleTreeValue = useTree({
    multiple: false,
    mode: 'unlink',
    forest: data,
    defaultCheckedPath,
    defaultExpandPath,
    loadData,
    onCanMove,
    onMove,
  })

  return (
    <SingleTreeContext.Provider value={singleTreeValue}>
      <Render {...extra} />
    </SingleTreeContext.Provider>
  )
}

export function withSingleTreeProvider<T extends Omit<BaseSingleProps, 'Render'>>(Render: FunctionComponent<T>) {
  return function (props: T) {
    return (
      <SingleTreeProvider
        {...props}
        Render={Render}
      />
    )
  }
}

// multiple
type BaseMultipleProps = Pick<MultipleTreeProps, 'data' | 'mode' | 'defaultCheckedPath' | 'defaultExpandPath' | 'loadData' | 'onCanMove' | 'onMove'> & {
  Render: FunctionComponent<any>
}

function MultipleTreeProvider<T extends BaseMultipleProps>({ Render, ...extra }: T) {
  const { data, mode = 'ordinary', defaultCheckedPath, defaultExpandPath, loadData, onCanMove, onMove } = extra
  const multipleTreeValue = useTree({
    multiple: true,
    mode,
    forest: data,
    defaultCheckedPath,
    defaultExpandPath,
    loadData,
    onCanMove,
    onMove,
  })

  return (
    <MultipleTreeContext.Provider value={multipleTreeValue}>
      <Render {...extra} />
    </MultipleTreeContext.Provider>
  )
}

export function withMultipleTreeProvider<T extends Omit<BaseMultipleProps, 'Render'>>(Render: FunctionComponent<T>) {
  return function (props: T) {
    return (
      <MultipleTreeProvider
        {...props}
        Render={Render}
      />
    )
  }
}
