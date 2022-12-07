// start, end (ms)
export function drawAudio(canvas: HTMLCanvasElement, audioBuffer: AudioBuffer | null, start?: number, end?: number) {
  const width = canvas.width
  const height = canvas.height
  const space = 6
  const maxVal = 3
  const halfHeight = height / 2
  const canvasCtx = canvas.getContext('2d')
  if (!canvasCtx) return

  canvasCtx.beginPath()
  canvasCtx.clearRect(0, 0, width, height)

  canvasCtx.lineWidth = 1
  canvasCtx.strokeStyle = "#990000"
  canvasCtx.moveTo(0, halfHeight)
  canvasCtx.lineTo(width, halfHeight)

  canvasCtx.stroke()
  canvasCtx.closePath()

  if (!audioBuffer) return
  const _start = Math.floor(Math.max((start || 0) * audioBuffer.sampleRate / 1000, 0))
  const _end = Math.ceil(Math.min((end || audioBuffer.duration * 1000) * audioBuffer.sampleRate / 1000, audioBuffer.length))

  const step = (_end - _start) / width
  const channelData1 = audioBuffer.getChannelData(0)
  const channelData2 = audioBuffer.getChannelData(0)

  canvasCtx.beginPath()
  canvasCtx.strokeStyle = "#0069c2"

  canvasCtx.moveTo(0, (channelData1[_start] + channelData2[_start]) / maxVal * height + halfHeight)
  
  for (let i = space; i < width - space * 2; i += space) {
    const curY = (channelData1[Math.floor(i * step) + _start] + channelData2[Math.floor(i * step) + _start]) / maxVal * height + halfHeight
    const nextY = (channelData1[Math.floor((i + space) * step) + _start] + channelData2[Math.floor((i + space) * step) + _start]) / maxVal * height + halfHeight
    const endY = (curY + nextY) / 2
    canvasCtx.quadraticCurveTo(i, curY, i + space / 2, endY)
  }
  const curY = (channelData1[Math.floor((width - space) * step) + _start] + channelData2[Math.floor((width - space) * step) + _start]) / maxVal * height + halfHeight
  const nextY = (channelData1[Math.floor(width * step) + _start - 1] + channelData2[Math.floor(width * step) + _start - 1]) / maxVal * height + halfHeight
  canvasCtx.quadraticCurveTo(width - space, curY, width, nextY)

  canvasCtx.stroke()
  canvasCtx.closePath()
}

export function drawAnalyser(canvas: HTMLCanvasElement, analyser: AnalyserNode) {
  analyser.fftSize = 2048
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyser.getByteTimeDomainData(dataArray)

  draw(canvas, analyser, canvas.width, canvas.height)

  function draw(canvas: HTMLCanvasElement, analyser: AnalyserNode, WIDTH: number, HEIGHT: number) {
    const canvasCtx = canvas.getContext('2d')
    if (!canvasCtx) return

    const drawVisual = requestAnimationFrame(() => draw(canvas, analyser, WIDTH, HEIGHT));

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 1;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    const sliceWidth = (WIDTH * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * HEIGHT) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }
}
