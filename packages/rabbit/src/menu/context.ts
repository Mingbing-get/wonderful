import React, { useContext } from 'react'

import { MenuItem, MenuMode } from '../types/menu'

export type MenuContext = {
  items: MenuItem[]
  openPath: string[]
  selectPath: string[]
  onClickItem?: (item: MenuItem, mode: MenuMode, e: React.MouseEvent<HTMLDivElement>) => void
  onToggleOpen?: (item: MenuItem) => void
  onMouseEnter?: (item: MenuItem, mode: MenuMode) => void
  onMouseLeave?: (item: MenuItem, mode: MenuMode) => void
  onPopoverChangeVisible?: (visible: boolean) => void
}

const menuContext: MenuContext = {
  items: [],
  openPath: [],
  selectPath: [],
}

const ConfigContext = React.createContext(menuContext)

export const useMenu = () => useContext(ConfigContext)

export const MenuProvider = ConfigContext.Provider
