import React from 'react'
import { Badge, Icon } from '../../../rabbit/src'

export default function ExampleBadge() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 9%)', justifyContent: 'space-between', paddingTop: '2rem' }}>
      <Badge count={9} />
      <Badge count={1}>
        <div style={{ width: 40, height: 40, backgroundColor: 'gray' }}></div>
      </Badge>
      <Badge count={1} color='green'>
        <div style={{ width: 40, height: 40, backgroundColor: 'gray' }}></div>
      </Badge>
      <Badge count={<Icon type='home' />} color='green'>
        <div style={{ width: 40, height: 40, backgroundColor: 'gray' }}></div>
      </Badge>
      <Badge count={0} showZero>
        <div style={{ width: 40, height: 40, backgroundColor: 'gray' }}></div>
      </Badge>
      <Badge count={19}>
        <div style={{ width: 40, height: 40, backgroundColor: 'gray' }}></div>
      </Badge>
      <Badge count={19} offsetRight={10} offsetTop={10}>
        <div style={{ width: 40, height: 40, backgroundColor: 'gray' }}></div>
      </Badge>
      <Badge count={101}>
        <div style={{ width: 40, height: 40, backgroundColor: 'gray' }}></div>
      </Badge>
      <Badge count={1010} overflowCount={999}>
        <div style={{ width: 40, height: 40, backgroundColor: 'gray' }}></div>
      </Badge>
      <Badge count={1010} dot>
        <div style={{ width: 40, height: 40, backgroundColor: 'gray' }}></div>
      </Badge>
    </div>
  )
}