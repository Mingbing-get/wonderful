import React from 'react'
import { Button } from '../../../rabbit/src'

export default function ExampleButton() {
  return (
    <div>
      <Button type='primary'>
        确认
      </Button>
      <Button type='success'>
        确认
      </Button>
      <Button type='danger'>
        确认
      </Button>
      <Button type='warning'>
        确认
      </Button>
      <br />
      <Button type='primary' ghost>
        确认
      </Button>
      <Button type='success' ghost>
        确认
      </Button>
      <Button type='danger' ghost>
        确认
      </Button>
      <Button type='warning' ghost>
        确认
      </Button>
      <br />
      <Button disabled>
        确认
      </Button>
      <Button type='primary' disabled>
        确认
      </Button>
      <Button type='success' disabled>
        确认
      </Button>
      <Button type='danger' disabled>
        确认
      </Button>
      <Button type='warning' disabled>
        确认
      </Button>
      <br />
      <Button type='primary' ghost disabled>
        确认
      </Button>
      <Button type='success' ghost disabled>
        确认
      </Button>
      <Button type='danger' ghost disabled>
        确认
      </Button>
      <Button type='warning' ghost disabled>
        确认
      </Button>
      <br />
      <Button loading>
        确认
      </Button>
      <Button type='primary' loading>
        确认
      </Button>
      <Button type='success' loading>
        确认
      </Button>
      <Button type='danger' loading>
        确认
      </Button>
      <Button type='warning' loading>
        确认
      </Button>
      <br />
      <Button type='primary' ghost loading>
        确认
      </Button>
      <Button type='success' ghost loading>
        确认
      </Button>
      <Button type='danger' ghost loading>
        确认
      </Button>
      <Button type='warning' ghost loading>
        确认
      </Button>
    </div>
  )
}