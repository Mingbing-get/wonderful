import React, { FunctionComponent } from 'react'

import _SingleTreeSelect from './single'
import _MultipleTreeSelect from './multiple'
import { MultipleTreeProvider, SingleTreeProvider } from '../tree/provider'

import { SingleTreeSelectProps, MultipleTreeSelectProps } from '../types/treeSelect'

import './index.scss'

function withSingleTreeSelectProvider(Render: FunctionComponent<SingleTreeSelectProps<any>>) {
  return function <T extends Object>(props: SingleTreeSelectProps<T>) {
    return (
      <SingleTreeProvider
        {...props}
        Render={Render}
      />
    )
  }
}

function withMultipleTreeSelectProvider(Render: FunctionComponent<MultipleTreeSelectProps<any>>) {
  return function <T extends Object>(props: MultipleTreeSelectProps<T>) {
    return (
      <MultipleTreeProvider
        {...props}
        Render={Render}
      />
    )
  }
}

export const SingleTreeSelect = withSingleTreeSelectProvider(_SingleTreeSelect)
export const MultipleTreeSelect = withMultipleTreeSelectProvider(_MultipleTreeSelect)
