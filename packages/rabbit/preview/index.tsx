import React from 'react'
import ReactDOM from 'react-dom/client'

import { responseRegister } from '@marrow/rabbit'

import ExampleRender from './exampleRender'
import './index.scss'

responseRegister()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ExampleRender />
)
