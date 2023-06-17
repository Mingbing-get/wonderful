import React from 'react'
import classNames from 'classnames'

import { MenuItem, MenuSubMenuType, MenuMode, MenuTheme } from '../types/menu'
import { useMenu } from './context'

import Icon from '../icon'
import Popover from '../popover'

type Props = {
  items: MenuItem[]
  style?: React.CSSProperties
  className?: string
  mode: MenuMode
  theme: MenuTheme
  level: number
  inlineLevel?: number
}

export default function MenuMain({ items, style, className, mode, theme, level, inlineLevel = 0 }: Props) {
  const { openPath, selectPath, onClickItem, onMouseEnter, onMouseLeave, onPopoverChangeVisible, onToggleOpen } = useMenu()

  function hasChildren(item: MenuItem): item is MenuSubMenuType {
    return !!(item as MenuSubMenuType).children?.length
  }

  return (
    <div
      className={classNames('rabbit-menu-wrapper', 'rabbit-component', `menu-theme-${theme}`, `menu-mode-${mode}`, level !== 0 && 'no-border-right', className)}
      style={style}>
      {items.map((item) => (
        <div
          className={classNames(
            'menu-item',
            item.disabled && 'is-disabled',
            openPath.includes(item.key) && 'is-open',
            selectPath.includes(item.key) && 'is-select'
          )}
          key={item.key}
          onClick={(e) => {
            onClickItem?.(item, mode, e)
            e.stopPropagation()
          }}
          onMouseEnter={() => onMouseEnter?.(item, mode)}
          onMouseLeave={(e) => {
            onMouseLeave?.(item, mode)
            e.stopPropagation()
          }}>
          <div
            className="menu-item-title"
            style={mode === 'inline' ? { paddingLeft: `${inlineLevel + 0.5}rem` } : undefined}>
            {item.icon && <div className="menu-item-icon">{item.icon}</div>}
            <div className="menu-item-label">{item.label}</div>
            {mode === 'inline' && !item.disabled && hasChildren(item) && (
              <Icon
                className="menu-arrow"
                type="arrowDown"
                onClick={(e) => {
                  onToggleOpen?.(item)
                  e.stopPropagation()
                }}
              />
            )}
            {mode === 'vertical' && !item.disabled && hasChildren(item) && (
              <Icon
                type="arrowRight"
                className="menu-arrow"
              />
            )}
          </div>
          {['vertical', 'horizontal'].includes(mode) && openPath.includes(item.key) && hasChildren(item) && (
            <Popover
              content={
                <MenuMain
                  items={item.children}
                  mode={item.mode || mode}
                  theme={item.theme || theme}
                  level={level + 1}
                />
              }
              visible={true}
              arrow="none"
              placement="bottom-start"
              className="rabbit-menu-popover"
              onVisibleChange={onPopoverChangeVisible}>
              <span className="menu-item-position"></span>
            </Popover>
          )}
          {mode === 'inline' && openPath.includes(item.key) && hasChildren(item) && (
            <MenuMain
              items={item.children}
              mode={mode === 'inline' ? mode : item.mode || mode}
              theme={item.theme || theme}
              level={level + 1}
              inlineLevel={inlineLevel + 1}
            />
          )}
        </div>
      ))}
    </div>
  )
}
