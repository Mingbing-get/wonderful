import React from 'react'
import { Input } from '@marrow/rabbit'

export default function ExampleInput() {
  return (
    <div>
      <Input />
      <br />
      <Input allowClear />
      <br />
      <Input
        prefix={
          <span style={{ backgroundColor: '#ccc', padding: '0 0.5rem' }}>https://</span>
        }
      />
    </div>
  )
}