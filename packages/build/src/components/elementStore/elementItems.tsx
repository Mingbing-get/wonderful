import React from 'react'
import { Icon } from '../../../../rabbit/src'

import { ElementType, Marrow } from '../../../../types/global'
import { generateId } from '../../../../utils/src'

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

function getBaseProps(elementType: ElementType, appearTime: number) {
  return {
    id: `${elementType}-${generateId()}`,
    startStyle: {
      zIndex: elementType === 'img' ? -1 : 0,
      width: elementType === 'img' ? '20rem' : '' 
    },
    animation: [],
    timeLineParams: {},
    appearTime
  }
}

export function createElement(elementType: ElementType, appearTime: number): Marrow {
  switch (elementType) {
    case 'container':
      return {
        elementName: '容器',
        type: elementType,
        ...getBaseProps(elementType, appearTime)
      }
    case 'img':
      return {
        elementName: '图片',
        src: '',
        type: elementType,
        ...getBaseProps(elementType, appearTime)
      }
    case 'text':
      return {
        elementName: '文本',
        text: '',
        type: elementType,
        ...getBaseProps(elementType, appearTime)
      }
  }
}

export function getElementName(type: string): string {
  return elements.find(element => element.type === type)?.elementName || ''
}

export default elements
