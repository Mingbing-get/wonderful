import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

import './index.scss'

type Props = {
  value?: boolean,
  yesText?: string,
  noText?: string,
  onChange?: (value: boolean) => void
}

export default function Switch({
  value = false,
  yesText,
  noText,
  onChange
}: Props) {
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
      className={classNames('rabbit-switch-wrapper', _value && 'is-yes')}
      onClick={handleClick}
    >
      <div className='switch-trick'>
        <span className='switch-text'>{_value ? yesText : noText}</span>
        <span className='switch-bar'></span>
      </div>
    </div>
  )
}
