import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { SwitchProps } from '../types/switch'

import './index.scss'

export default function Switch({ value = false, yesText, noText, onChange, ...extra }: SwitchProps) {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    if (value === _value) return
    setValue(value)
  }, [value])

  function handleClick() {
    setValue(!_value)
    onChange?.(!_value)
  }

  return (
    <div
      {...extra}
      className={classNames('rabbit-switch-wrapper', 'rabbit-component', _value && 'is-yes')}
      onClick={handleClick}>
      <div className="switch-trick">
        <span className="switch-text">{_value ? yesText : noText}</span>
        <span className="switch-bar"></span>
      </div>
    </div>
  )
}
