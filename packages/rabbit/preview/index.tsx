import React from 'react'
import ReactDOM from 'react-dom/client'

import { responseRegister, compatible } from '../../rabbit/src'

import ExampleRender from './exampleRender'
import './index.scss'

responseRegister()
// compatible.setPlatform('weapp')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<ExampleRender />)
