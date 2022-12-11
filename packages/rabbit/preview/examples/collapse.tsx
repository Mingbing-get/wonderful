import React from 'react'
import { Collapse } from '@marrow/rabbit'

const Panel = Collapse.Panel

export default function ExampleCollapse() {
  return (
    <div>
      <Collapse>
        <Panel
          header={'pan1'}
          panelKey={'pan1'}
        >
          <div>
            111111
          </div>
        </Panel>
        <Panel
          header={'pan2'}
          panelKey={'pan2'}
        >
          <div>
            222222
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}