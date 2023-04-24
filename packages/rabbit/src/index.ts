import './index.scss'
export { default as Icon, pathKeys as iconPathKeys } from './icon'
export { default as Loading } from './loading'
export { default as Button } from './button'
export { default as Modal } from './modal'
export { default as Popover } from './popover'
export { default as Input } from './input'
export { default as Upload } from './upload'
export { default as Select } from './select'
export { default as Tab } from './tab'
export { default as InputNumber } from './inputNumber'
export { default as InputGroup } from './inputGroup'
export { default as Switch } from './switch'
export { default as Slider } from './slider'
export { default as Collapse } from './collapse'
export { default as message } from './message'
export { default as Checkbox, Group as CheckboxGroup } from './checkbox'
export { default as Radio, Group as RadioGroup } from './radio'
export { default as Menu} from './menu'
export { default as Pagination } from './pagination'
export { default as Tag } from './tag'
export { default as Badge } from './badge'
export { default as Rate } from './rate'
export { default as Carousel } from './carousel'
export { SingleCascader as Cascader, MultipleCascader } from './cascader'
export { SingleTree as Tree, MultipleTree } from './tree'
export { SingleTreeSelect as TreeSelect, MultipleTreeSelect } from './treeSelect'
export { default as Progress } from './progress'
export { default as Timeline } from './timeLine'
export { default as List } from './list'
export { default as Tour } from './tour'
export { default as Calendar } from './calendar'
export { dayjs, Dayjs } from './calendar/utils'
export { default as TimePicker } from './timePicker'
export { default as DatePicker } from './datePicker'
export { default as Transfer } from './transfer'
export { default as Steps } from './steps'
export { default as Table  } from './table'

export * from './types'
export {
  TableRow,
  TableHeadRow,
  TableCell,
  TableHeadCell,
  Column as TableColumn,
  HeadColumn as TableHeadColumn,
  AccessorColumn as TableAccessorColumn,
  ColumnFilter as TableColumnFilter,
  ColumnSort as TableColumnSort,
  FilterRenderProps as TableFilterRenderProps,
  FilterType as TableFilterType,
  SortRenderProps as TableSortRenderProps,
  SortDir as TableSortDir,
} from './hooks/useTable/type'
export { default as useTable, FilterMapType, SaveSort } from './hooks/useTable'

export { default as useVirtualScrollY, VirtualScrollY } from './hooks/useVirtualScrollY' 
export { default as useSyncScrollX } from './hooks/useSyncScrollX'
export { default as useDebounceAndThrottle } from './hooks/useDebounceAndThrottle'
export { default as useResize } from './hooks/useResize'
export { default as useTree } from './hooks/useTree'
export {
  TreeValue,
  TreeMode,
  InnerLocation as TreeInnerLocation,
  BaseTreeNode,
  LinkTreeNode,
  MultipleProps as TreeMultipleProps,
  SingleProps as TreeSingleProps,
  MultipleReturn as TreeMultipleReturn,
  SingleReturn as TreeSingleReturn
} from './hooks/useTree/type'

import { resizeListenerRegister } from './resizeListener'
import { rem2px, Rem2pxProps } from './utils'

export function responseRegister(props?: Rem2pxProps) {
  resizeListenerRegister('rem2px', (clientWidth) => rem2px(clientWidth, props), true)
}