import React, { useState } from 'react'
import { List, ListItemType, Button, Loading } from '@marrow/rabbit'

const data: ListItemType[] = new Array(10000).fill(1).map((_, index) => ({
  key: index,
  component: <div>test rabbit list{index}</div>
}))

export default function ExampleList() {
  const [loadLast, setLoadLast] = useState(30)
  const [loadLastBtn, setLoadLastBtn] = useState(30)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 49%)', justifyContent: 'space-between', gridRowGap: 40 }}>
      <List
        style={{ height: 300 }}
        items={data.slice(0, 30)}
      />
      <List
        items={data}
        virtualScroll={{
          height: 300,
          itemHeight: 40,
        }}
      />
      <List
        virtualScroll={{
          height: 300,
          itemHeight: 40,
        }}
        items={data.slice(0, loadLast)}
        loadMore={{
          loading: <Loading size={2} />,
          onLoad: () => {
            setTimeout(() => {
              setLoadLast(loadLast + 10)
            }, 1500);
          }
        }}
      />
      <List
        style={{ height: 300 }}
        items={data.slice(0, loadLastBtn)}
        loadMore={{
          action: <Button type='primary'>加载更多</Button>,
          total: 60,
          notMore: '没有更多内容。。。',
          onLoad: () => {
            setTimeout(() => {
              setLoadLastBtn(loadLastBtn + 10)
            }, 1500);
          }
        }}
      />
    </div>
  )
}
