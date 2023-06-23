import React, { useContext } from 'react'

import { SingleReturn, MultipleReturn, BaseTreeNode } from '../hooks/useTree/type'

const singleTreeContext: SingleReturn<any> = {} as any

export const SingleTreeContext = React.createContext(singleTreeContext)

export const useSingleTree = function <T extends BaseTreeNode>() {
  return useContext<SingleReturn<T>>(SingleTreeContext)
}

// multiple
const multipleTreeContext: MultipleReturn<any> = {} as any

export const MultipleTreeContext = React.createContext(multipleTreeContext)

export const useMultipleTree = function <T extends BaseTreeNode>() {
  return useContext<MultipleReturn<T>>(MultipleTreeContext)
}
