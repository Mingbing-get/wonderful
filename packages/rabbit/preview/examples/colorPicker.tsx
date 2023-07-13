import React from 'react'
import { ColorPicker } from '../../src'

export default function ExampleColorPicker() {
  return (
    <div>
      <ColorPicker />
      <ColorPicker value="#892034" />
      <ColorPicker children={<span>custom trigger</span>} />
    </div>
  )
}
