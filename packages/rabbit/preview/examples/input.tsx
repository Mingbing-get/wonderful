import React from 'react'
import { Input } from '@marrow/rabbit'

export default function ExampleInput() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 23%)', justifyContent: 'space-between' }}>
      <Input />
      <Input allowClear />
      <Input disabled value={'test'} />
      <Input
        prefix={
          <span style={{ backgroundColor: '#ccc', padding: '0 0.5rem' }}>https://</span>
        }
      />
    </div>
  )
}