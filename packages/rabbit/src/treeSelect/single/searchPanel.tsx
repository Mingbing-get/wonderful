import React, { useMemo, useCallback } from 'react'
import classNames from 'classnames'

import { LinkTreeNode, TreeMode, TreeValue } from '../../hooks/useTree/type'
import { searchTextFromBaseTree, linkPathToCheckedPath } from '../../hooks/useTree/utils'
import { useSingleTree } from '../../tree/context'
import { TreeNode } from '../../types/tree'

type SearchPath<T extends Object> = {
  texts: string[]
  disabled?: boolean
  checked?: boolean
  path: LinkTreeNode<TreeNode<T>>[]
}

type Props<T extends Object> = {
  searchText: string
  mode: TreeMode
  onChecked?: (checkedPath: TreeValue[], node: TreeNode<T>, isChecked: boolean) => void
}

export default function SingleSearchPanel<T extends Object>({ searchText, mode, onChecked }: Props<T>) {
  const { linkForest, setChecked } = useSingleTree<TreeNode<T>>()

  const searchPath = useMemo(() => {
    const searchLinkPathList = searchTextFromBaseTree(linkForest, ['label', 'value'], [searchText, searchText], mode)

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
        path: linkTreePath,
      } as SearchPath<T>
    })
  }, [searchText, linkForest])

  const handleClickItem = useCallback(
    (searchPath: SearchPath<T>) => {
      if (searchPath.disabled) return

      setChecked(searchPath.path[searchPath.path.length - 1].data, true)
      onChecked?.(linkPathToCheckedPath(false, searchPath.path), searchPath.path[searchPath.path.length - 1].data, true)
    },
    [setChecked, onChecked]
  )

  return (
    <div className="tree-select-search-panel">
      {searchPath.map((item, index) => (
        <div
          className={classNames('search-panel-item', item.disabled && 'is-disabled', item.checked && 'is-checked')}
          key={index}
          dangerouslySetInnerHTML={{ __html: item.texts.join(' / ') }}
          onClick={() => handleClickItem(item)}
        />
      ))}
    </div>
  )
}
