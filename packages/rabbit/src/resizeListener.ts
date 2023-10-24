import compatible from './compatible'

type ResizeListener = (clientWidth: number) => void
type listenerType = 'rem2px' | 'breakpoint'

const listenerList: Record<listenerType, ResizeListener[]> = {} as any

window.addEventListener('resize', async (e) => {
  const clientWidth = (await compatible.getBoundingClientRect(document.documentElement)).width || compatible.getClient().innerWidth
  for (const key in listenerList) {
    listenerList[key as listenerType].forEach((fn) => fn(clientWidth))
  }
})

export async function resizeListenerRegister(type: listenerType, fn: ResizeListener, execute?: boolean) {
  const clientWidth = (await compatible.getBoundingClientRect(document.documentElement)).width || compatible.getClient().innerWidth
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
