import React from 'react'
import ReactDOM from 'react-dom/client'

import { AudioAnalyser, AudioController, AudioEdit } from '@marrow/audio'

import './index.scss'

const audioController = new AudioController()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='screen'>
    <div className='stage'>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <div>
          <button onClick={() => audioController.restart()}>重播</button>
          <button onClick={() => audioController.start()}>播放</button>
          <button onClick={() => audioController.pause()}>暂停</button>
        </div>
        <AudioAnalyser audioController={audioController} />
        <AudioEdit audioController={audioController} />
      </div>
    </div>
  </div>
)