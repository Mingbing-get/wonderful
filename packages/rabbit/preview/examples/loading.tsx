import React from 'react'
import { Loading } from '../../../rabbit/src'

export default function ExampleLoading() {
  return (
    <div>
      <Loading size={4} />
      <Loading size={2} color='red' />
    </div>
  )
}