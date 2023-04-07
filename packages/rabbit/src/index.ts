import './index.scss'
export { default as Icon, IconType, pathKeys as iconPathKeys } from './icon'
export { default as Loading } from './loading'
export { default as Button } from './button'
export { default as Modal } from './modal'
export { default as Popover, Placement } from './popover'
export { default as Input } from './input'
export { default as Upload } from './upload'
export { default as Select, OptionType as SelectOptionType, ValueType as SelectValueType } from './select'
export { default as Tab } from './tab'
export { default as InputNumber } from './inputNumber'
export { default as InputGroup } from './inputGroup'
export { default as Switch } from './switch'
export { default as Slider } from './slider'
export { default as Collapse } from './collapse'
export { default as message, MessageType } from './message'
export { default as Checkbox, Group as CheckboxGroup, OptionType as CheckboxOptionType } from './checkbox'
export { default as Radio, Group as RadioGroup, OptionType as RadioOptionType } from './radio'
export { default as Menu, MenuItem, MenuTheme, MenuTrigger, MenuMode, MenuClick, MenuOpenChange, MenuSelect } from './menu'
export { default as Pagination, PaginationItemType } from './pagination'
export { default as Tag } from './tag'
export { default as Badge } from './badge'
export { default as Rate, RateCharacterFn } from './rate'
export { default as Carousel, CarouselDotPosition, CarouselRef, CarouselEffect } from './carousel'
export { SingleCascader as Cascader, MultipleCascader, CascaderOption } from './cascader'
export { SingleTree as Tree, MultipleTree, TreeNode } from './tree'
export { SingleTreeSelect as TreeSelect, MultipleTreeSelect } from './treeSelect'
export { default as Progress, ProgressType, ProgressStatus, ProgressStartPosition } from './progress'
export { default as Timeline, TimelineItemType, TimelineMode } from './timeLine'
export { default as List, ListItemType, LoadMore as ListLoadMore } from './list'
export { default as Tour, StepType as TourStepType, TourTipType } from './tour'
export { default as Calendar } from './calendar'
export { dayjs, Dayjs } from './calendar/utils'
export { default as TimePicker } from './timePicker'
export { default as DatePicker } from './datePicker'
export { default as Transfer, TransferOptionType } from './transfer'
export { default as Steps, StepsItemType } from './steps'
export { default as Table, TableColumn, TableRowSelection  } from './table'
export {
  TableRow,
  TableHeadRow,
  TableCell,
  TableHeadCell,
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