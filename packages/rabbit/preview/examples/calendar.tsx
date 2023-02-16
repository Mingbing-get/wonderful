import React from 'react'
import { Calendar } from '@marrow/rabbit'
import dayjs from 'dayjs'

export default function ExampleCalendar() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 240px', gridColumnGap: '1rem' }}>
        <Calendar
          value={dayjs()}
          disabledDate={(date) => {
            return [5, 6, 9].includes(date.date())
          }}
          // cellRender={(date, mode) => {
          //   return `${date.format('YYYY/MM/DD')}`
          // }}
          onChange={(dayjs) => {
            console.log(dayjs.format('YYYY/MM/DD'))
          }}
        />

        <Calendar fullscreen={false} />
      </div>
      <br />
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 240px', gridColumnGap: '1rem' }}>
        <Calendar mode='month' value={dayjs()} />
        <Calendar mode='month' fullscreen={false} />
      </div>
      <br />
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 240px', gridColumnGap: '1rem' }}>
        <Calendar mode='week' value={dayjs()} />
        <Calendar mode='week' fullscreen={false} />
      </div>
      <br />
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 240px', gridColumnGap: '1rem' }}>
        <Calendar mode='year' value={dayjs()} />
        <Calendar mode='year' fullscreen={false} />
      </div>
      <br />
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 240px', gridColumnGap: '1rem' }}>
        <Calendar mode='tenYear' value={dayjs()} />
        <Calendar mode='tenYear' fullscreen={false} />
      </div>
      <br />
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 240px', gridColumnGap: '1rem' }}>
        <Calendar mode='quarter' value={dayjs()} />
        <Calendar mode='quarter' fullscreen={false} />
      </div>
    </div>
  )
}
