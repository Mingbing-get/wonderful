import React from 'react'
import ReactDOM from 'react-dom/client'
import Build from '../src/index'

import './index.scss'

import { Marrow } from '@marrow/global'

function handleChange(data: Marrow[]) {
  localStorage.setItem('marrow-data', JSON.stringify(data))
}

const data = JSON.parse(localStorage.getItem('marrow-data') || '[]') as Marrow[]

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='screen-mb'>
    <div className='stage'>
      <Build marrows={data} onChange={handleChange} />
    </div>
  </div>
)