import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'

import Icon from '../icon'
import Panel from './panel'
import { isArray, isSame } from '../utils'
import { TransferProps, TransferDirection, TransferOptionType } from '../types/transfer'

import './index.scss'

export default function Transfer({
  className,
  listClassName,
  style,
  listStyle,
  data,
  selectedValues,
  defaultSelectedValues,
  oneWay,
  showSearch,
  showSelectAll,
  titles,
  selectAllLabels,
  selectInvertLabels,
  loadMore,
  virtualScroll,
  filterOption,
  footerRender,
  btnRender,
  onChange,
  onSelectChange
}: TransferProps) {
  const [_selectedValues, setSelectedValues] = useState<(number | string)[][]>(defaultSelectedValues || selectedValues || new Array(data.length).fill([]))
  const [_data, setData] = useState(data)

  useEffect(() => {
    setData(data)
  }, [data])

  useEffect(() => {
    setSelectedValues(oldSelectedValues => {
      if (isSame(oldSelectedValues, selectedValues)) return oldSelectedValues

      return selectedValues || new Array(data.length).fill([])
    })
  }, [selectedValues])

  const handleSelectedChange = useCallback((index: number, changeOptions: TransferOptionType[], selected?: boolean) => {
    let current = _selectedValues[index] || []
    const newValues = changeOptions.map(option => option.value)
    if (selected) {
      current = [...new Set([...newValues, ...current])]
    } else {
      current = current.filter(value => !newValues.includes(value))
    }
    _selectedValues.splice(index, 1, current)

    setSelectedValues([..._selectedValues])
    onSelectChange?.(_selectedValues, findOptionsByValues(_selectedValues, _data))
  }, [_selectedValues, _data, onSelectChange])

  const handleTransfer = useCallback((index: number, dir: TransferDirection) => {
    const leftIndex = dir === 'right' ? index : index - 1
    const rightIndex = dir === 'right' ? index + 1 : index
    
    if (_data.length <= leftIndex || _data.length <= rightIndex) return

    let leftOptions = _data[leftIndex]
    let rightOptions = _data[rightIndex]
    let leftSelectedValues = _selectedValues[leftIndex] || []
    let rightSelectedValues = _selectedValues[rightIndex] || []

    if (dir === 'right') {
      const moveOptions = leftOptions.filter(option => leftSelectedValues.includes(option.value))
      leftOptions = leftOptions.filter(option => !leftSelectedValues.includes(option.value))
      rightOptions = [...rightOptions, ...moveOptions]
      rightSelectedValues = [...rightSelectedValues, ...leftSelectedValues]
      leftSelectedValues = []
    } else {
      const moveOptions = rightOptions.filter(option => rightSelectedValues.includes(option.value))
      rightOptions = rightOptions.filter(option => !rightSelectedValues.includes(option.value))
      leftOptions = [...leftOptions, ...moveOptions]
      leftSelectedValues = [...leftSelectedValues, ...rightSelectedValues]
      rightSelectedValues = []
    }

    _data.splice(leftIndex, 1, leftOptions)
    _data.splice(rightIndex, 1, rightOptions)
    _selectedValues.splice(leftIndex, 1, leftSelectedValues)
    _selectedValues.splice(rightIndex, 1, rightSelectedValues)
    
    setData([..._data])
    setSelectedValues([..._selectedValues])
    onChange?.(_data)
  }, [onChange, _selectedValues, _data])

  return (
    <div className={classNames('rabbit-transfer-wrapper', className)} style={style}>
      {
        _data.map((panelData, index) => (
          <div key={index} className='transfer-box'>
            <Panel
              className={listClassName}
              style={listStyle}
              showSearch={isArray<boolean[]>(showSearch) ? showSearch[index] : showSearch}
              showSelectAll={isArray<boolean[]>(showSelectAll) ? showSelectAll[index] : showSelectAll}
              title={isArray<React.ReactNode[]>(titles) ? titles[index] : titles}
              selectAllLabel={isArray<React.ReactNode[]>(selectAllLabels) ? selectAllLabels[index] : selectAllLabels}
              selectInvertLabel={isArray<React.ReactNode[]>(selectInvertLabels) ? selectInvertLabels[index] : selectInvertLabels}
              loadMore={loadMore?.[index]}
              virtualScroll={virtualScroll}
              options={panelData}
              selectedValues={_selectedValues[index] || []}
              onSelectChange={(changeOptions, selected) => handleSelectedChange(index, changeOptions, selected)}
              footerRender={footerRender && (() => footerRender?.(index))}
              filterOption={filterOption}
            />
            {
              index != _data.length - 1 && (
                <div className='btn-wrapper'>
                  <span onClick={() => handleTransfer(index, 'right')} className={classNames('btn', !_selectedValues[index]?.length && 'is-disabled')}>
                    {
                      btnRender ? btnRender(index, 'right') : <Icon type='arrowRight' />
                    }
                  </span>
                  {
                    !(isArray<boolean[]>(oneWay) ? oneWay[index] : oneWay) && (
                      <span onClick={() => handleTransfer(index + 1, 'left')} className={classNames('btn', !_selectedValues[index + 1].length && 'is-disabled')}>
                        {
                          btnRender ? btnRender(index, 'left') : <Icon type='arrowLeft' />
                        }
                      </span>
                    )
                  }
                </div>
              )
            }
          </div>
        ))
      }
    </div>
  )
}

function findOptionsByValues(values: (number | string)[][], data: TransferOptionType[][]): TransferOptionType[][] {
  const findOptions: TransferOptionType[][] = []
  data.forEach((options, index) => {
    findOptions.push(options.filter(option => (values[index] || []).includes(option.value)))
  })
  return findOptions
}
