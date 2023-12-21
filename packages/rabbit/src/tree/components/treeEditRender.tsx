import React, { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'

import { findLinkPath } from '../../hooks/useTree/utils'
import Icon from '../../icon'
import Popover from '../../popover'

import { LinkTreeNode } from '../../hooks/useTree/type'
import { TreeNode, TreeBaseProps } from '../../types/tree'

interface Props<T extends Object> extends Pick<TreeBaseProps<T>, 'addNodePanelRender' | 'updateNodePanelRender' | 'removeNodePanelRender'> {
  linkNode: LinkTreeNode<TreeNode<T>>

  addSibling: (refNode: LinkTreeNode<TreeNode<T>>, newNode: TreeNode<T>) => void
  addChild: (refNode: LinkTreeNode<TreeNode<T>>, newNode: TreeNode<T>) => void
  updateNode: (refNode: LinkTreeNode<TreeNode<T>>, newNode: TreeNode<T>) => void
  removeNode: (refNode: LinkTreeNode<TreeNode<T>>) => void
}

type EditAction = 'add' | 'update' | 'remove'

export default function TreeEditRender<T extends Object>({
  linkNode,
  addNodePanelRender,
  updateNodePanelRender,
  removeNodePanelRender,
  addSibling,
  addChild,
  updateNode,
  removeNode,
}: Props<T>) {
  const [visible, setVisible] = useState<Partial<Record<EditAction, boolean>>>({})

  const path = useMemo(() => findLinkPath(linkNode).map((node) => node.value), [linkNode])

  const _addNextSibling = useCallback(
    (newNode: TreeNode<T>) => {
      addSibling(linkNode, newNode)
      setVisible({})
    },
    [linkNode, addSibling]
  )

  const _addChild = useCallback(
    (newNode: TreeNode<T>) => {
      addChild(linkNode, newNode)
      setVisible({})
    },
    [linkNode, addChild]
  )

  const _updateNode = useCallback(
    (newNode: TreeNode<T>) => {
      updateNode(linkNode, newNode)
      setVisible({})
    },
    [linkNode, updateNode]
  )

  const _removeNode = useCallback(() => {
    removeNode(linkNode)
    setVisible({})
  }, [linkNode, removeNode])

  const needShow = useMemo(() => {
    return visible.add || visible.remove || visible.update
  }, [visible])

  return (
    <div className={classNames('tree-item-insert', needShow && 'is-panel-visible')}>
      <div className="insert-line" />
      <div className="icon-wrapper">
        {addNodePanelRender && (
          <Popover
            arrow="none"
            placement="bottom-start"
            visible={visible.add}
            preventControlVisible
            content={<div>{addNodePanelRender({ refNode: linkNode.data, path, addNextSibling: _addNextSibling, addChild: _addChild })}</div>}>
            <span
              className="insert-icon-item"
              onClick={() => setVisible({ add: !visible.add })}>
              <Icon type="add" />
            </span>
          </Popover>
        )}
        {updateNodePanelRender && (
          <Popover
            arrow="none"
            placement="bottom-start"
            visible={visible.update}
            preventControlVisible
            content={<div>{updateNodePanelRender({ refNode: linkNode.data, path, updateNode: _updateNode })}</div>}>
            <span
              className="insert-icon-item"
              onClick={() => setVisible({ update: !visible.update })}>
              <Icon type="edit" />
            </span>
          </Popover>
        )}
        {removeNodePanelRender &&
          (removeNodePanelRender === true ? (
            <span
              className="insert-icon-item is-delete-icon"
              onClick={_removeNode}>
              <Icon type="delete" />
            </span>
          ) : (
            <Popover
              arrow="none"
              placement="bottom-start"
              visible={visible.remove}
              preventControlVisible
              content={<div>{removeNodePanelRender({ refNode: linkNode.data, path, removeNode: _removeNode })}</div>}>
              <span
                className="insert-icon-item is-delete-icon"
                onClick={() => setVisible({ remove: !visible.remove })}>
                <Icon type="delete" />
              </span>
            </Popover>
          ))}
      </div>
    </div>
  )
}
