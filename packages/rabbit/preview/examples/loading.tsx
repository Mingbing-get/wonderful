import React from 'react'
import { Loading } from '@marrow/rabbit'

export default function ExampleLoading() {
  return (
    <div>
      <Loading size={4} />
      <Loading size={2} color='red' />
    </div>
  )
}