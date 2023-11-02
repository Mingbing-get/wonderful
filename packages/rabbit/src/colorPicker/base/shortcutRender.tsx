import classNames from 'classnames'
import React, { useMemo } from 'react'

import ColorBlock from './colorBlock'
import { toHex } from './utils'

interface Props {
  value?: string
  shortcutList?: string[]
  style?: React.CSSProperties
  className?: string
  onPickColor?: (color: string) => void
}

const defaultShortcutList = [
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
]

export default function ShortcutRender({ shortcutList = defaultShortcutList, value, style, className, onPickColor }: Props) {
  const _shortcutList = useMemo(() => {
    return shortcutList.map((item) => toHex(item))
  }, [shortcutList])

  if (!shortcutList?.length) return <></>

  return (
    <div
      className={classNames('rabbit-color-shortcut', className)}
      style={style}>
      {_shortcutList.map((item) => (
        <ColorBlock
          key={item}
          color={item}
          isChecked={item === value}
          onClick={onPickColor}
        />
      ))}
    </div>
  )
}
