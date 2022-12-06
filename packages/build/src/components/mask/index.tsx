import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MARROW_ID_NAME, stopPropagation } from '@marrow/utils'

import { useBuildMarrow } from '../../context'
import useActions from './useActions'

import './index.scss'

function Mask() {
  const [selectedRect, setSelectedRect] = useState<DOMRect>()
  const { selectedId } = useBuildMarrow()

  const actions = useActions()

  useEffect(() => {
    if (!selectedId) return

    setTimeout(() => {
      const selectedDom = document.querySelector(`[${MARROW_ID_NAME}="${selectedId}"]`)
      setSelectedRect(selectedDom?.getBoundingClientRect()) 
    })
  }, [selectedId])

  if (!selectedRect || !selectedId) {
    return <></>
  }

  return (
    <div
      className='mask-wrapper'
      style={{ top: selectedRect.top - 1, left: selectedRect.left - 1, width: selectedRect.width, height: selectedRect.height }}
    >
      <div className='mask-actions'>
        {
          actions.map(({ icon, key, onClick }) => (
            <span
              className='mask-actions-item'
              onClick={e => {
                stopPropagation(e)
                onClick(selectedId)
              }}
              key={key}
            >
              {icon}
            </span>
          ))
        }
      </div>
    </div>
  )
}

export default function PortalMask() {
  const wrapper = useRef<any>(null)

  useEffect(() => {
    wrapper.current = document.createElement('div')

    document.body.appendChild(wrapper.current)
  }, [])

  if (!wrapper.current) return <></>

  return createPortal(<Mask />, wrapper.current as HTMLDivElement)
}
