import React from 'react'
import { createRoot } from 'react-dom/client'
import { VirtualElement } from './popoverInstance'

export interface GetBoundingClientRect {
  (dom: HTMLElement): DOMRect
}

export interface Client {
  innerHeight: number
  innerWidth: number
}
export interface GetClient {
  (): Client
}

export interface GetElementsByClassName {
  (dom: Element, className: string): HTMLCollectionOf<Element>
}

export interface GetBody {
  (): HTMLElement
}

export interface AppendChild {
  (parentNode: Node, childNode: Node): void
}

export interface RemoveChild {
  (parentNode: Node, childNode: Node): void
}

export interface RenderRoot {
  (child: React.ReactNode, container: HTMLElement): void
}

export type Platform = 'web' | 'weapp'

interface CompatibleRegister {
  getBoundingClientRect: GetBoundingClientRect
  getClient: GetClient
  getElementsByClassName: GetElementsByClassName
  getBody: GetBody
  appendChild: AppendChild
  removeChild: RemoveChild
  renderRoot: RenderRoot
}

class Compatible implements CompatibleRegister {
  private platform: Platform = 'web'

  getBoundingClientRect(dom: HTMLElement | VirtualElement) {
    return dom.getBoundingClientRect() as DOMRect
  }

  getElementsByClassName(dom: Element, className: string) {
    return dom.getElementsByClassName(className)
  }

  getClient() {
    return { innerHeight: window.innerHeight, innerWidth: window.innerWidth }
  }

  getBody() {
    return document.body
  }

  appendChild(parentNode: Node, childNode: Node) {
    parentNode.appendChild(childNode)
  }

  removeChild(parentNode: Node, childNode: Node) {
    parentNode.removeChild(childNode)
  }

  renderRoot(child: React.ReactNode, container: HTMLElement) {
    createRoot(container).render(child)
  }

  register<K extends keyof CompatibleRegister, V extends CompatibleRegister[K]>(key: K, fn: V) {
    this[key] = fn as any
  }

  setPlatform(platform: Platform) {
    this.platform = platform
  }

  getPlatform() {
    return this.platform
  }
}

const compatible = new Compatible()

export default compatible
