import React from 'react'
import { Switch } from '@marrow/rabbit'

export default function ExampleSwitch() {
  return (
    <div>
      <Switch
        value={true}
        onChange={v => console.log(v)}
      />
    </div>
  )
}