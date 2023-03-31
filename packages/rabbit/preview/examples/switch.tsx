import React from 'react'
import { Switch } from '../../../rabbit/src'

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