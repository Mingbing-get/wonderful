import React from 'react'
import { Button, message, MessageType } from '@marrow/rabbit'

export default function ExampleLoading() {
  function showMessage(type: MessageType) {
    message[type]({ content: type })
  }

  return (
    <div>
      <Button onClick={() => showMessage('info')}>info</Button>
      <Button onClick={() => showMessage('success')}>success</Button>
      <Button onClick={() => showMessage('warn')}>warn</Button>
      <Button onClick={() => showMessage('error')}>error</Button>
    </div>
  )
}