import compatible from './compatible'

type ResizeListener = (clientWidth: number) => void
type listenerType = 'rem2px' | 'breakpoint'

const listenerList: Record<listenerType, ResizeListener[]> = {} as any
let clientWidth: number = 0

window.addEventListener('resize', (e) => {
  clientWidth = compatible.getBoundingClientRect(document.documentElement).width || compatible.getClient().innerWidth
  for (const key in listenerList) {
    listenerList[key as listenerType].forEach((fn) => fn(clientWidth))
  }
})
clientWidth = compatible.getBoundingClientRect(document.documentElement).width || compatible.getClient().innerWidth

export function resizeListenerRegister(type: listenerType, fn: ResizeListener, execute?: boolean) {
  if (listenerList[type]) {
    listenerList[type].push(fn)
  } else {
    listenerList[type] = [fn]
  }

  if (execute) fn(clientWidth)
}

export function removeResizeListener(type: listenerType, fn?: ResizeListener) {
  if (!fn) {
    delete listenerList[type]
  } else {
    const index = listenerList[type].findIndex((item) => item === fn)
    if (index === -1) return
    listenerList[type].splice(index, 1)
  }
}
