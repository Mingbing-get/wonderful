import React, { useMemo, useRef, useState } from 'react'
import { Popover, Button, PopoverHandle } from '../../../rabbit/src'

const options = ['right', 'right-start', 'right-end', 'left', 'left-start', 'left-end', 'bottom', 'bottom-start', 'bottom-end', 'top', 'top-start', 'top-end']

export default function ExamplePopover() {
  const targetRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const [placement, setPlacement] = useState('right')

  const target = useMemo(() => {
    if (!targetRef.current || !visible) return

    return targetRef.current
  }, [visible])

  return (
    <div>
      <Popover content={<div>1111content</div>}>
        <Button>点击打开</Button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div>1111content</div>}>
        <Button>hover</Button>
      </Popover>
      <Popover
        placement="top"
        content={<div>1111content</div>}>
        <Button>top</Button>
      </Popover>
      <Popover
        placement="left"
        content={<div>1111content</div>}>
        <Button>left</Button>
      </Popover>
      <Popover
        placement="right"
        content={<div>1111content</div>}>
        <Button>right</Button>
      </Popover>
      <br />
      {options.map((item) => (
        <button
          key={item}
          onClick={() => setPlacement(item)}>
          {item}
        </button>
      ))}
      <div
        ref={targetRef}
        style={{ backgroundColor: 'blue', width: 200, marginLeft: 200, marginTop: 100, height: 100 }}
        onClick={() => setVisible(!visible)}>
        count:{count}
      </div>
      <PopoverHandle
        placement={placement as any}
        target={target}
        content={
          <div
            style={{ backgroundColor: 'red', width: 300, height: 240 }}
            onClick={() => setCount(count + 1)}></div>
        }
      />
    </div>
  )
}
