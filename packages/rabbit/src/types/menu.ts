export type MenuMode = 'horizontal' | 'inline' | 'vertical'
export type MenuTheme = 'light' | 'dark'
export type MenuTrigger = 'click' | 'hover'

export type MenuItemType = {
  disabled?: boolean
  icon?: React.ReactNode
  key: string
  label: React.ReactNode
  [key: string]: any
}

export type MenuSubMenuType = {
  children: MenuItem[]
  disabled?: boolean
  icon?: React.ReactNode
  key: string
  label: React.ReactNode
  theme?: MenuTheme
  mode?: MenuMode
  [key: string]: any
}

export type MenuClick = (item: MenuItem, clickPath: string[], e: React.MouseEvent<HTMLDivElement>) => void
export type MenuOpenChange = (openPath: string[]) => void
export type MenuSelect = (item: MenuItem, selectPath: string[], e: React.MouseEvent<HTMLDivElement>) => void

export type MenuItem = MenuItemType | MenuSubMenuType

export type MenuProps = {
  items: MenuItem[]
  mode?: MenuMode
  defaultOpenPath?: string[]
  defaultSelectedPath?: string[]
  openPath?: string[]
  selectedPath?: string[]
  style?: React.CSSProperties
  className?: string
  theme?: MenuTheme
  triggerSubMenuAction?: MenuTrigger
  onClick?: MenuClick
  onOpenChange?: MenuOpenChange
  onSelect?: MenuSelect
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onClick' | 'onSelect'>
