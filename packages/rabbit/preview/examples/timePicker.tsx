import React from 'react'
import { TimePicker } from '@marrow/rabbit'
import dayjs from 'dayjs'

export default function ExampleTimePicker() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 24%)', justifyContent: 'space-between', gridRowGap: 40 }}>
      <TimePicker />
      <TimePicker
        disabledTime={(num, type) => {
          if (type === 'hour' && [3,4,5].includes(num)) return true
          return false
        }}
        showNow={false}
      />
      <TimePicker defaultValue={dayjs()} style={{ width: '7rem' }} customFormat={{
        format: (dayjs) => dayjs.format('HH点mm分ss秒'),
        validate: (text) => {
          const newTime = dayjs(text, 'HH点mm分ss秒', true)
          if (newTime.isValid()) return newTime
          return undefined
        }
      }} />
      <TimePicker disabled />
      <TimePicker value={dayjs()} />

      <TimePicker format='HH:mm' value={dayjs()} />
      <TimePicker format='mm:ss' value={dayjs()} />

      <TimePicker format='HH' value={dayjs()} />
      <TimePicker format='mm' value={dayjs()} />
      <TimePicker format='ss' value={dayjs()} />
    </div>
  )
}
