import React, { useState, useEffect } from 'react'
import { Menu, MenuItem, Icon } from '../../../rabbit/src'

export default function ExampleMenu() {
  const items: MenuItem[] = [
    {
      key: 'option1',
      label: 'option1',
      icon: <Icon type='home' />
    },
    {
      key: 'option2',
      label: 'option2',
      disabled: true
    },
    {
      key: 'option3',
      label: 'option3',
      mode: 'vertical',
      children: [
        {
          key: 'option3-1',
          label: 'option3-1'
        },
        {
          key: 'option3-2',
          label: 'option3-2',
          mode: 'horizontal',
          theme: 'dark',
          children: [
            {
              key: 'option3-2-1',
              label: 'option3-2-1',
              mode: 'inline',
              theme: 'light',
              children: [
                {
                  key: 'option3-2-1-1',
                  label: 'option3-2-1-1'
                },
                {
                  key: 'option3-2-1-2',
                  label: 'option3-2-1-2',
                  children: [
                    {
                      key: 'option3-2-1-2-1',
                      label: 'option3-2-1-2-1',
                    },
                    {
                      key: 'option3-2-1-2-2',
                      label: 'option3-2-1-2-2',
                      selfData: 10
                    }
                  ]
                },
                {
                  key: 'option3-2-1-3',
                  label: 'option3-2-1-3'
                },
              ]
            },
            {
              key: 'option3-2-2',
              label: 'option3-2-2'
            },
            {
              key: 'option3-2-3',
              label: 'option3-2-3',
              disabled: true
            },
            {
              key: 'option3-2-4',
              label: 'option3-2-4'
            },
          ]
        },
        {
          key: 'option3-3',
          label: 'option3-3'
        }
      ]
    }
  ]

  const [selectedPath, setSelectedPath] = useState<string[]>([])
  const [openPath, setOpenPath] = useState<string[]>([])

  useEffect(() => {
    setTimeout(() => {
      setOpenPath(['option3'])
      setSelectedPath(['option3', 'option3-1'])
    }, 2000)
  }, [])
  return (
    <div>
      <Menu
        items={items}
        triggerSubMenuAction='hover'
        defaultSelectedPath={['option3', 'option3-2']}
        onSelect={(item, keyPath, e) => console.log(item, keyPath, e)}
        onClick={(item, keyPath, e) => console.log(item, keyPath, e)}
        onOpenChange={(keyPath) => console.log(keyPath)}
      />
      <br />
      <Menu items={items} triggerSubMenuAction='click' />
      <br />
      <Menu items={items} mode='inline' openPath={openPath} selectedPath={selectedPath} style={{ width: '9rem' }} />
      <br />
      <Menu items={items} mode='vertical' triggerSubMenuAction='hover' />
      <br />
      <Menu items={items} mode='vertical' theme='dark' triggerSubMenuAction='hover' />
    </div>
  )
}