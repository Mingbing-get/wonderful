import React, { useMemo, useCallback, useRef, useEffect } from 'react'
import classNames from 'classnames'

import { LinkTreeNode, TreeValue } from '../../hooks/useTree/type'
import { searchTextFromBaseTree } from '../../hooks/useTree/utils'
import { useMultipleTree } from '../../tree/context'
import { TreeNode } from '../../types/tree'

import CheckBox from '../../checkbox'

type SearchPath<T extends Object> = {
  texts: string[]
  disabled?: boolean
  checked?: boolean
  halfChecked?: boolean
  path: LinkTreeNode<TreeNode<T>>[]
}

type Props<T extends Object> = {
  searchText: string
  onChecked?: (checkedPath: TreeValue[][], node: TreeNode<T>, isChecked: boolean) => void
}

export default function SearchPanel<T extends Object>({ searchText, onChecked }: Props<T>) {
  const curNodeRef = useRef<{ node: TreeNode<T>; isChecked: boolean }>()
  const { linkForest, setChecked, checkedPath } = useMultipleTree<TreeNode<T>>()

  const searchPath = useMemo(() => {
    const searchLinkPathList = searchTextFromBaseTree(linkForest, ['label', 'value'], [searchText, searchText], 'unlink')

    return searchLinkPathList.map((linkTreePath) => {
      const onePath = linkTreePath.reduce(
        (total: Omit<SearchPath<T>, 'path'>, linkTreeNode) => {
          total.texts.push(
            `${linkTreeNode.data.label || linkTreeNode.data.value}`.replace(
              new RegExp(searchText, 'ig'),
              (matchText) => `<span class='match-text' >${matchText}</span>`
            )
          )
          total.disabled = total.disabled || linkTreeNode.disabled
          return total
        },
        { texts: [] }
      )

      return {
        ...onePath,
        checked: linkTreePath[linkTreePath.length - 1].checked,
        halfChecked: linkTreePath[linkTreePath.length - 1].halfChecked,
        path: linkTreePath,
      } as SearchPath<T>
    })
  }, [searchText, linkForest])

  useEffect(() => {
    if (!curNodeRef.current) return

    onChecked?.(checkedPath, curNodeRef.current.node, curNodeRef.current.isChecked)
    curNodeRef.current = undefined
  }, [checkedPath, onChecked])

  const handleClickItem = useCallback(
    (searchPath: SearchPath<T>, checked: boolean) => {
      if (searchPath.disabled) return

      setChecked(searchPath.path[searchPath.path.length - 1].data, checked)
      curNodeRef.current = {
        node: searchPath.path[searchPath.path.length - 1].data,
        isChecked: checked,
      }
    },
    [setChecked]
  )

  return (
    <div className="cascader-search-panel">
      {searchPath.map((item, index) => (
        <div
          className={classNames('search-panel-item', item.disabled && 'is-disabled')}
          key={index}>
          <CheckBox
            disabled={item.disabled}
            checked={item.checked}
            halfChecked={item.halfChecked}
            onChange={(checked) => handleClickItem(item, checked)}>
            ''
          </CheckBox>
          <div dangerouslySetInnerHTML={{ __html: item.texts.join(' / ') }} />
        </div>
      ))}
    </div>
  )
}
