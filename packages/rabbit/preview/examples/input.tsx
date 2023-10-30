import React from 'react'
import { Input } from '../../../rabbit/src'

export default function ExampleInput() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 19%)', justifyContent: 'space-between' }}>
      <Input />
      <Input allowClear />
      <Input defaultValue={'test'} />
      <Input
        disabled
        value={'test'}
      />
      <Input prefix={<span style={{ backgroundColor: '#ccc', padding: '0 0.5rem' }}>https://</span>} />
    </div>
  )
}
