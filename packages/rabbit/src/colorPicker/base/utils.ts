import { ColorObject, HSVObject } from './type'

const hexMap: Record<string, number> = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
}

export function isRgba(v: string): false | ColorObject {
  const matchRes = v.match(/^rgba?\((.*)\)$/)

  if (!matchRes) return false

  const dataList = matchRes[1].split(',').map((item) => Number(item.trim()))

  if (dataList.length < 3) return false

  for (const item of dataList) {
    if (isNaN(item)) return false
  }

  const res: ColorObject = {
    r: Math.min(Math.max(0, dataList[0]), 255),
    g: Math.min(Math.max(0, dataList[1]), 255),
    b: Math.min(Math.max(0, dataList[2]), 255),
  }

  if (dataList.length > 3) {
    res.a = Math.min(Math.max(0, dataList[3]), 255)
  }

  return res
}

export function isHex(v: string): false | ColorObject {
  if (!v.startsWith('#')) return false

  const factValue = v.substring(1)
  if (![3, 4, 6, 8].includes(factValue.length)) return false

  let valueList = factValue.split('')

  if (valueList.length <= 4) {
    valueList = valueList.reduce((total: string[], item) => {
      total.push(item, item)
      return total
    }, [])
  }

  const res: ColorObject = {
    r: 0,
    g: 0,
    b: 0,
  }

  for (let i = 0; i < valueList.length; i += 2) {
    const v1 = hexMap[valueList[i + 1]]
    const v2 = hexMap[valueList[i]]
    if (v1 === undefined || v2 === undefined) return false

    if (i === 0) {
      res.r = v1 + v2 * 16
    } else if (i === 2) {
      res.g = v1 + v2 * 16
    } else if (i === 4) {
      res.b = v1 + v2 * 16
    } else {
      res.a = v1 + v2 * 16
    }
  }

  return res
}

export function isHsla(v: string): false | ColorObject {
  const matchRes = v.match(/^hsla?\((.*)\)$/)

  if (!matchRes) return false

  const dataList = matchRes[1].split(',').map((item) => Number(item.trim().replace(/%$/, '')))

  if (dataList.length < 3) return false

  for (const item of dataList) {
    if (isNaN(item)) return false
  }

  const res: ColorObject = {
    r: 0,
    g: 0,
    b: 0,
  }

  if (dataList.length >= 4) {
    res.a = dataList[3] * 255
  }

  const H = dataList[0] / 360
  const S = dataList[1] / 100
  const L = dataList[2] / 100

  if (S === 0) {
    res.b = res.g = res.r = Math.round(L * 255)
  } else {
    function hue2rgb(p: number, q: number, t: number) {
      let data = p
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) {
        data = p + (q - p) * 6 * t
      }
      if (t < 1 / 2) {
        data = q
      }
      if (t < 2 / 3) {
        data = p + (q - p) * (2 / 3 - t) * 6
      }

      return Math.round(data * 255)
    }

    const q = L < 0.5 ? L * (1 + S) : L + S - L * S
    const p = 2 * L - q
    res.r = hue2rgb(p, q, H + 1 / 3)
    res.g = hue2rgb(p, q, H)
    res.b = hue2rgb(p, q, H - 1 / 3)
  }

  return res
}

export function toColorObject(v: string): false | ColorObject {
  const testHex = isHex(v)
  if (testHex !== false) return testHex

  const testRgba = isRgba(v)
  if (testRgba !== false) return testRgba

  const testHsla = isHsla(v)
  if (testHsla !== false) return testHsla

  return false
}

export function toRgba(v: string) {
  const data = toColorObject(v)
  if (data === false) return ''

  return colorObjectToRgba(data)
}

export function colorObjectToRgba(data: ColorObject) {
  const strList = [Math.round(data.r), Math.round(data.g), Math.round(data.b)]
  if (data.a !== undefined && data.a !== 255) {
    strList.push(Math.round(data.a))
    return `rgba(${strList.join(', ')})`
  }

  return `rgb(${strList.join(', ')})`
}

export function toHex(v: string) {
  const data = toColorObject(v)
  if (data === false) return ''

  return colorObjectToHex(data)
}

export function colorObjectToHex(data: ColorObject) {
  const strList = [toHexPanTow(data.r), toHexPanTow(data.g), toHexPanTow(data.b)]
  if (data.a !== undefined && data.a !== 255) {
    strList.push(toHexPanTow(data.a))
  }
  return `#${strList.join('')}`
}

export function toHexPanTow(v: number) {
  return Math.round(v).toString(16).padStart(2, '0')
}

export function toHsla(v: string) {
  const data = toColorObject(v)
  if (data === false) return ''

  return colorObjectToHsla(data)
}

export function colorObjectToHsla(data: ColorObject) {
  const r = data.r / 255
  const g = data.g / 255
  const b = data.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  let l = (max + min) / 2

  if (max == min) {
    h = s = 0
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  const strList = [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
  if (data.a !== undefined && data.a !== 255) {
    strList.push(Math.round(data.a / 255))
    return `hsla(${strList.join(', ')})`
  }

  return `hsl(${strList.join(', ')})`
}

export function colorObjectToHsvaObject(v: ColorObject) {
  const r = v.r / 255
  const g = v.g / 255
  const b = v.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const V = max
  const S = max === 0 ? 0 : (max - min) / max
  let H = 0
  if (r === max) {
    H = ((g - b) / (max - min)) * 60
  }
  if (g === max) {
    H = 120 + ((b - r) / (max - min)) * 60
  }
  if (b === max) {
    H = 240 + ((r - g) / (max - min)) * 60
  }
  if (H < 0) {
    H = H + 360
  }

  const res: HSVObject = {
    h: H,
    s: S,
    v: V,
  }

  if (v.a) {
    res.a = v.a / 255
  }

  return res
}

export function hsvaObjectToRgbaObject(v: HSVObject) {
  const h = Math.floor(v.h / 60)
  const f = v.h / 60 - h
  const p = v.v * (1 - v.s)
  const q = v.v * (1 - f * v.s)
  const t = v.v * (1 - (1 - f) * v.s)
  const res: ColorObject = {
    r: v.v,
    g: t,
    b: p,
  }

  if (h === 1) {
    res.r = q
    res.g = v.v
    res.b = p
  } else if (h === 2) {
    res.r = p
    res.g = v.v
    res.b = t
  } else if (h === 3) {
    res.r = p
    res.g = q
    res.b = v.v
  } else if (h === 4) {
    res.r = t
    res.g = p
    res.b = v.v
  } else if (h === 5) {
    res.r = v.v
    res.g = p
    res.b = q
  }

  res.r = Math.floor(res.r * 255)
  res.g = Math.floor(res.g * 255)
  res.b = Math.floor(res.b * 255)
  if (v.a) {
    res.a = v.a * 255
  }

  return res
}
