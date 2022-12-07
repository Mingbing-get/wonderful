
export function getLocation(dom: HTMLElement) {
  let top = dom.offsetTop + dom.clientTop - dom.scrollTop
  let left = dom.offsetLeft + dom.clientLeft - dom.scrollLeft
  let current = dom.parentElement
  while (current) {
    top -= current.scrollTop
    left -= current.scrollLeft
    current = current.parentElement
  }
  
  return {
    top,
    left
  }
}

export type Rem2pxProps = {
  baseWidth?: number,
  baseMobilePx?: number,
  breakPoint?: number,
  pcPx?: number,
}
export function rem2px(clientWidth: number, {
  baseWidth = 320,
  baseMobilePx = 16,
  breakPoint = 720,
  pcPx = 16
}: Rem2pxProps = {}) {
  //用于适配rem，以640为基准，1rem=16px
  if (clientWidth >= breakPoint) {
    document.documentElement.style.fontSize = pcPx + 'px'
  } else {
    document.documentElement.style.fontSize = clientWidth * baseMobilePx / baseWidth + 'px';
  }
}
