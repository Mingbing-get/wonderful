import { resizeListenerRegister } from '../resizeListener'
import { rem2px, Rem2pxProps } from '../utils'

export default function responseRegister(props?: Rem2pxProps) {
  resizeListenerRegister('rem2px', (clientWidth) => rem2px(clientWidth, props), true)
}
