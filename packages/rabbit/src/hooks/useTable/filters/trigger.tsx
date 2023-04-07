import React, { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'

import Popover from '../../../popover'
import Icon from '../../../icon'
import { ColumnFilter, FilterRenderProps, DataType, FilterType, FilterRender } from '../type'

import TextFilter from './text'
import CheckBoxFilter from './checkBox'
import RadioFilter from './radio'

type Props<T extends DataType> = {
  filter?: ColumnFilter<T>,
  accessor: string,
} & Omit<FilterRenderProps<T>, 'closePopover' | 'setEffect'>

const filterMap: Record<FilterType, any> = {
  text: TextFilter,
  checkbox: CheckBoxFilter,
  radio: RadioFilter
}

function isInnerRender<T extends DataType>(render?: FilterRender<T> | FilterType): render is FilterType {
  const filterKeys = Object.keys(filterMap) as FilterType[]
  return filterKeys.includes(render as FilterType)
}

export default function FilterTrigger<T extends DataType>({
  filter,
  accessor,
  ...extra
}: Props<T>) {
  const [visible, setVisible] = useState(false)
  const [effect, setEffect] = useState(false)

  const closePopover = useCallback(() => {
    setVisible(false)
  }, [])

  const content = useMemo(() => {
    const render = filter?.render
    if (isInnerRender(render)) {
      const Render = filterMap[render]
      return (
        <Render
          {...extra}
          accessor={accessor}
          setEffect={setEffect}
          closePopover={closePopover}
          filterValue={filter?.filterValue}
          options={filter?.options}
        />
      )
    }

    return render?.({ ...extra, closePopover, setEffect, filterValue: filter?.filterValue })
  }, [filter, extra])

  return (
    <Popover
      arrow='none'
      placement='bottom-start'
      visible={visible}
      onVisibleChange={setVisible}
      content={content}
    >
      <span className={classNames('filter-trigger table-control', effect && 'effect-filter')}>
        {filter?.icon || <Icon type='filter' />}
      </span>
    </Popover>
  )
}
