import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import { LinkTreeNode, TreeMode } from '../../hooks/useTree/index.d'
import { getExpandLinkPathFromLinkForest } from '../../hooks/useTree/utils'
import { CascaderOption, CascaderTriggerType } from '../index'

import Icon from '../../icon'
import Checkbox from '../../checkbox'

type Props = {
  linkForest: LinkTreeNode<CascaderOption>[],
  mode: TreeMode,
  expandIcon?: React.ReactNode,
  expandTrigger: CascaderTriggerType,
  setChecked: (data: CascaderOption, checked: boolean, closePopover?: boolean) => void,
  setExpandNode: (data?: CascaderOption | undefined, expand?: boolean | undefined) => void
}

export default function Panel({
  linkForest,
  mode,
  expandIcon,
  expandTrigger,
  setChecked,
  setExpandNode
}: Props) {
  const renderForestList = useMemo(() => {
    const renderForestList = [linkForest]

    getExpandLinkPathFromLinkForest(linkForest)[0]?.forEach(item => {
      if (item.children) {
        renderForestList.push(item.children)
      }
    })

    return renderForestList
  }, [linkForest])

  const handleChangeExpand = useCallback((linkNode: LinkTreeNode<CascaderOption>) => {
    if (linkNode.disabled) return

    if (!linkNode.isLeft && expandTrigger === 'click') {
      setExpandNode(linkNode.data, true)
    }
  }, [setExpandNode])

  const handleMouseEnter = useCallback((linkNode: LinkTreeNode<CascaderOption>) => {
    if (expandTrigger !== 'hover' || linkNode.disabled) return

    setExpandNode(linkNode.data, true)
  }, [setExpandNode])

  const handleClickLevelItem = useCallback((linkNode: LinkTreeNode<CascaderOption>, checked: boolean) => {
    if (linkNode.disabled) return

    setChecked(linkNode.data, checked)
  }, [setChecked, mode])

  return (
    <div className='cascader-panel'>
      {
        renderForestList.map((openForest, index) => (
          <div className='cascader-panel-level' key={index}>
            {
              openForest.map(linkNode => (
                <div
                  key={linkNode.value}
                  className={classNames(
                    'panel-level-item',
                    linkNode.isExpand && 'is-expand',
                    linkNode.disabled && 'is-disabled'
                  )}
                  onClick={() => handleChangeExpand(linkNode)}
                  onMouseEnter={() => handleMouseEnter(linkNode)}
                >
                  <div className='item-content'>
                    <div className='item-checkbox' onClick={e => e.stopPropagation()}>
                      <Checkbox
                        disabled={linkNode.disabled}
                        checked={linkNode.checked}
                        halfChecked={linkNode.halfChecked}
                        onChange={(checked) => handleClickLevelItem(linkNode, checked)}
                      >''</Checkbox>
                    </div>
                    <span>{linkNode.data.label || linkNode.data.value as string}</span>
                  </div>
                  {
                    linkNode.isLoading ?
                      <Icon className='cascader-loading-icon' type='loading' /> :
                      (!linkNode.isLeft && (expandIcon || <Icon type='arrowRight' />))
                  }
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
