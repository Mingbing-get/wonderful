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
  const [visibleAddPanel, setVisibleAddPanel] = useState(false)
  const [visibleUpdatePanel, setVisibleUpdatePanel] = useState(false)
  const [visibleRemovePanel, setVisibleRemovePanel] = useState(false)

  const path = useMemo(() => findLinkPath(linkNode).map((node) => node.value), [linkNode])

  const _addNextSibling = useCallback(
    (newNode: TreeNode<T>) => {
      addSibling(linkNode, newNode)
      setVisibleAddPanel(false)
    },
    [linkNode, addSibling]
  )

  const _addChild = useCallback(
    (newNode: TreeNode<T>) => {
      addChild(linkNode, newNode)
      setVisibleAddPanel(false)
    },
    [linkNode, addChild]
  )

  const _updateNode = useCallback(
    (newNode: TreeNode<T>) => {
      updateNode(linkNode, newNode)
      setVisibleUpdatePanel(false)
    },
    [linkNode, updateNode]
  )

  const _removeNode = useCallback(() => {
    removeNode(linkNode)
    setVisibleRemovePanel(false)
  }, [linkNode, removeNode])

  const needShow = useMemo(() => {
    return visibleAddPanel || visibleUpdatePanel || visibleRemovePanel
  }, [visibleAddPanel, visibleUpdatePanel, visibleRemovePanel])

  return (
    <div className={classNames('tree-item-insert', needShow && 'is-panel-visible')}>
      <div className="insert-line" />
      <div className="icon-wrapper">
        {addNodePanelRender && (
          <Popover
            arrow="none"
            placement="bottom-start"
            visible={visibleAddPanel}
            onVisibleChange={setVisibleAddPanel}
            content={<div>{addNodePanelRender({ refNode: linkNode.data, path, addNextSibling: _addNextSibling, addChild: _addChild })}</div>}>
            <span className="insert-icon-item">
              <Icon type="add" />
            </span>
          </Popover>
        )}
        {updateNodePanelRender && (
          <Popover
            arrow="none"
            placement="bottom-start"
            visible={visibleUpdatePanel}
            onVisibleChange={setVisibleUpdatePanel}
            content={<div>{updateNodePanelRender({ refNode: linkNode.data, path, updateNode: _updateNode })}</div>}>
            <span className="insert-icon-item">
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
              visible={visibleRemovePanel}
              onVisibleChange={setVisibleRemovePanel}
              content={<div>{removeNodePanelRender({ refNode: linkNode.data, path, removeNode: _removeNode })}</div>}>
              <span className="insert-icon-item is-delete-icon">
                <Icon type="delete" />
              </span>
            </Popover>
          ))}
      </div>
    </div>
  )
}
