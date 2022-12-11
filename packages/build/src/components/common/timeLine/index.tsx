import React, { useMemo } from 'react'
import { Icon } from '@marrow/rabbit'

import './index.scss'

export type Node = {
  label?: string
  key: string
  index: number
}

type Props = {
  nodes: Node[]
  selectIndex?: number
  onAdd?: () => void
  onDelete?: (node: Node) => void
  onPick?: (node: Node) => void
}

export default function TimeLine({
  nodes,
  selectIndex,
  onAdd,
  onDelete,
  onPick
}: Props) {
  const sortNodes = useMemo(() => {
    return nodes.sort((cur, next) => cur.index - next.index)
  }, [nodes])

  return (
    <div className='time-line-wrapper'>
      {
        sortNodes.map(node => (
          <div className='time-line-item' key={node.key}>
            {
              selectIndex === node.index ? (
                <span className='time-line-delete' onClick={() => onDelete?.(node)}>
                  <Icon type='delete' style={{ color: 'red' }} />
                </span>
              ) : (
                <span className='time-line-node' onClick={() => onPick?.(node)}></span>
              )
            }
            <span className='time-line-line'></span>
          </div>
        ))
      }
      <span className='time-line-add' onClick={onAdd}>
        <Icon type='add' />
      </span>
    </div>
  )
}
