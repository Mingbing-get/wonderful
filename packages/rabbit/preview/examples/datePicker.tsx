import React from 'react'
import { DatePicker } from '../../../rabbit/src'
import dayjs from 'dayjs'

export default function ExampleDatePicker() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 24%)', justifyContent: 'space-between', gridRowGap: 40 }}>
      <DatePicker showNow />
      <DatePicker showNow time={{}} />
      <DatePicker disabled />
      <DatePicker disabled time={{}} />

      <DatePicker style={{ width: '8rem' }} value={dayjs()} customFormat={{
        validate: (text) => {
          const newDate = dayjs(text, 'YYYY年MM月DD日', true)
          if (newDate.isValid()) return newDate

          return undefined
        },
        format: (dayjs) => dayjs.format('YYYY年MM月DD日')
      }} />
      <DatePicker
        style={{ width: '14rem' }}
        value={dayjs()}
        customFormat={{
          validate: (text) => {
            const newDate = dayjs(text, 'YYYY年MM月DD日 HH时mm分ss秒', true)
            if (newDate.isValid()) return newDate

            return undefined
          },
          format: (dayjs) => dayjs.format('YYYY年MM月DD日')
        }}
        time={{
          customFormat: {
            validate: () => undefined, // 不用
            format: (dayjs) => dayjs.format('HH时mm分ss秒')
          }
        }}
        renderExtraFooter={
          () => <span>自定义footer</span>
        }
      />
    </div>
  )
}
