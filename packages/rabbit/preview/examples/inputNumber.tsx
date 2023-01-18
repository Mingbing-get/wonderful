import React from 'react'
import { InputNumber } from '@marrow/rabbit'

export default function ExampleInputNumber() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 23%)', justifyContent: 'space-between' }}>
      <InputNumber />
      <InputNumber step={undefined} />
      <InputNumber disabled />
    </div>
  )
}