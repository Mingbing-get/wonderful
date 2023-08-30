export type AudioEventType = 'changeBuffer' | 'end' | 'loopEnd'
export type AudioChangeCurrentTime = 'changeCurrentTime'
export type AudioChangeStatus = 'changeStatus'
export type AudioListener = (audioCtx: AudioContext, sourceNode: AudioBufferSourceNode, analyser: AnalyserNode) => void
export type AudioChangeCurrentTimeListener = (currentTime: number) => void
export type AudioChangeStatusListener = (preStatus: StatusType, status: StatusType) => void
export type AudioListenerMap = Record<AudioEventType, AudioListener[]> &
  Record<AudioChangeCurrentTime, AudioChangeCurrentTimeListener[]> &
  Record<AudioChangeStatus, AudioChangeStatusListener[]>
export type StatusType = 'pause' | 'running' | 'suspended' | 'end' | 'loading'

export type AudioInfo = {
  buffer: Float32Array[]
  sampleRate: number
}

export default class AudioController {
  private audioCtx: AudioContext
  private sourceNode: AudioBufferSourceNode
  private analyser: AnalyserNode
  private listenerMap: AudioListenerMap
  private totalTime: number
  private currentTime: number
  private status: StatusType
  private tempStatus: StatusType
  private loop: boolean

  private startTime?: Date
  private lastStartTime: number
  private playingTimer?: number | NodeJS.Timeout

  constructor() {
    this.audioCtx = new AudioContext()
    this.analyser = this.audioCtx.createAnalyser()
    this.sourceNode = this.audioCtx.createBufferSource()
    this.createSourceNode()

    this.listenerMap = {} as AudioListenerMap
    this.totalTime = 0
    this.currentTime = 0
    this.lastStartTime = 0
    this.status = 'suspended'
    this.tempStatus = 'suspended'
    this.loop = false
  }

  private createSourceNode(buffer?: AudioBuffer) {
    const newSourceNode = this.audioCtx.createBufferSource()
    if (buffer) {
      newSourceNode.buffer = buffer
    }

    newSourceNode.addEventListener('ended', () => {
      this.pause()
      if (this.loop) {
        this.trigger('loopEnd')
        this.restart()
      } else {
        this.trigger('end')
        this.changeStatus('end')
      }
    })

    newSourceNode.connect(this.audioCtx.destination)
    newSourceNode.connect(this.analyser)

    this.sourceNode = newSourceNode
  }

  private beforeChangeBuffer() {
    this.tempStatus = this.status
    if (this.tempStatus === 'running') {
      this.pause()
    }
    this.changeStatus('loading')
  }

  private afterChangeBuffer() {
    if (this.tempStatus === 'running') {
      this.changeStatus('suspended')
      this.start()
    } else {
      this.changeStatus(this.tempStatus)
    }
  }

  addAudioBySrc(src: string) {
    this.beforeChangeBuffer()
    return new Promise((resolve, reject) => {
      fetch(src)
        .then((res) => res.arrayBuffer())
        .then((buffer) => this.decodeAudioFromArrayBuffer(buffer))
        .then((message) => {
          this.afterChangeBuffer()
          resolve(message)
        })
        .catch(reject)
    })
  }

