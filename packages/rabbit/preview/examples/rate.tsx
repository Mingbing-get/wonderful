import React from 'react'
import { Rate } from '@marrow/rabbit'

export default function ExampleRate() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 10%)', justifyContent: 'space-between' }}>
      <Rate />
      <Rate allowHalf />
      <Rate allowClear />
      <Rate allowClear allowHalf />
      <Rate character={<span style={{ fontSize: '1.5rem' }}>A</span>} allowHalf />
      <Rate
        character={index => <span style={{ fontSize: '1.5rem' }}>{index + 1}</span>}
        allowHalf
        count={7}
        defaultValue={2.5}
      />
      <Rate toolTips={[
        '很差',
        '差',
        '一般',
        '好',
        '很好'
      ]}
      defaultValue={3}
      checkColor='red'
      />
    </div>
  )
}