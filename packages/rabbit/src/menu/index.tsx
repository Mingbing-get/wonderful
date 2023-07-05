import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react'

import MenuMain from './main'
import { MenuProvider, MenuContext } from './context'
import { findItemByKeyFromForest, isSame } from '../utils'
import { MenuProps, MenuItem, MenuMode } from '../types/menu'

import './index.scss'

const delay = 200

export default function Menu({
  items,
  defaultOpenPath,
  defaultSelectedPath,
  openPath,
  selectedPath,
  style,
  className,
  mode = 'horizontal',
  theme = 'light',
  triggerSubMenuAction = 'click',
  onClick,
  onOpenChange,
  onSelect,
  ...extra
}: MenuProps) {
  const [_openPath, setOpenPath] = useState(defaultOpenPath || [])
  const [selectPath, setSelectPath] = useState(defaultSelectedPath || [])
  const keepShow = useRef<string[]>([])

  const handleClickItem = useCallback(
    (item: MenuItem, mode: MenuMode, e: React.MouseEvent<HTMLDivElement>) => {
      if (item.disabled) return

      const curItem = findItemByKeyFromForest(items, item.key)
      if (!curItem) return

      if (triggerSubMenuAction === 'click' && mode !== 'inline') {
        setTimeout(() => setOpenPath?.(curItem.path), 0)
        onOpenChange?.(curItem.path)
      }
      setSelectPath(curItem.path)
      onSelect?.(item, curItem.path, e)
      onClick?.(item, curItem.path, e)
    },
    [items, triggerSubMenuAction, onOpenChange, onSelect, onClick]
  )

  const handleMouseEnter = useCallback(
    (item: MenuItem, mode: MenuMode) => {
      if (triggerSubMenuAction !== 'hover' || mode === 'inline') return
      keepShow.current.push(item.key)
      setTimeout(() => {
        const index = keepShow.current.findIndex((_item) => _item === item.key)
        if (index === -1) return

        keepShow.current.splice(index, 1)
      }, delay)

      if (item.disabled) return

      const curItem = findItemByKeyFromForest(items, item.key)
      if (!curItem) return

      setOpenPath(curItem.path)
      onOpenChange?.(curItem.path)
    },
    [items, triggerSubMenuAction, onOpenChange]
  )

  const handleMouseLeave = useCallback(
    (item: MenuItem, mode: MenuMode) => {
      if (triggerSubMenuAction !== 'hover' || mode === 'inline') return

      setTimeout(() => {
        if (keepShow.current.length === 0) {
          setOpenPath([])
          onOpenChange?.([])
          return
        }
        if (keepShow.current.includes(item.key)) return

        setOpenPath((openPath) => {
          const index = openPath.findIndex((key) => key === item.key)
          if (index === -1) return openPath

          const _openPath = openPath.slice(0, index)
          onOpenChange?.(_openPath)
          return _openPath
        })
      }, delay)
    },
    [triggerSubMenuAction, onOpenChange]
  )

  const handlePopoverChangeVisible = useCallback(
    (visible: boolean) => {
      if (!visible) {
        setOpenPath([])
        onOpenChange?.([])
      }
    },
    [onOpenChange]
  )

  const handleToggleOpen = useCallback(
    (item: MenuItem) => {
      setOpenPath((openPath) => {
        const index = openPath.findIndex((key) => key === item.key)
        let newOpenPath: string[]
        if (index === -1) {
          newOpenPath = [...openPath, item.key]
        } else {
          newOpenPath = openPath.slice(0, index)
        }
        onOpenChange?.(newOpenPath)
        return newOpenPath
      })
    },
    [onOpenChange]
  )

  useEffect(() => {
    setOpenPath((oldOpenPath) => {
      if (openPath && isSame(oldOpenPath, openPath)) {
        return oldOpenPath
      }

      return openPath || []
    })
  }, [openPath])

  useEffect(() => {
    setSelectPath((oldSelectPath) => {
      if (selectedPath && isSame(oldSelectPath, selectedPath)) {
        return oldSelectPath
      }

      return selectedPath || []
    })
  }, [selectedPath])

  const value: MenuContext = useMemo(
    () => ({
      items,
      openPath: _openPath,
      selectPath,
      onToggleOpen: handleToggleOpen,
      onClickItem: handleClickItem,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onPopoverChangeVisible: handlePopoverChangeVisible,
    }),
    [items, _openPath, selectPath, handleClickItem, handleMouseEnter, handleMouseLeave, handlePopoverChangeVisible, handleToggleOpen]
  )

  return (
    <MenuProvider value={value}>
      <MenuMain
        {...extra}
        className={className}
        style={style}
        items={items}
        mode={mode}
        theme={theme}
        level={0}
      />
    </MenuProvider>
  )
}
