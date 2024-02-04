import React from 'react'
import { Select, MultipleSelect, SelectGroup } from '../../../rabbit/src'

function getOptions(count: number) {
  return new Array(count).fill(1).map((_, index) => ({ value: index + 1, label: `l-${index + 1}` }))
}

const groups: SelectGroup<string>[] = [
  {
    label: 'group1',
    id: 'group1',
    options: [
      { value: 'g1-1', label: 'g1-1' },
      { value: 'g1-2', label: 'g1-2' },
      { value: 'g1-3', label: 'g1-3' },
    ],
  },
  {
    label: 'group2',
    id: 'group2',
    options: [
      { value: 'g2-1', label: 'g2-1' },
      { value: 'g2-2', label: 'g2-2' },
      { value: 'g2-3', label: 'g2-3' },
    ],
  },
  {
    label: 'group3',
    id: 'group3',
    options: [
      { value: 'g3-1', label: 'g3-1' },
      { value: 'g3-2', label: 'g3-2' },
      { value: 'g3-3', label: 'g3-3' },
    ],
  },
]

export default function ExampleSelect() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 23%)', gridGap: 10, justifyContent: 'space-between' }}>
      <Select
        options={[
          {
            value: 1,
            label: 'l-1',
          },
          {
            value: 2,
            label: 'l-2',
          },
          {
            value: 3,
            label: 'l-3',
          },
        ]}
      />
      <Select
        allowClear
        options={getOptions(100)}
      />
      <Select
        disabled
        options={[
          {
            value: 1,
            label: 'l-1',
          },
          {
            value: 2,
            label: 'l-2',
          },
          {
            value: 3,
            label: 'l-3',
          },
        ]}
      />
      <Select options={groups} />
      <MultipleSelect
        options={[
          {
            value: 1,
            label: 'l-1',
          },
          {
            value: 2,
            label: 'l-2',
          },
          {
            value: 3,
            label: 'l-3',
          },
        ]}
      />
      <MultipleSelect
        showSearch
        onChange={console.log}
        options={[
          {
            value: 1,
            label: 'l-1',
          },
          {
            value: 2,
            label: 'l-2',
          },
          {
            value: 3,
            label: 'l-3',
          },
        ]}
      />
      <MultipleSelect
        disabled
        defaultValue={[1]}
        options={[
          {
            value: 1,
            label: 'l-1',
          },
          {
            value: 2,
            label: 'l-2',
          },
          {
            value: 3,
            label: 'l-3',
          },
        ]}
      />
      <MultipleSelect options={groups} />
    </div>
  )
}
