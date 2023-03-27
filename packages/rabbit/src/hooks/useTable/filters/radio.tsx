import React, { useCallback, useMemo, useState } from 'react'

import { Group as CheckboxGroup, OptionType } from '../../../radio'
import Button from '../../../button'

import { FilterRenderProps, DataType } from '../type'

type Props<T extends DataType> = {
  accessor: string,
} & FilterRenderProps<T, (string | number)>

export default function RadioFilter<T extends DataType>({
  data,
  filterValue,
  accessor,
  setEffect,
  onFilter,
  closePopover,
}: Props<T>) {
  const [value, setValue] = useState(filterValue || '')

  const handleConfirm = useCallback(() => {
    const ids: string[] = []
    data.forEach(row => {
      if (value && value !== row.data[accessor]) {
        ids.push(row.id)
      }
    })
    onFilter(ids, value)
    setEffect(value !== undefined)
    closePopover()
  }, [closePopover, onFilter, setEffect, value, accessor])

  const handleCancel = useCallback(() => {
    setValue(filterValue || '')
    closePopover()
  }, [closePopover, filterValue])

  const options: OptionType[] = useMemo(() => {
    const values: string[] = []
    data.forEach(row => {
      if (!values.includes(row.data[accessor])) {
        values.push(row.data[accessor])
      }
    })

    return values.map(value => ({
      value
    }))
  }, [data, accessor])

  return (
    <div className='filter-wrapper'>
      <CheckboxGroup
        className='filter-checkbox'
        value={value}
        onChange={val => setValue(val || '')}
        options={options}
      />
      <div className='filter-footer'>
        <Button onClick={handleCancel}>
          取消
        </Button>
        <Button type='primary' onClick={handleConfirm}>
          确定
        </Button>
      </div>
    </div>
  )
}
