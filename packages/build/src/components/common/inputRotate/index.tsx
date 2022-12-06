import React, { useState, useEffect } from 'react'
import { InputNumber } from '@douyinfe/semi-ui'

import './index.scss'

type Props = {
  value?: number,
  onChange?: (value?: number) => void
}

export default function InputRotate({
  value,
  onChange
}: Props) {
  const [round, setRound] = useState<number>()
  const [deg, setDeg] = useState<number>()

  useEffect(() => {
    if (!value) {
      setRound(undefined)
      setDeg(undefined)
      return
    }

    const round = Math.floor(value / 360)
    const deg = value - round * 360

    setRound(round > 0 ? round : undefined)
    setDeg(deg > 0 ? deg : undefined)
  }, [value])

  function handleBlur() {
    onChange?.((round || 0) * 360 + (deg || 0))
  }

  return (
    <div className='input-rotate-wrapper'>
      <InputNumber
        suffix='r'
        value={round}
        onChange={val => setRound(val as number)}
        onBlur={handleBlur}
      />
      <span>+</span>
      <InputNumber
        suffix='°'
        value={deg}
        onChange={val => setDeg(val as number)}
        onBlur={handleBlur}
      />
    </div>
  )
}
