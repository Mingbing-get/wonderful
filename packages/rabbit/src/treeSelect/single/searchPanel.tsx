import React, { useMemo, useCallback } from 'react'
import classNames from 'classnames'

import { LinkTreeNode, TreeMode, TreeValue } from '../../hooks/useTree/type'
import { searchTextFromBaseTree, linkPathToCheckedPath } from '../../hooks/useTree/utils'
import { useSingleTree } from '../../tree/context'
import { TreeNode } from '../../types/tree'

type SearchPath = {
  texts: string[]
  disabled?: boolean
  checked?: boolean
  path: LinkTreeNode<TreeNode>[]
}

type Props = {
  searchText: string
  mode: TreeMode
  onChecked?: (checkedPath: TreeValue[], node: TreeNode<{}>, isChecked: boolean) => void
}

export default function SingleSearchPanel({ searchText, mode, onChecked }: Props) {
  const { linkForest, setChecked } = useSingleTree<TreeNode>()

  const searchPath = useMemo(() => {
    const searchLinkPathList = searchTextFromBaseTree(linkForest, ['label', 'value'], [searchText, searchText], mode)

    return searchLinkPathList.map((linkTreePath) => {
      const onePath = linkTreePath.reduce(
        (total: Omit<SearchPath, 'path'>, linkTreeNode) => {
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
      } as SearchPath
    })
  }, [searchText, linkForest])

  const handleClickItem = useCallback(
    (searchPath: SearchPath) => {
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
