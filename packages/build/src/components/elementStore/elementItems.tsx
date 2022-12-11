import React from 'react'
import { Icon } from '@marrow/rabbit'

import { ElementType, Marrow } from '@marrow/global'
import { generateId } from '@marrow/utils'
import { marrowController } from '@marrow/render'

const elements = [
  {
    type: 'container',
    elementName: '容器',
    icon: <Icon type='container' style={{ fontSize: '2rem' }} />
  },
  {
    type: 'img',
    elementName: '图片',
    icon: <Icon type='image' style={{ fontSize: '2rem' }} />
  },
  {
    type: 'text',
    elementName: '文本',
    icon: <Icon type='text' style={{ fontSize: '2rem' }} />
  }
]

function getBaseProps(elementType: ElementType) {
  return {
    id: `${elementType}-${generateId()}`,
    startStyle: {
      zIndex: elementType === 'img' ? -1 : 0,
      width: elementType === 'img' ? '20rem' : '' 
    },
    animation: [],
    timeLineParams: {},
    appearTime: marrowController.getCurrentTime()
  }
}

export function createElement(elementType: ElementType): Marrow {
  switch (elementType) {
    case 'container':
      return {
        elementName: '容器',
        type: elementType,
        ...getBaseProps(elementType)
      }
    case 'img':
      return {
        elementName: '图片',
        src: '',
        type: elementType,
        ...getBaseProps(elementType)
      }
    case 'text':
      return {
        elementName: '文本',
        text: '',
        type: elementType,
        ...getBaseProps(elementType)
      }
  }
}

export function getElementName(type: string): string {
  return elements.find(element => element.type === type)?.elementName || ''
}

export default elements
