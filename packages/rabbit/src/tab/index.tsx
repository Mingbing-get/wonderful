import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import TabItem from './item'
import { TabProps, TabItemProps } from '../types/tab'
import './index.scss'

export default function Tab({
  defaultActiveKey,
  onChange,
  children,
  className,
  style
}: TabProps) {
  const [childTypeError, setChildTypeError] = useState(false)
  const [activeKey, setActiveKey] = useState(defaultActiveKey)
  const [items, setItems] = useState<TabItemProps[]>([])

  useEffect(() => {
    const items =  React.Children.map(children, (child, i) => {
      if (child.type !== TabItem) {
        setChildTypeError(true)
      }

      if (i === 0 && !activeKey && child.key) {
        setActiveKey(child.key)
      }

      return {
        title: child.props.title,
        key: child.key,
        children: child.props.children
      } as TabItemProps
    })

    setItems(items)
  }, [children])

  if (childTypeError) {
    return <p>Tab's child must be Tab.Item</p>
  }

  function handleChange(key: React.Key) {
    setActiveKey(key)
    onChange?.(key)
  }

  function getActiveNode() {
    return items.find(item => item.key === activeKey)?.children
  }

  return (
    <div className={classNames('rabbit-tab-wrapper', className)} style={style}>
      <div className='rabbit-tab-title-wrapper'>
        {
          items.map(item => (
            <span
              className={classNames('rabbit-tab-title', { 'is-active': item.key === activeKey })}
              key={item.key}
              onClick={() => handleChange(item.key)}
            >
              {item.title}
            </span>
          ))
        }
      </div>
      <div className='rabbit-tab-item'>
        {getActiveNode()}
      </div>
    </div>
  )
}

Tab.Item = TabItem
