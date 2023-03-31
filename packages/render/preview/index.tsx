import React from 'react'
import ReactDOM from 'react-dom/client'
import Render from '../src/index'

import './index.scss'

import { Marrow } from '../../types/global'

import img1 from './assets/a.jpeg'

const data: Marrow[] = [
  {
    type: 'container',
    elementName: '容器',
    id: '1',
    animation: [{
      delay: 200,
      translateX: 100,
      duration: 500
    }, {
      translateY: 100,
      translateX: 0,
      duration: 700
    }, {
      delay: 300,
      translateY: 0,
      translateX: 0,
      duration: 700
    }],
    children: [
      {
        type: 'text',
        elementName: '文本',
        id: '2',
        text: 'test font',
        appearTime: 500,
        animation: [{
          rotateX: 360,
          rotateY: 180,
          rotateZ: 70,
          scaleX: 0.4,
          duration: 1000,
        }],
        timeLineParams: {
          loop: true
        },
        startStyle: {
          color: 'red',
          translateX: '10px',
        }
      },
      {
        type: 'img',
        elementName: '图片',
        id: '3',
        src: img1,
        animation: [{
          scaleX: 1,
          scaleY: 1,
          rotate: 360,
          duration: 1000,
          easing: 'linear'
        }],
        startStyle: {
          scaleX: 0.1,
          scaleY: 0.1
        }
      }
    ]
  }
]

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='screen'>
    <div className='stage'>
      <Render marrows={data} autoplay />
    </div>
  </div>
)