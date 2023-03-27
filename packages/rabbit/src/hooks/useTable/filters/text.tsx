import React, { useCallback, useState } from 'react'

import Input from '../../../input'
import Button from '../../../button'

import { FilterRenderProps, DataType } from '../type'

type Props<T extends DataType> = {
  accessor: string,
} & FilterRenderProps<T, string>

export default function TextFilter<T extends DataType>({
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
      if (!`${row.data[accessor]}`.includes(value)) {
        ids.push(row.id)
      }
    })
    onFilter(ids, value)
    setEffect(value !== undefined && value !== '')
    closePopover()
  }, [closePopover, onFilter, setEffect, value, accessor])

  const handleCancel = useCallback(() => {
    setValue(filterValue || '')
    closePopover()
  }, [closePopover])

  return (
    <div className='filter-wrapper'>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
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
