import React, { memo, forwardRef, useRef, useEffect, useImperativeHandle } from 'react'

import AudioController from '../../audioController'
import { drawAudio } from '../../utils'

type Props = {
  audioController: AudioController
}

export type DrawAudioRef = {
  reDraw: (start?: number, end?: number) => void
}

const DrawAudio = memo(forwardRef<DrawAudioRef | undefined, Props>(({ audioController }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    audioController.addListener('changeBuffer', (_, sourceNode) => {
      canvasRef.current && drawAudio(canvasRef.current, sourceNode.buffer)
    })
  }, [])

  useImperativeHandle(ref, () => ({
    reDraw: (start, end) => {
      canvasRef.current && drawAudio(canvasRef.current, audioController.getSourceNode().buffer, start, end)
    }
  }), [canvasRef.current])

  useEffect(() => {
    if (!canvasRef.current) return

    const parentReact = (canvasRef.current.parentNode as HTMLElement).getBoundingClientRect()
    canvasRef.current.width = parentReact.width
    canvasRef.current.height = parentReact.height
    drawAudio(canvasRef.current, audioController.getSourceNode().buffer)
  }, [canvasRef.current])

  return (
    <canvas ref={canvasRef}></canvas>
  )
}))

export default DrawAudio
