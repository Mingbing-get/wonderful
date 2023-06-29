import React, { useMemo, useCallback } from 'react'
import classNames from 'classnames'

import { LinkTreeNode } from '../../hooks/useTree/type'
import { searchTextFromBaseTree } from '../../hooks/useTree/utils'
import { useMultipleTree } from '../../tree/context'
import { TreeNode } from '../../types/tree'

import CheckBox from '../../checkbox'

type SearchPath = {
  texts: string[]
  disabled?: boolean
  checked?: boolean
  halfChecked?: boolean
  path: LinkTreeNode<TreeNode>[]
}

type Props = {
  searchText: string
}

export default function SearchPanel({ searchText }: Props) {
  const { linkForest, setChecked } = useMultipleTree<TreeNode>()

  const searchPath = useMemo(() => {
    const searchLinkPathList = searchTextFromBaseTree(linkForest, ['label', 'value'], [searchText, searchText], 'unlink')

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
        halfChecked: linkTreePath[linkTreePath.length - 1].halfChecked,
        path: linkTreePath,
      } as SearchPath
    })
  }, [searchText, linkForest])

  const handleClickItem = useCallback(
    (searchPath: SearchPath, checked: boolean) => {
      if (searchPath.disabled) return

      setChecked(searchPath.path[searchPath.path.length - 1].data, checked)
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
