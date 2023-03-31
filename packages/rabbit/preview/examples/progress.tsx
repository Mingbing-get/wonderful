import React, { useEffect, useState } from 'react'
import { Progress } from '../../../rabbit/src'

export default function ExampleProgress() {
  const [pre, setPre] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setPre((pre) => pre + 10)
    }, 1000)
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 49%)', justifyContent: 'space-between', gridRowGap: 10 }}>
      <Progress percent={35} />
      <Progress percent={35} status='error' />
      <Progress percent={35} hiddenInfo />
      <Progress percent={pre} strokeColor={{
        0: 'red',
        50: 'blue',
        100: 'green'
      }} />

      <Progress width={100} type='circle' percent={35} />
      <Progress width={100} type='circle' percent={35} status='error' />
      <Progress width={100} type='circle' percent={35} hiddenInfo />
      <Progress width={100} type='circle' percent={pre} strokeColor={{
        0: 'red',
        50: 'blue',
        100: 'green'
      }} />

      <Progress width={100} type='circle' percent={pre} startPosition='right' />
      <Progress width={100} type='circle' percent={pre} startPosition='bottom' />
      <Progress
        width={100}
        type='circle'
        percent={pre} startPosition='left'
        format={(percent, status) => {
          if (status === 'success') return '完成'
          return <span style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>{`进度：${percent}%`}</span>
        }}
      />
      <Progress width={100} type='circle' percent={pre} startPosition='bottom' gapDegree={75} />
    </div>
  )
}
