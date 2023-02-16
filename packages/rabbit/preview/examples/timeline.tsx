import React from 'react'
import { Timeline, TimelineItemType, Icon } from '@marrow/rabbit'

const items: TimelineItemType[] = [
  {
    label: '2019-02-01',
    content: 'create ----',
    color: 'green'
  },
  {
    label: '2019-02-04',
    content: 'query ----',
    dot: <Icon type='search' />
  },
  {
    label: '2019-02-05',
    content: 'update ----',
    color: 'blue'
  },
  {
    label: '2019-02-09',
    content: 'delete ----',
    dot: <Icon type='delete' />
  }
]

const items1: TimelineItemType[] = [
  {
    content: 'create ----',
    color: 'green'
  },
  {
    content: 'query ----',
    dot: <Icon type='search' />
  },
  {
    content: 'update ----',
    color: 'blue'
  },
  {
    content: 'delete ----',
    dot: <Icon type='delete' />
  }
]

export default function ExampleTimeline() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 49%)', justifyContent: 'space-between', gridRowGap: 40 }}>
      <Timeline items={items} />
      <Timeline items={items} mode='left' />
      <Timeline items={items} mode='alternate' />
      <Timeline items={items} pending />
      <Timeline items={items1} />
      <Timeline items={items1} mode='left' />
      <Timeline items={items1} mode='alternate' />
      <Timeline items={items1} pending />
    </div>
  )
}
