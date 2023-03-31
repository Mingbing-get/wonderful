import React from 'react'
import { Upload, Icon } from '../../../rabbit/src'

export default function ExampleUpload() {
  return (
    <div>
      <Upload>
        <Icon type='add' />
      </Upload>
      <br />
      <Upload multiple>
        <Icon type='add' />
      </Upload>
      <br />
      <Upload multiple limit={2}>
        <Icon type='add' />
      </Upload>
    </div>
  )
}