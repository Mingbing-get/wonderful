import React from 'react'
import classnames from 'classnames'
import { IconMenu } from '@douyinfe/semi-icons'

import MarrowPicker from './marrowPicker'
import ShowOperation from './showOperation'
import { useBuildMarrow } from '../../context'

import './index.scss'

type Props = {
  className?: string,
  style?: React.CSSProperties,
}

export default function TopNav({
  className,
  style,
}: Props) {
  const { setShowStore } = useBuildMarrow()

  return (
    <div
      className={classnames('top-nav-wrapper', className)}
      style={style}
      onClick={e => { e.stopPropagation(); return false}}
    >
      <div className='top-nav-item'>
        <IconMenu style={{ cursor: 'pointer' }} onClick={e => setShowStore?.(true) } />
      </div>
      <div className='top-nav-item'>
        <MarrowPicker />
      </div>
      <div className='top-nav-item'>
        <ShowOperation />
      </div>
    </div>
  )
}
