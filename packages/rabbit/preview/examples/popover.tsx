import React from 'react'
import { Popover, Button } from '@marrow/rabbit'

export default function ExamplePopover() {
  return (
    <div>
      <Popover
        content={(
          <div>
            1111content
          </div>
        )}
      >
        <Button>
          点击打开
        </Button>
      </Popover>
      <Popover
        trigger='hover'
        content={(
          <div>
            1111content
          </div>
        )}
      >
        <Button>
          hover
        </Button>
      </Popover>
      <Popover
        placement='top'
        content={(
          <div>
            1111content
          </div>
        )}
      >
        <Button>
          top
        </Button>
      </Popover>
    </div>
  )
}