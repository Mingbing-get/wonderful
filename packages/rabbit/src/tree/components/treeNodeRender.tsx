import React from 'react'
import classNames from 'classnames'

import Icon from '../../icon'
import Checkbox from '../../checkbox'
import TreeEditRender from './treeEditRender'

import { LinkTreeNode } from '../../hooks/useTree/type'
import { TreeBaseProps, TreeNode, TreeLabelRender } from '../../types/tree'

type NeedTreeProps = 'draggleIcon' | 'draggable' | 'expandIcon' | 'renderLabelIcon' | 'labelRender' | 'addNodePanelRender' | 'updateNodePanelRender'
interface Props<T extends Object> extends Pick<TreeBaseProps<T>, NeedTreeProps> {
  level: number
  linkNode: LinkTreeNode<TreeNode<T>>
  className?: string
  displayCheckbox?: boolean
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, linkNode: LinkTreeNode<TreeNode<T>>) => void
  onDrop?: (e: React.DragEvent<HTMLDivElement>, linkNode: LinkTreeNode<TreeNode<T>>) => void
  onDragOver?: (e: React.DragEvent<HTMLDivElement>, linkNode: LinkTreeNode<TreeNode<T>>) => Promise<void>
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void
  onToggleExpand?: (linkNode: LinkTreeNode<TreeNode<T>>) => void
  onToggleChecked?: (linkNode: LinkTreeNode<TreeNode<T>>, checked?: boolean) => void

  addSibling: (refNode: LinkTreeNode<TreeNode<T>>, newNode: TreeNode<T>) => void
  addChild: (refNode: LinkTreeNode<TreeNode<T>>, newNode: TreeNode<T>) => void
  updateNode: (refNode: LinkTreeNode<TreeNode<T>>, newNode: TreeNode<T>) => void
}

const defaultLabelRender: TreeLabelRender<{}> = (node) => node.label || node.value

export default function TreeNodeRender<T extends Object>({
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
  addNodePanelRender,
  updateNodePanelRender,

  addSibling,
  addChild,
  updateNode,
}: Props<T>) {
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
      {(addNodePanelRender || updateNodePanelRender) && (
        <TreeEditRender
          linkNode={linkNode}
          addNodePanelRender={addNodePanelRender}
          updateNodePanelRender={updateNodePanelRender}
          addChild={addChild}
          addSibling={addSibling}
          updateNode={updateNode}
        />
      )}
    </div>
  )
}
