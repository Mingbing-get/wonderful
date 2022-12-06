import React, { useRef, useState, useEffect } from 'react'
import classNames from 'classnames'

import './index.scss'

type Props = {
  min: number,
  max: number,
  units: string[],
  radixs: number[],
  thresholds: number[],
  fixed?: number,
  minSpace?: number
}

export default function Ruler({
  min,
  max,
  units,
  radixs,
  thresholds,
  fixed = 1,
  minSpace = 6
}: Props) {
  const [unit, setUnit] = useState<string>('')
  const [nums, setNums] = useState<string[]>([])
  const [count, setCount] = useState(0)
  const [space, setSpace] = useState(minSpace)
  const rulerContent = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   window.addEventListener('reset', () => {
  //     computedCountAndPadding()
  //   })
  // }, [])

  useEffect(() => {
    computedCountAndPadding()
  }, [rulerContent.current, minSpace])

  useEffect(() => {
    const curIndex = findCurIndex()
    const curRadix = radixs[curIndex]
    const _min = min / curRadix
    const _max = max / curRadix
    const _fixed = (_max - _min) >= count ? 0 : fixed

    const step = (_max - _min) / count
    const nums: string[] = []
    for (let i = 0; i <= count; i++) {
      nums.push((_min + i * step).toFixed(_fixed))
    }
    
    setNums(nums)
    setUnit(units[curIndex])
  }, [count, min, max, units, radixs, thresholds])

  function computedCountAndPadding() {
    if (!rulerContent.current) return

    const width = rulerContent.current.getBoundingClientRect().width
    const spaceCount = Math.floor((width - 4) / (minSpace * 10)) * 10
    const spaceLeft = (width - 4) % (minSpace * 10)
    const space = minSpace + spaceLeft / spaceCount

    setCount(spaceCount / 10)
    setSpace(space)
  }

  function findCurIndex(): number {
    for (let i = 0; i < thresholds.length; i++) {
      if (thresholds[i] < max) {
        return i
      }
    }

    return thresholds.length - 1
  }

  return (
    <div className='ruler-wrapper'>
      <div className='ruler-content' ref={rulerContent}>
        <div className='ruler-scale' style={{ '--space': `${space}px` } as React.CSSProperties} />
        {
          nums.map((item, index) => (
            <span
              className={classNames('ruler-num', index === 0 && 'is-first', index === nums.length - 1 && 'is-last')}
              key={index}
              style={{ left: `${index * space * 10}px` }}
            >{item}{unit}</span>
          ))
        }
      </div>
    </div>
  )
}
