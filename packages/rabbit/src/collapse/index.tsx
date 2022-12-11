import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

import Panel, { PanelProps } from './panel'

import './index.scss'

type Props = {
  className?: string,
  style?: React.CSSProperties,
  isOpenOnly?: boolean,
  children: React.ReactElement[] | React.ReactElement,
}

function Collapse({
  className,
  style,
  isOpenOnly,
  children
}: Props) {
  const [childTypeError, setChildTypeError] = useState(false)
  const [panels, setPanels] = useState<PanelProps[]>([])
  const [openKeys, setOpenKeys] = useState<React.Key[]>([])

  useEffect(() => {
    const opens: React.Key[] = [...openKeys]
    const panels =  React.Children.map(children, (child, i) => {
      if (child.type !== Panel) {
        setChildTypeError(true)
      }

      if (child.props.isOpen && child.props.panelKey) {
        !opens.includes(child.props.panelKey) && opens.push(child.props.panelKey)
      }

      return child.props as PanelProps
    })

    setOpenKeys(opens)
    setPanels(panels)
  }, [children])

  if (childTypeError) {
    return <p>Collapse's child must be Collapse.Panel</p>
  }

  function handleToggleOpen(key: React.Key, fn?: (key: React.Key) => void) {
    const index = openKeys.findIndex(item => item === key)

    if (index === -1) {
      if (isOpenOnly) {
        setOpenKeys([key])
      } else {
        setOpenKeys([key, ...openKeys])
      }
    } else {
      openKeys.splice(index, 1)
      setOpenKeys([...openKeys])
    }

    fn?.(key)
  }

  return (
    <div className={classNames('rabbit-collapse-wrapper', className)} style={style}>
      {
        panels.map(({ isOpen, onToggleOpen, ...extra }) => (
          <Panel
            {...extra}
            key={extra.panelKey}
            isOpen={openKeys.includes(extra.panelKey)}
            onToggleOpen={key => handleToggleOpen(key, onToggleOpen)}
          />
        ))
      }
    </div>
  )
}

Collapse.Panel = Panel

export default Collapse
