import React, { useMemo } from 'react'
import { Collapse } from '@marrow/rabbit'

import './index.scss'

const Panel = Collapse.Panel

export type FormGridItem = {
  key: string,
  label: string,
  content: JSX.Element
}
export type FormGroup = {
  key: string,
  label: string,
  includeKeys: string[]
}
type HasItemGroup = {
  items: FormGridItem[]
} & FormGroup
type Props = {
  items: FormGridItem[],
  formGroup?: FormGroup[]
}

export default function FormGrid({
  items,
  formGroup
}: Props) {
  const {
    groups,
    otherItems
  } = useMemo(() => {
    if (!formGroup) return {
      groups: undefined,
      otherItems: items
    }

    const otherItems: FormGridItem[] = []
    const groups: HasItemGroup[] = formGroup.map(group => ({
      ...group,
      items: []
    }))

    items.forEach(item => {
      const group = groups.find(group => group.includeKeys.includes(item.key))
      if (group) {
        group.items.push(item)
      } else {
        otherItems.push(item)
      }
    })

    return {
      groups: groups.filter(group => group.items.length > 0),
      otherItems
    }
  }, [items, formGroup])

  return (
    <div>
      {
        !!groups && (
          <Collapse>
            {
              groups.map(group => (
                <Panel header={group.label} panelKey={group.key} key={group.key}>
                  <BaseGrid items={group.items} />
                </Panel>
              ))
            }
          </Collapse>
        )
      }
      { 
        otherItems.length > 0 && (
          <BaseGrid items={otherItems} />
        )
      }
    </div>
  )
}

function BaseGrid({
  items
}: Props) {
  return (
    <div className='form-grid-wrapper'>
      {
        items.map(({ key, label, content }) => (
          <div className='form-grid-row' key={key}>
            <span className='form-label'>{label}</span>
            <div className='form-content'>{content}</div>
          </div>
        ))
      }
    </div>
  )
}
