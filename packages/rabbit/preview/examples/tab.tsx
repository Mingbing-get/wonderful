import React from 'react'
import { Tab } from '@marrow/rabbit'

const TabItem = Tab.Item

export default function ExampleTab() {
  return (
    <div>
      <Tab>
        <TabItem
          title='tab1'
          key='1'
        >
          <div>inner1</div>
        </TabItem>
        <TabItem
          title='tab2'
          key='2'
        >
          <div>inner2</div>
        </TabItem>
        <TabItem
          title='tab3'
          key='3'
        >
          <div>inner3</div>
        </TabItem>
      </Tab>
    </div>
  )
}