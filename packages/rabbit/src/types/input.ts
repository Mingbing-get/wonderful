import { InputProps as rcInputProps, InputRef } from 'rc-input'

export type InputProps = Omit<rcInputProps, 'prefixCls'>
export {
  InputRef
}