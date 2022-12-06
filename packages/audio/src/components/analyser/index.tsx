import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'

import AudioController from '../../audioController'
import { drawAnalyser } from '../../utils'

import './index.scss'

type Props = {
  audioController: AudioController,
  style?: React.CSSProperties,
  className?: string
}

export default function AudioAnalyser({
  audioController,
  style,
  className
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    audioController.addListener('changeBuffer', () => {
      canvasRef.current && drawAnalyser(canvasRef.current, audioController.getAnalyser())
    })
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const parentReact = (canvasRef.current.parentNode as HTMLElement).getBoundingClientRect()
    canvasRef.current.width = parentReact.width
    canvasRef.current.height = parentReact.height
  }, [canvasRef.current])

  return (
    <div className={classNames('audio-analyser-wrapper', className)} style={style}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
