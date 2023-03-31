import React from 'react'
import { Button } from '../../../rabbit/src'

export default function ExampleButton() {
  return (
    <div>
      <Button type='primary'>
        确认
      </Button>
      <Button type='success' ghost>
        确认
      </Button>
      <Button type='danger'>
        确认
      </Button>
      <Button type='warning'>
        确认
      </Button>
      <Button disabled block>
        确认
      </Button>
      <Button loading>
        确认
      </Button>
    </div>
  )
}