import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import { LinkTreeNode, TreeMode } from '../../hooks/useTree/type'
import { getExpandLinkPathFromLinkForest } from '../../hooks/useTree/utils'
import { CascaderOption, CascaderTriggerType } from '../../types/cascader'

import Icon from '../../icon'
import Checkbox from '../../checkbox'

type Props<T extends object> = {
  linkForest: LinkTreeNode<CascaderOption<T>>[]
  mode: TreeMode
  expandIcon?: React.ReactNode
  expandTrigger: CascaderTriggerType
  setChecked: (data: CascaderOption<T>, checked: boolean, closePopover?: boolean) => void
  setExpandNode: (data?: CascaderOption<T> | undefined, expand?: boolean | undefined) => void
}

export default function Panel<T extends object>({ linkForest, mode, expandIcon, expandTrigger, setChecked, setExpandNode }: Props<T>) {
  const renderForestList = useMemo(() => {
    const renderForestList = [linkForest]

    getExpandLinkPathFromLinkForest(linkForest)[0]?.forEach((item) => {
      if (item.children) {
        renderForestList.push(item.children)
      }
    })

    return renderForestList
  }, [linkForest])

  const handleChangeExpand = useCallback(
    (linkNode: LinkTreeNode<CascaderOption<T>>) => {
      if (linkNode.disabled) return

      if (!linkNode.isLeft && expandTrigger === 'click') {
        setExpandNode(linkNode.data, true)
      }
    },
    [setExpandNode]
  )

  const handleMouseEnter = useCallback(
    (linkNode: LinkTreeNode<CascaderOption<T>>) => {
      if (expandTrigger !== 'hover' || linkNode.disabled) return

      setExpandNode(linkNode.data, true)
    },
    [setExpandNode]
  )

  const handleClickLevelItem = useCallback(
    (linkNode: LinkTreeNode<CascaderOption<T>>, checked: boolean) => {
      if (linkNode.disabled) return

      setChecked(linkNode.data, checked)
    },
    [setChecked, mode]
  )

  return (
    <div className="cascader-panel">
      {renderForestList.map((openForest, index) => (
        <div
          className="cascader-panel-level"
          key={index}>
          {openForest.map((linkNode) => (
            <div
              key={linkNode.value}
              className={classNames('panel-level-item', linkNode.isExpand && 'is-expand', linkNode.disabled && 'is-disabled')}
              onClick={() => handleChangeExpand(linkNode)}
              onMouseEnter={() => handleMouseEnter(linkNode)}>
              <div className="item-content">
                <div
                  className="item-checkbox"
                  onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    disabled={linkNode.disabled}
                    checked={linkNode.checked}
                    halfChecked={linkNode.halfChecked}
                    onChange={(checked) => handleClickLevelItem(linkNode, checked)}
                  />
                </div>
                <span>{linkNode.data.label || (linkNode.data.value as string)}</span>
              </div>
              {linkNode.isLoading ? (
                <Icon
                  className="cascader-loading-icon"
                  type="loading"
                />
              ) : (
                !linkNode.isLeft && (expandIcon || <Icon type="arrowRight" />)
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
