import React from 'react'
import { Slider } from '../../../rabbit/src'

export default function ExampleSlider() {
  return (
    <div>
      <Slider />
      <Slider min={-10} max={10} step={0.2} />
    </div>
  )
}