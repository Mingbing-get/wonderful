import React from 'react'
import SingleCascader, { DisplayRender as SingleDisplayRender } from './single'
import MultipleCascader, { DisplayRender as MultipleDisplayRender } from './multiple'

import { Placement } from '../popover'
import { BaseTreeNode, TreeMode, TreeValue } from '../hooks/useTree/index.d'

import './index.scss'

export {
  TreeMode,
  TreeValue,
  SingleDisplayRender,
  MultipleDisplayRender,
}
export type CascaderOption<T extends object = {}> = BaseTreeNode<T & {
  label?: string
}>
export type CascaderTriggerType = 'click' | 'hover'

export type DropdownRender = (menus: React.ReactNode, type: 'search' | 'option') => React.ReactNode
export type LoadData = (option: CascaderOption) => void
export type NotFoundContent = () => React.ReactNode

export type CascaderBaseProps = {
  className?: string,
  popupClassName?: string,
  style?: React.CSSProperties,
  popupStyle?: React.CSSProperties,
  options: CascaderOption[],
  showSearch?: boolean,
  allowClear?: boolean,
  disabled?: boolean,
  placeholder?: string,
  expandTrigger?: CascaderTriggerType,
  placement?: Placement,
  clearIcon?: React.ReactNode,
  expandIcon?: React.ReactNode,
  suffixIcon?: React.ReactNode,
  mode?: TreeMode,
  dropdownRender?: DropdownRender,
  loadData?: LoadData,
  notFoundContent?: NotFoundContent,
  onDropdownVisibleChange?: (visible: boolean) => void,
  onSearch?: (search: string) => void,
}

export {
  SingleCascader,
  MultipleCascader
}
