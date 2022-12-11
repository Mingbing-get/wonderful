import React from 'react'
import { Slider } from '@marrow/rabbit'

export default function ExampleSlider() {
  return (
    <div>
      <Slider />
      <Slider min={-10} max={10} step={0.2} />
    </div>
  )
}