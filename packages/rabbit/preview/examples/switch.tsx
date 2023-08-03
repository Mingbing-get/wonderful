import React from 'react'
import { Switch } from '../../../rabbit/src'

export default function ExampleSwitch() {
  return (
    <div>
      <Switch
        value={true}
        onChange={(v) => console.log(v)}
      />
      <Switch onChange={(v) => console.log(v)} />
      <br />
      <Switch
        value={true}
        disabled
        onChange={(v) => console.log(v)}
      />
      <Switch
        disabled
        onChange={(v) => console.log(v)}
      />
    </div>
  )
}
