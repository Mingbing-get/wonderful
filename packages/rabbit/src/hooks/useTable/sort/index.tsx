import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import Icon, { IconType } from '../../../icon'
import { ColumnSort, SortDir, DataType } from '../index.d'

import './index.scss'

type Props<T extends DataType> = {
  sort?: ColumnSort<T>,
  onSort: (value: SortDir) => void
}

export default function Sort<T extends DataType>({
  sort,
  onSort
}: Props<T>) {
  const handleClick = useCallback(() => {
    const newValue = {
      'asc': 'desc',
      'desc': 'none',
      'none': 'asc'
    }[sort?.sortValue || 'none'] as SortDir

    onSort(newValue)
  }, [sort?.sortValue, onSort])

  const iconType = useMemo(() => {
    return {
      'asc': 'sortAsc',
      'desc': 'sortDesc',
      'none': 'sort'
    }[sort?.sortValue || 'none'] as IconType
  }, [sort?.sortValue])

  return (
    <span className={classNames('sort-trigger table-control', ['asc', 'desc'].includes(sort?.sortValue || 'none') && 'effect-sort')}>
      {
        sort?.render ? 
          sort.render({ sortValue: sort.sortValue, onSort }) :
          (<Icon
            onClick={handleClick}
            type={iconType}
          />)
      }
    </span>
  )
}
