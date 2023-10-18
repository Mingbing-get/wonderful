function createChart(start: number, count: number) {
  return new Array(count).fill(1).map((_, index) => String.fromCharCode(index + start))
}

const indexList = [...createChart(65, 26), ...createChart(97, 26), ...createChart(48, 10), '+', '/']

const squareList = [1, 2, 4, 8, 16, 32]

export function toBase64(str: string) {
  const len = Math.ceil(str.length / 3) * 3
  const fillCount = len - str.length
  const buffer = new Uint8Array(len * 8)

  for (let i = 0; i < str.length; i++) {
    const chart = str[i]
    let code = chart.charCodeAt(0)

    let k = 7
    while (k >= 0) {
      buffer[i * 8 + k] = code % 2
      code = Math.floor(code / 2)

      k--
    }
  }

  const base64StrList: string[] = []
  for (let i = 0; i < buffer.length - fillCount * 6; i += 6) {
    let k = 5
    let code = 0
    while (k >= 0) {
      code += buffer[i + k] === 0 ? 0 : squareList[5 - k]
      k--
    }

    base64StrList.push(indexList[code])
  }

  if (fillCount === 1) {
    base64StrList.push('=')
  }

  if (fillCount === 2) {
    base64StrList.push('=', '=')
  }

  return base64StrList.join('')
}
