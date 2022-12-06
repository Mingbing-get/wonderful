import React from 'react'
import { Select, InputGroup } from '@douyinfe/semi-ui'
import InputNumber from '../../common/inputNumber'

import { ChangeFn } from '../changeProps'
import { Marrow, TimeLineParams } from '@marrow/global'

const Option = Select.Option

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
      >
        <Option key='no_repeat' value='no_repeat'>不重复</Option>
        <Option key='repeat_times' value='repeat_times'>重复次数</Option>
        <Option key='alternate_repeat_times' value='alternate_repeat_times'>无缝重复次数</Option>
        <Option key='until_repeat' value='until_repeat'>无限重复</Option>
        <Option key='until_alternate_repeat' value='until_alternate_repeat'>无限无缝重复</Option>
      </Select>
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
