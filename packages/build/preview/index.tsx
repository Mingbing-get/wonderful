import React from 'react'
import ReactDOM from 'react-dom/client'

import { responseRegister } from '../../rabbit/src'

import Main from './main'

import './index.scss'

responseRegister()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='screen-mb'>
    <div className='stage'>
      <Main />
    </div>
  </div>
)