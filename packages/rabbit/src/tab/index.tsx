import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import TabItem, { Props as ItemType } from './item'

import './index.scss'

type Props = {
  defaultActiveKey?: React.Key;
  onChange?: (key: React.Key) => void;
  children: React.ReactElement[] | React.ReactElement;
}

export default function Tab({
  defaultActiveKey,
  onChange,
  children
}: Props) {
  const [childTypeError, setChildTypeError] = useState(false)
  const [activeKey, setActiveKey] = useState(defaultActiveKey)
  const [items, setItems] = useState<ItemType[]>([])

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
      } as ItemType
    })

    setItems(items)
  }, [children])

  if (childTypeError) {
    return <p>Tab's child must be Tab.Item</p>
  }

  function handleChange(key: React.Key) {
    setActiveKey(key)
  }

  function getActiveNode() {
    return items.find(item => item.key === activeKey)?.children
  }

  return (
    <div className='rabbit-tab'>
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
