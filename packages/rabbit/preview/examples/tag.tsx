import React from 'react'
import { Tag, Icon } from '@marrow/rabbit'

export default function ExampleTag() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 9%)', justifyContent: 'space-between' }}>
      <Tag>
        test
      </Tag>
      <Tag color='success'>
        success
      </Tag>
      <Tag color='primary' icon={<Icon type='home' />}>
        primary
      </Tag>
      <Tag color='error' closable onClose={() => console.log(1111)}>
        error
      </Tag>
      <Tag color='warning' closable closeIcon={<Icon type='success' />}>
        warning
      </Tag>
      <Tag color='green'>
        custom
      </Tag>
    </div>
  )
}