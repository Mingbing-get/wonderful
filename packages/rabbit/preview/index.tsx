import React from 'react'
import ReactDOM from 'react-dom/client'

import { responseRegister } from '@marrow/rabbit'

import ExampleIcon from './examples/icon'
import ExampleLoading from './examples/loading'
import ExampleButton from './examples/button'
import ExampleInput from './examples/input'
import ExampleInputNumber from './examples/inputNumber'
import ExampleSelect from './examples/select'
import ExampleTab from './examples/tab'
import ExamplePopover from './examples/popover'
import ExampleModal from './examples/modal'
import ExampleUpload from './examples/upload'

import './index.scss'

responseRegister()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='rabbit-preview-wrapper'>
    <div className='rabbit-preview-item'>
      <ExampleIcon />
    </div>
    <div className='rabbit-preview-item'>
      <ExampleLoading />
    </div>
    <div className='rabbit-preview-item'>
      <ExampleButton />
    </div>
    <div className='rabbit-preview-item'>
      <ExampleInput />
    </div>
    <div className='rabbit-preview-item'>
      <ExampleInputNumber />
    </div>
    <div className='rabbit-preview-item' style={{ width: 100 }}>
      <ExampleSelect />
    </div>
    <div className='rabbit-preview-item'>
      <ExampleTab />
    </div>
    <div className='rabbit-preview-item'>
      <ExamplePopover />
    </div>
    <div className='rabbit-preview-item'>
      <ExampleModal />
    </div>
    <div className='rabbit-preview-item'>
      <ExampleUpload />
    </div>
  </div>
)