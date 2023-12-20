import React, { useMemo, useCallback } from 'react'
import classNames from 'classnames'

import { LinkTreeNode, TreeMode } from '../../hooks/useTree/type'
import { searchTextFromBaseTree } from '../../hooks/useTree/utils'
import { CascaderOption } from '../../types/cascader'

type SearchPath<T extends object> = {
  texts: string[]
  disabled?: boolean
  checked?: boolean
  path: LinkTreeNode<CascaderOption<T>>[]
}

type Props<T extends object> = {
  searchText: string
  linkForest: LinkTreeNode<CascaderOption<T>>[]
  mode: TreeMode
  setChecked: (data: CascaderOption<T>, checked: boolean, closePopover?: boolean) => void
}

export default function SearchPanel<T extends object>({ searchText, linkForest, mode, setChecked }: Props<T>) {
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
    },
    [setChecked]
  )

  return (
    <div className="cascader-search-panel">
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
