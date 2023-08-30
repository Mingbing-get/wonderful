import html2canvas from 'html2canvas'

export type StatusType = 'running' | 'pause' | 'inactive'
export type VideoType = 'webm'
export type StopType =
  | {
      action: 'download'
      type: VideoType
    }
  | {
      action: 'function'
      fn: (data: Blob[]) => void
    }

export default class Generate {
  private canvas: HTMLCanvasElement
  private recorder: MediaRecorder

  private recordBox?: HTMLElement
  private data: Blob[]
  private base64List: string[]
  private type: VideoType
  private startInterval?: number | NodeJS.Timeout
  private status: StatusType

  constructor() {
    this.type = 'webm'
    this.status = 'inactive'
    this.data = []
    this.base64List = []
    this.canvas = this.initCanvas()
    this.recorder = this.initRecorder(this.canvas)
    this.recorder.state
  }

  private initCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.style.backgroundColor = '#fff'
    canvas.width = 450
    canvas.height = 800
    return canvas
  }

  private initRecorder(canvas: HTMLCanvasElement): MediaRecorder {
    const stream = canvas.captureStream(60)

    const recorder = new MediaRecorder(stream, {
      // videoBitsPerSecond: 8500000
    })

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size) {
        this.data.push(event.data)
      }
    }

    recorder.onstart = () => {}

    recorder.onstop = () => {}

    return recorder
  }

  setRecordBox(box: HTMLElement) {
    this.recordBox = box
  }

  start() {
    if (this.status === 'pause') return

    if (!this.recordBox) {
      console.error('not record box')
      return
    }

    this.draw()
    this.status = 'running'
    this.recorder.start()
    this.startInterval = setInterval(() => {
      // this.draw()
      this.createImage()
    }, 20)
  }

  stop() {
    if (this.status !== 'running') return

    clearInterval(this.startInterval)

    this.status = 'pause'
    this.recorder.stop()
  }

  async createImage() {
    if (!this.recordBox) return

    const canvas = await html2canvas(this.recordBox)
    this.base64List.push(canvas.toDataURL('image/png'))
  }

  async generateByServe() {
    if (this.base64List.length === 0) return

    fetch('http://localhost:3001/api/generateMp4', {
      method: 'POST',
      body: this.base64List.join(' '),
      headers: {
        contentType: 'text/plain',
      },
    })
  }

  async draw() {
    const ctx = this.canvas.getContext('2d')
    if (!this.recordBox || !ctx) return

    const c = await html2canvas(this.recordBox)
    ctx.drawImage(
      c,
      0,
      0,
      this.canvas.width * window.devicePixelRatio,
      this.canvas.height * window.devicePixelRatio,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    )
  }

  download() {
    const url = URL.createObjectURL(new Blob(this.data, { type: `video/${this.type}` }))
    const element = document.createElement('a')
    element.setAttribute('href', url)
    element.setAttribute('download', '')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
}
