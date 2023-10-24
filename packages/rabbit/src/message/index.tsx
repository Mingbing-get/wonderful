import React, { useMemo } from 'react'
import classNames from 'classnames'

import compatible from '../compatible'
import Icon, { IconType } from '../icon'
import { MessageProps } from '../types/message'

import './index.scss'

function Message({ type = 'info', content, icon }: Omit<MessageProps, 'delay' | 'displayTime'>) {
  const _icon = useMemo(() => {
    if (icon) return icon
    return {
      success: 'success',
      info: 'info',
      warn: 'warn',
      error: 'error',
    }[type] as IconType
  }, [type, icon])

  return (
    <div className={classNames('rabbit-message-wrapper', 'rabbit-component', `type-${type}`)}>
      <Icon
        type={_icon}
        style={{ fontSize: '1.2rem' }}
      />
      <p>{content}</p>
    </div>
  )
}

class MessageFactory {
  private effectDivList: HTMLDivElement[]

  constructor() {
    this.effectDivList = []
  }

  info({ delay = 0, ...props }: Omit<MessageProps, 'type'>) {
    delay === 0
      ? this.createInstance({ ...props, type: 'info' })
      : setTimeout(() => {
          this.createInstance({ ...props, type: 'info' })
        }, delay)
  }
  success({ delay = 0, ...props }: Omit<MessageProps, 'type'>) {
    delay === 0
      ? this.createInstance({ ...props, type: 'success' })
      : setTimeout(() => {
          this.createInstance({ ...props, type: 'success' })
        }, delay)
  }
  warn({ delay = 0, ...props }: Omit<MessageProps, 'type'>) {
    delay === 0
      ? this.createInstance({ ...props, type: 'warn' })
      : setTimeout(() => {
          this.createInstance({ ...props, type: 'warn' })
        }, delay)
  }
  error({ delay = 0, ...props }: Omit<MessageProps, 'type'>) {
    delay === 0
      ? this.createInstance({ ...props, type: 'error' })
      : setTimeout(() => {
          this.createInstance({ ...props, type: 'error' })
        }, delay)
  }

  private async createInstance({ displayTime = 3000, ...extra }: Omit<MessageProps, 'id' | 'delay'>) {
    const id = this.generateId()
    const lastInstanceBottom = await this.getLastInstanceBottom()
    const div = document.createElement('div')
    div.id = id
    div.setAttribute(
      'style',
      this.createStyle(
        this.mergeWrapperStyle({
          top: `${lastInstanceBottom}px`,
          opacity: 0,
        })
      )
    )
    compatible.appendChild(compatible.getBody(), div)
    compatible.renderRoot(<Message {...extra} />, div)

    this.effectDivList.push(div)
    setTimeout(() => {
      div.setAttribute(
        'style',
        this.createStyle(
          this.mergeWrapperStyle({
            top: `${lastInstanceBottom}px`,
            opacity: 1,
            transform: 'translate(-50%, 1rem)',
          })
        )
      )
    })

    setTimeout(() => {
      div.setAttribute(
        'style',
        this.createStyle(
          this.mergeWrapperStyle({
            top: `${lastInstanceBottom}px`,
            opacity: 0,
          })
        )
      )
      this.hasInstanceDestroy()
      setTimeout(() => {
        div.remove()
      }, 200)
    }, displayTime)
  }

  private hasInstanceDestroy() {
    // 不做
  }

  private async getLastInstanceBottom(): Promise<number> {
    if (this.effectDivList.length === 0) return 0
    const lastInstance = this.effectDivList[this.effectDivList.length - 1]
    return (await compatible.getBoundingClientRect(lastInstance)).bottom
  }

  private mergeWrapperStyle(style?: Record<string, string | number>) {
    return {
      position: 'fixed',
      top: '0',
      left: '50%',
      transition: 'all 0.2s linear',
      width: 'fit-content',
      transform: 'translate(-50%, 0)',
      'z-index': 100,
      ...(style || {}),
    }
  }

  private createStyle(style: Record<string, string | number>): string {
    const styleArr: string[] = []

    for (const key in style) {
      styleArr.push(`${key}: ${style[key]}`)
    }

    return styleArr.join(';')
  }

  private generateId(): string {
    return 'message_' + new Date().getTime() + '_' + Math.floor(Math.random() * 10000)
  }
}

const message = new MessageFactory()
export default message
