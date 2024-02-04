export type ZIndexLevel = 'normal' | 'middle' | 'important'

interface ZIndexScope {
  min: number
  max: number
}

class ZIndexManager {
  private value: Record<ZIndexLevel, number>

  readonly scope: Record<ZIndexLevel, ZIndexScope> = {
    normal: { min: 100000, max: 299999 },
    middle: { min: 300000, max: 499999 },
    important: { min: 500000, max: 699999 },
  }

  constructor() {
    this.value = {
      normal: this.scope.normal.min,
      middle: this.scope.middle.min,
      important: this.scope.important.min,
    }
  }

  next(level: ZIndexLevel) {
    this.value[level]++

    if (this.value[level] === this.scope[level].max) {
      this.value[level] = this.scope[level].min
    }

    return this.value[level]
  }
}

export default new ZIndexManager()