  addAudioByFile(file: File) {
    this.beforeChangeBuffer()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        this.decodeAudioFromArrayBuffer(reader.result as ArrayBuffer)
          .then((message) => {
            this.afterChangeBuffer()
            resolve(message)
          })
          .catch(reject)
      }
      reader.onerror = () => {
        reject(reader.error?.message)
      }
      reader.readAsArrayBuffer(file)
    })
  }

  decodeAudioFromArrayBuffer(buffer: ArrayBuffer) {
    return new Promise((resolve, reject) => {
      this.audioCtx.decodeAudioData(
        buffer,
        (audioBuffer) => {
          this.addAudioBuffer(audioBuffer)
          resolve('ok')
        },
        reject
      )
    })
  }

  addAudioBuffer(audioBuffer: AudioBuffer) {
    if (this.sourceNode.buffer) {
      const beforeLen = this.sourceNode.buffer.length
      const audioBufferCopy = this.audioCtx.createBuffer(2, beforeLen + audioBuffer.length, this.sourceNode.buffer.sampleRate)
      audioBufferCopy.copyToChannel(this.sourceNode.buffer.getChannelData(0), 0, 0)
      audioBufferCopy.copyToChannel(this.sourceNode.buffer.getChannelData(1), 1, 0)
      audioBufferCopy.copyToChannel(audioBuffer.getChannelData(0), 0, beforeLen)

      let otherChannel = 1
      if (audioBuffer.numberOfChannels === 1) {
        otherChannel = 0
      }

      audioBufferCopy.copyToChannel(audioBuffer.getChannelData(otherChannel), 1, beforeLen)
      this.createSourceNode(audioBufferCopy)
    } else {
      this.sourceNode.buffer = audioBuffer
    }

    this.changeBuffer()
  }

  getFloat32ArrayFromAudio(): AudioInfo | null {
    if (!this.sourceNode.buffer) return null

    return {
      buffer: [this.sourceNode.buffer.getChannelData(0), this.sourceNode.buffer.getChannelData(1)],
      sampleRate: this.sourceNode.buffer.sampleRate,
    }
  }

  addAudioBufferByFloat32Array(audioInfo: AudioInfo) {
    if (!audioInfo) return
    this.beforeChangeBuffer()

    if (this.sourceNode.buffer) {
      const beforeLen = this.sourceNode.buffer.length
      const audioBufferCopy = this.audioCtx.createBuffer(2, beforeLen + audioInfo.buffer[0].length, this.sourceNode.buffer.sampleRate)
      audioBufferCopy.copyToChannel(this.sourceNode.buffer.getChannelData(0), 0, 0)
      audioBufferCopy.copyToChannel(this.sourceNode.buffer.getChannelData(1), 1, 0)
      audioBufferCopy.copyToChannel(audioInfo.buffer[0], 0, beforeLen)

      let otherChannel = 1
      if (audioInfo.buffer.length === 1) {
        otherChannel = 0
      }

      audioBufferCopy.copyToChannel(audioInfo.buffer[otherChannel], 1, beforeLen)
      this.createSourceNode(audioBufferCopy)
    } else {
      const audioBufferCopy = this.audioCtx.createBuffer(audioInfo.buffer.length, audioInfo.buffer[0].length, audioInfo.sampleRate)
      audioBufferCopy.copyToChannel(audioInfo.buffer[0], 0, 0)

      let otherChannel = 1
      if (audioInfo.buffer.length === 1) {
        otherChannel = 0
      }

      audioBufferCopy.copyToChannel(audioInfo.buffer[otherChannel], 1, 0)
      this.createSourceNode(audioBufferCopy)
    }

    this.changeBuffer()
    this.afterChangeBuffer()
  }

  clearBuffer() {
    this.createSourceNode()
    this.changeBuffer()
  }

  // start,end (ms)
  selectParagraph(start: number, end: number) {
    const curBuffer = this.sourceNode.buffer
    const _start = Math.floor((start / 1000) * this.audioCtx.sampleRate)
    if (!curBuffer || curBuffer.length <= _start) return

    this.beforeChangeBuffer()
    const _end = Math.min(Math.ceil((end / 1000) * this.audioCtx.sampleRate), curBuffer.length)

    const audioBufferCopy = this.audioCtx.createBuffer(2, _end - _start, curBuffer.sampleRate)
    audioBufferCopy.copyToChannel(curBuffer.getChannelData(0).slice(_start, _end), 0, 0)
    audioBufferCopy.copyToChannel(curBuffer.getChannelData(1).slice(_start, _end), 1, 0)

    this.createSourceNode(audioBufferCopy)
    this.changeBuffer()
    this.afterChangeBuffer()
  }
  // start,end (ms)
  deleteParagraph(start: number, end: number) {
    const curBuffer = this.sourceNode.buffer
    const _start = Math.floor((start / 1000) * this.audioCtx.sampleRate)
    if (!curBuffer || curBuffer.length <= _start) return

    this.beforeChangeBuffer()
    const totalLen = curBuffer.length
    const _end = Math.min(Math.ceil((end / 1000) * this.audioCtx.sampleRate), totalLen)

    const audioBufferCopy = this.audioCtx.createBuffer(2, _start + (totalLen - end), curBuffer.sampleRate)
    audioBufferCopy.copyToChannel(curBuffer.getChannelData(0).slice(0, _start), 0, 0)
    audioBufferCopy.copyToChannel(curBuffer.getChannelData(0).slice(_end), 0, _start)

    audioBufferCopy.copyToChannel(curBuffer.getChannelData(1).slice(0, _start), 1, 0)
    audioBufferCopy.copyToChannel(curBuffer.getChannelData(1).slice(_end), 1, _start)

    this.createSourceNode(audioBufferCopy)
    this.changeBuffer()
    this.afterChangeBuffer()
  }
  // location (ms)
  insertAudio(location: number, channel1Data: Float32Array, channel2Data: Float32Array) {
    if (channel1Data.length !== channel2Data.length) return

    this.beforeChangeBuffer()
    const curBuffer = this.sourceNode.buffer || this.audioCtx.createBuffer(2, 0, this.audioCtx.sampleRate)
    const _location = Math.min(Math.floor((location / 1000) * this.audioCtx.sampleRate), curBuffer.length)
    const audioBufferCopy = this.audioCtx.createBuffer(2, curBuffer.length + channel1Data.length, curBuffer.sampleRate)

    audioBufferCopy.copyToChannel(curBuffer.getChannelData(0).slice(0, _location), 0, 0)
    audioBufferCopy.copyToChannel(curBuffer.getChannelData(1).slice(0, _location), 1, 0)
    audioBufferCopy.copyToChannel(channel1Data, 0, _location)
    audioBufferCopy.copyToChannel(channel2Data, 1, _location)
    audioBufferCopy.copyToChannel(curBuffer.getChannelData(0).slice(_location), 0, _location + channel1Data.length)
    audioBufferCopy.copyToChannel(curBuffer.getChannelData(1).slice(_location), 1, _location + channel1Data.length)

    this.createSourceNode(audioBufferCopy)
    this.changeBuffer()
    this.afterChangeBuffer()
  }

  getContext(): AudioContext {
    return this.audioCtx
  }

  getSourceNode(): AudioBufferSourceNode {
    return this.sourceNode
  }

  getAnalyser(): AnalyserNode {
    return this.analyser
  }

  getTotalTime(): number {
    return this.totalTime
  }

  getCurrentTime(): number {
    return this.currentTime
  }

  getStatus(): StatusType {
    return this.status
  }

  getLoop(): boolean {
    return this.loop
  }

  setLoop(loop: boolean) {
    this.loop = loop
  }

  start() {
    if (this.status === 'running') return

    if (this.status === 'loading') {
      this.tempStatus = 'running'
      return
    }

    if (this.status !== 'suspended') {
      this.createSourceNode(this.sourceNode.buffer || undefined)
    }

    this.sourceNode.start(0, this.currentTime / 1000)
    this.lastStartTime = this.currentTime
    this.changeStatus('running')
    this.startTime = new Date()
    this.watchPlaying()
  }

  restart() {
    this.pause()
    this.currentTime = 0
    this.start()
  }

  pause() {
    if (this.status !== 'running') return

    if (this.startTime) {
      this.currentTime = this.lastStartTime + new Date().getTime() - this.startTime.getTime()
      this.startTime = undefined
      this.changeStatus('pause')
    }

    clearInterval(this.playingTimer)
    this.sourceNode.stop()
  }

  seek(time: number) {
    if (this.totalTime === 0) {
      this.currentTime = 0
      return
    }

    if (time < 0) time = 0
    if (time > this.totalTime) time = time % this.totalTime

    if (this.status === 'running') {
      this.pause()
      this.currentTime = time
      this.start()
    } else {
      this.currentTime = time
    }
    this.triggerChangeCurrentTime()
  }

  private watchPlaying() {
    this.playingTimer = setInterval(() => {
      this.currentTime = this.lastStartTime + new Date().getTime() - (this.startTime?.getTime() || 0)
      if (this.currentTime > this.getTotalTime()) {
        this.currentTime = this.getTotalTime()
      }
      this.triggerChangeCurrentTime()
    }, 60)
  }

  private changeBuffer() {
    this.totalTime = (this.sourceNode.buffer?.duration || 0) * 1000
    if (this.currentTime > this.totalTime) {
      this.currentTime = 0
    }
    this.trigger('changeBuffer')
  }

  private changeStatus(status: StatusType) {
    if (this.status === status) return

    const preStatus = this.status
    this.status = status
    this.triggerChangeStatus(preStatus)
  }

  addListener(eventType: AudioChangeStatus, listener: AudioChangeStatusListener): void
  addListener(eventType: AudioChangeCurrentTime, listener: AudioChangeCurrentTimeListener): void
  addListener(eventType: AudioEventType, listener: AudioListener): void
  addListener(
    eventType: AudioEventType | AudioChangeCurrentTime | AudioChangeStatus,
    listener: AudioListener | AudioChangeCurrentTimeListener | AudioChangeStatusListener
  ) {
    if (this.listenerMap[eventType]) {
      this.listenerMap[eventType].push(listener as any)
    } else {
      this.listenerMap[eventType] = [listener as any]
    }
  }

  trigger(eventType: AudioEventType) {
    this.listenerMap[eventType]?.forEach((fn) => fn(this.audioCtx, this.sourceNode, this.analyser))
  }

  triggerChangeCurrentTime() {
    this.listenerMap['changeCurrentTime']?.forEach((fn) => fn(this.currentTime))
  }

  triggerChangeStatus(preStatus: StatusType) {
    this.listenerMap['changeStatus']?.forEach((fn) => fn(preStatus, this.status))
  }
}
