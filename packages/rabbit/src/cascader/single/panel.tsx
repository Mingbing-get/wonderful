import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import { LinkTreeNode, TreeMode } from '../../hooks/useTree/type'
import { getExpandLinkPathFromLinkForest } from '../../hooks/useTree/utils'
import { CascaderOption, CascaderTriggerType } from '../index'

import Icon from '../../icon'

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

  const handleClickLevelItem = useCallback((linkNode: LinkTreeNode<CascaderOption>) => {
    if (linkNode.disabled) return

    if (!linkNode.isLeft && expandTrigger === 'click') {
      setExpandNode(linkNode.data, true)
    }

    if (mode === 'ordinary') {
      if (!linkNode.checked) {
        setChecked(linkNode.data, true, !!linkNode.isLeft)
      }
    } else {
      setChecked(linkNode.data, true, !!linkNode.isLeft)
    }
  }, [setExpandNode, setChecked, mode])

  const handleMouseEnter = useCallback((linkNode: LinkTreeNode<CascaderOption>) => {
    if (expandTrigger !== 'hover' || linkNode.disabled) return

    setExpandNode(linkNode.data, true)
  }, [setExpandNode])

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
                    linkNode.checked && 'is-checked', 
                    linkNode.disabled && 'is-disabled'
                  )}
                  onMouseEnter={() => handleMouseEnter(linkNode)}
                  onClick={() => handleClickLevelItem(linkNode)}
                >
                  <span>{linkNode.data.label || linkNode.data.value}</span>
                  {
                    !linkNode.isLeft && (expandIcon || <Icon type ='arrowRight' />)
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
