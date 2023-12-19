import React from 'react'
import classNames from 'classnames'

import Icon from '../../icon'
import Checkbox from '../../checkbox'

import { LinkTreeNode } from '../../hooks/useTree/type'
import { TreeBaseProps, TreeNode, TreeLabelRender } from '../../types/tree'

interface Props extends Pick<TreeBaseProps, 'draggleIcon' | 'draggable' | 'expandIcon' | 'renderLabelIcon' | 'labelRender'> {
  level: number
  linkNode: LinkTreeNode<TreeNode>
  className?: string
  displayCheckbox?: boolean
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, linkNode: LinkTreeNode<TreeNode>) => void
  onDrop?: (e: React.DragEvent<HTMLDivElement>, linkNode: LinkTreeNode<TreeNode>) => void
  onDragOver?: (e: React.DragEvent<HTMLDivElement>, linkNode: LinkTreeNode<TreeNode>) => Promise<void>
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void
  onToggleExpand?: (linkNode: LinkTreeNode<TreeNode>) => void
  onToggleChecked?: (linkNode: LinkTreeNode<TreeNode>, checked?: boolean) => void
}

const defaultLabelRender: TreeLabelRender<{}> = (node) => node.label || node.value

export default function TreeNodeRender({
  level,
  linkNode,
  className,
  draggable,
  draggleIcon,
  expandIcon,
  displayCheckbox,
  renderLabelIcon,
  labelRender = defaultLabelRender,
  onDragStart,
  onDrop,
  onDragOver,
  onDragLeave,
  onToggleExpand,
  onToggleChecked,
}: Props) {
  return (
    <div
      style={{ marginLeft: `${level}rem` }}
      className={classNames(
        'tree-item',
        className,
        linkNode.isExpand && 'is-expand',
        linkNode.isLeft && 'is-left',
        linkNode.disabled && 'is-disabled',
        !displayCheckbox && linkNode.checked && 'is-checked'
      )}
      draggable={draggable}
      onDragStart={(e) => onDragStart?.(e, linkNode)}
      onDrop={(e) => onDrop?.(e, linkNode)}
      onDragOver={(e) => onDragOver?.(e, linkNode)}
      onDragLeave={onDragLeave}>
      {draggable && draggleIcon && <span className="draggle-handle">{draggleIcon === true ? <Icon type="draggle" /> : draggleIcon}</span>}
      {linkNode.isLoading ? (
        <Icon
          className="tree-item-loading-icon"
          type="loading"
        />
      ) : (
        <span
          className="expand-handle"
          onClick={() => onToggleExpand?.(linkNode)}>
          {expandIcon || (
            <Icon
              className="tree-arrow-right"
              type="arrowRight"
            />
          )}
        </span>
      )}
      {displayCheckbox && (
        <Checkbox
          checked={linkNode.checked}
          halfChecked={linkNode.halfChecked}
          disabled={linkNode.disabled}
          onChange={(checked) => onToggleChecked?.(linkNode, checked)}
        />
      )}
      <span
        onClick={() => !displayCheckbox && onToggleChecked?.(linkNode)}
        className="tree-item-label">
        {renderLabelIcon && <span className="label-icon">{renderLabelIcon(linkNode.data, linkNode.isExpand, linkNode.isLeft)}</span>}
        <span>{labelRender(linkNode.data)}</span>
      </span>
    </div>
  )
}
