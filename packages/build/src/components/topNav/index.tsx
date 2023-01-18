import React from 'react'
import classnames from 'classnames'
import { Icon, Button } from '@marrow/rabbit'

import MarrowPicker from './marrowPicker'
import ShowOperation from './showOperation'
import { useBuildMarrow } from '../../context'

import './index.scss'

type Props = {
  className?: string,
  style?: React.CSSProperties,
  onSave?: () => void,
}

export default function TopNav({
  className,
  style,
  onSave,
}: Props) {
  const { setShowStore } = useBuildMarrow()

  return (
    <div
      className={classnames('top-nav-wrapper', className)}
      style={style}
      onClick={e => { e.stopPropagation(); return false}}
    >
      <div className='top-nav-item'>
        <Icon type='menu' style={{ cursor: 'pointer' }} onClick={() => setShowStore?.(true) } />
      </div>
      <div className='top-nav-item'>
        <MarrowPicker />
      </div>
      <div className='top-nav-item'>
        <ShowOperation />
      </div>
      <div className='top-nav-right'>
        <Button type='primary' onClick={onSave}>保存</Button>
      </div>
    </div>
  )
}
