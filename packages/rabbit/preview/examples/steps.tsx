import React from 'react'
import { Steps, StepsItemType, Icon } from '@marrow/rabbit'

const items: StepsItemType[] = [
  {
    title: '第一步',
    subTitle: 'sub title',
    description: 'description'
  },
  {
    title: '第二步',
    subTitle: 'sub title',
    status: 'error',
    description: 'description'
  },
  {
    title: '第三步',
    subTitle: 'sub title',
    description: 'description'
  },
  {
    title: '第三步',
    icon: <Icon style={{ fontSize: '1.6rem' }} type='home' />,
    subTitle: 'sub title',
    description: 'description'
  }
]

export default function ExampleSteps() {
  return (
    <div>
      <Steps items={items} current={2} percent={47} />
      <br />
      <Steps items={items} direction='vertical' />
      <br />
      <Steps items={items} current={2} direction='vertical' type='navigation' />
      <br />
      <Steps items={items} current={2} type='navigation' />
      <br />
      <div style={{ width: 160 }}>
        <Steps items={items} current={2} type='inline' />
      </div>
    </div>
  )
}