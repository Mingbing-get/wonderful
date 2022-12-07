import React, { useState } from 'react'
import { Modal, Button } from '@marrow/rabbit'

export default function ExampleModal() {
  const [visible, setVisible] = useState({
    default: false,
    bottom: false,
    top: false,
    left: false,
    right: false
  })

  function handleChangeVisible(placement: keyof typeof visible, v: boolean) {
    setVisible({
      ...visible,
      [placement]: v
    })
  }

  function getContent() {
    return (
      <div>
        contentconten
        <br />
        tcontentcontentc
        <br />
        ontentcontent
        <br />
        contentcontent
        <br />
        contentcontent
        <br />
        contentcontent
        <br />
        contentcontent
        <br />
        contentcontent
      </div>
    )
  }

  function getFooter() {
    return [
      { text: '确认', type: 'primary' },
      { text: '取消' }
    ]
  }

  return (
    <div>
      <Button type='primary' onClick={() => handleChangeVisible('default', true)}>打开modal(default)</Button>
      <br />
      <Button type='primary' onClick={() => handleChangeVisible('bottom', true)}>打开modal(bottom)</Button>
      <br />
      <Button type='primary' onClick={() => handleChangeVisible('top', true)}>打开modal(top)</Button>
      <br />
      <Button type='primary' onClick={() => handleChangeVisible('left', true)}>打开modal(left)</Button>
      <br />
      <Button type='primary' onClick={() => handleChangeVisible('right', true)}>打开modal(right)</Button>
      <Modal
        visible={visible.default}
        onVisibleChange={v => handleChangeVisible('default', v)}
        height='10rem'
        header='title'
        content={getContent()}
        footer={getFooter() as any}
      />
      <Modal
        placement='bottom'
        visible={visible.bottom}
        onVisibleChange={v => handleChangeVisible('bottom', v)}
        header='title'
        content={getContent()}
        footer={getFooter() as any}
      />
      <Modal
        placement='top'
        visible={visible.top}
        onVisibleChange={v => handleChangeVisible('top', v)}
        header='title'
        content={getContent()}
        footer={getFooter() as any}
      />
      <Modal
        placement='left'
        visible={visible.left}
        onVisibleChange={v => handleChangeVisible('left', v)}
        header='title'
        content={getContent()}
        footer={getFooter() as any}
      />
      <Modal
        placement='right'
        visible={visible.right}
        onVisibleChange={v => handleChangeVisible('right', v)}
        header='title'
        content={getContent()}
        footer={getFooter() as any}
      />
    </div>
  )
}