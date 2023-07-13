import React from 'react'
import { Select, MultipleSelect } from '../../../rabbit/src'

function getOptions(count: number) {
  return new Array(count).fill(1).map((_, index) => ({ value: index + 1, label: `l-${index + 1}` }))
}

export default function ExampleSelect() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 23%)', justifyContent: 'space-between' }}>
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
    </div>
  )
}
