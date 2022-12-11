import React from 'react'
import { Select, InputGroup } from '@marrow/rabbit'
import InputNumber from '../../common/inputNumber'

import { ChangeFn } from '../changeProps'
import { Marrow, TimeLineParams } from '@marrow/global'

function getRepeatStyle(loop?: boolean | number, direction?: string): string {
  if (!loop) return 'no_repeat'

  if (loop === true) {
    if (direction === 'alternate') return 'until_alternate_repeat'
    return 'until_repeat'
  }

  if (direction === 'alternate') return 'alternate_repeat_times'
  return 'repeat_times'
}

function handleChangeLoop(handleChange: ChangeFn, value: string, timeLineParams?: TimeLineParams) {
  if (value === 'no_repeat') {
    handleChange(['timeLineParams'], {
      ...(timeLineParams || {}),
      loop: false,
      direction: undefined
    })
  } else if (value === 'until_alternate_repeat') {
    handleChange(['timeLineParams'], {
      ...(timeLineParams || {}),
      loop: true,
      direction: 'alternate'
    })
  } else if (value === 'until_repeat') {
    handleChange(['timeLineParams'], {
      ...(timeLineParams || {}),
      loop: true,
      direction: undefined
    })
  } else if (value === 'alternate_repeat_times') {
    handleChange(['timeLineParams'], {
      ...(timeLineParams || {}),
      loop: 1,
      direction: 'alternate'
    })
  } else if (value === 'repeat_times') {
    handleChange(['timeLineParams'], {
      ...(timeLineParams || {}),
      loop: 1,
      direction: undefined
    })
  }
}

const repeatOptions = [
  { value: 'no_repeat', label: '不重复' },
  { value: 'repeat_times', label: '重复次数' },
  { value: 'alternate_repeat_times', label: '无缝重复次数' },
  { value: 'until_repeat', label: '无限重复' },
  { value: 'until_alternate_repeat', label: '无限无缝重复' }
]

type Props = {
  marrow: Marrow,
  handleChange: ChangeFn
}

export default function LoopStylePicker({
  marrow,
  handleChange
}: Props) {
  return (
    <InputGroup>
      <Select
        value={getRepeatStyle(marrow.timeLineParams?.loop, marrow.timeLineParams?.direction)}
        onChange={val => handleChangeLoop(handleChange, val as string, marrow.timeLineParams)}
        options={repeatOptions}
      />
      {
        Object.prototype.toString.call(marrow.timeLineParams?.loop) === '[object Number]' && (
          <InputNumber
            style={{ width: 100 }}
            value={marrow.timeLineParams?.loop}
            onChange={val => handleChange(['timeLineParams', 'loop'], val || 1)}
          />
        )
      }
    </InputGroup>
  )
}
