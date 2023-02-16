import SingleTreeSelect from './single'
import MultipleTreeSelect from './multiple'

import { Placement } from '../popover'

import './index.scss'

export type TreeSelectBaseProps = {
  popupClassName?: string,
  popupStyle?: React.CSSProperties,
  placeholder?: string,
  disabled?: boolean,
  allowClear?: boolean,
  suffixIcon?: React.ReactNode,
  placement?: Placement,
  clearIcon?: React.ReactNode,
  expandTrigger?: 'hover' | 'click',
  onPopoverVisibleChange?: (visible: boolean) => void,
}

export {
  SingleTreeSelect,
  MultipleTreeSelect
}
