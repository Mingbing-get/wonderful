import React, { useMemo } from 'react'
import classNames from 'classnames'

import { getPathFromLinkTreeNode } from '../../hooks/useTree/utils'
import Icon from '../../icon'

import { LinkTreeNode } from '../../hooks/useTree/type'
import { TreeBaseProps, TreeNode } from '../../types/tree'

interface Props<T extends Object> extends Pick<TreeBaseProps<T>, 'draggleIcon' | 'draggable' | 'expandIcon' | 'renderExtra'> {
  level: number
  className?: string
  parentNode?: LinkTreeNode<TreeNode<T>>
}

export default function TreeExtraRender<T extends Object>({ level, parentNode, className, draggleIcon, draggable, expandIcon, renderExtra }: Props<T>) {
  const extra = useMemo(() => {
    const path = parentNode ? getPathFromLinkTreeNode(parentNode) : []
    return renderExtra?.(path, parentNode?.data)
  }, [parentNode])

  if (!extra) return <></>

  return (
    <div
      style={{ marginLeft: `${level}rem` }}
      className={classNames('tree-item', className, 'is-left')}>
      {draggable && draggleIcon && (
        <span
          className="draggle-handle"
          style={{ opacity: 0, cursor: 'default' }}>
          {draggleIcon === true ? <Icon type="draggle" /> : draggleIcon}
        </span>
      )}
      <span className="expand-handle">
        {expandIcon || (
          <Icon
            className="tree-arrow-right"
            type="arrowRight"
          />
        )}
      </span>
      {extra}
    </div>
  )
}
