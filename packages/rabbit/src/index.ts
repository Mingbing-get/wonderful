import './index.scss'
export { default as Icon } from './icon'
export { default as Loading } from './loading'
export { default as Button } from './button'
export { default as Modal } from './modal'
export { default as Popover } from './popover'
export { default as Input } from './input'
export { default as Upload } from './upload'
export { default as Select, OptionType as SelectOptionType, ValueType as SelectValueType } from './select'
export { default as Tab } from './tab'
export { default as InputNumber } from './inputNumber'
export { default as InputGroup } from './inputGroup'
export { default as Switch } from './switch'
export { default as Slider } from './slider'
export { default as Collapse } from './collapse'

import { resizeListenerRegister } from './resizeListener'
import { rem2px, Rem2pxProps } from './utils'

export function responseRegister(props?: Rem2pxProps) {
  resizeListenerRegister('rem2px', (clientWidth) => rem2px(clientWidth, props), true)
}