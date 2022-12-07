import React from 'react'
import { Select } from '@marrow/rabbit'

export default function ExampleSelect() {
  return (
    <div>
      <Select
        options={[
          {
            value: 1,
            label: 'l-1'
          },
          {
            value: 2,
            label: 'l-2'
          },
          {
            value: 3,
            label: 'l-3'
          }
        ]}
      />
    </div>
  )
}