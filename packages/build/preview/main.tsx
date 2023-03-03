import React, { useState, useEffect } from 'react'
import Build from '../src/index'
import { read, save } from './indexDB'

import { Marrow } from '@marrow/global'
import { AudioInfo } from '@marrow/audio'

export default function Main() {
  const [data, setData] = useState<any>()

  useEffect(() => {
    read('wonderful', 'marrow').then(data => {
      setData(data)
      console.log(data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  function handleChange(data: Marrow[]) {
    console.log(data)
  }

  function handleSave(data: Marrow[], audioInfo: AudioInfo | null) {
    save('wonderful', 'marrow', { data, audioInfo })
  }

  if (!data) return <></>

  return (
    <Build marrows={data.data} audioInfo={data.audioInfo} onChange={handleChange} onSave={handleSave} />
  )
}
