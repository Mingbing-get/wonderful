import React, { useRef, useState } from 'react'
import { Tour, TourStepType, Button } from '@marrow/rabbit'

export default function ExampleTour() {
  const firstRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)
  const threeRef = useRef<HTMLDivElement>(null)
  const [openDot, setOpenDot] = useState(false)
  const [openSimple, setOpenSimple] = useState(false)
  const [openNone, setOpenNone] = useState(false)

  const steps: TourStepType[] = [
    {
      title: '第一步',
      content: (
        <div>
          第一步内容
        </div>
      ),
      target: () => firstRef.current
    },
    {
      title: '第二步',
      content: (
        <div>
          第二步内容
        </div>
      ),
      nextButtonProps: {
        children: '自定义下一步'
      },
      prevButtonProps: {
        onClick: () => {
          console.log('点击了第二步的上一步')
        }
      },
      target: () => secondRef.current
    },
    {
      title: '第三步',
      content: (
        <div>
          第三步内容
        </div>
      ),
      placement: 'right',
      target: () => threeRef.current
    },
    {
      title: '第四步',
      content: (
        <div>
          第四步内容
        </div>
      ),
      target: () => null
    },
    {
      title: '第五步',
      content: (
        <div>
          第五步内容
        </div>
      ),
      target: () => document.getElementById('five')
    }
  ]
  return (
    <div>
      <Button onClick={() => setOpenDot(true)}>开始导航(点提示)</Button>
      <Button onClick={() => setOpenSimple(true)}>开始导航(简单提示)</Button>
      <Button onClick={() => setOpenNone(true)}>开始导航(无提示)</Button>
      <br />

      <Button ref={firstRef}>第一步</Button>
      <Button ref={secondRef}>第二步</Button>
      <Button ref={threeRef}>第三步</Button>
      <div id='five' style={{ display: 'inline-block', padding: '0.5rem' }}>第五步</div>
      <Tour
        open={openDot}
        onChange={(current) => console.log(current)}
        onClose={() => setOpenDot(false)}
        onFinish={() => setOpenDot(false)}
        steps={steps}
      />
      <Tour
        open={openSimple}
        onChange={(current) => console.log(current)}
        onClose={() => setOpenSimple(false)}
        onFinish={() => setOpenSimple(false)}
        tip='simple'
        steps={steps}
      />
      <Tour
        open={openNone}
        onChange={(current) => console.log(current)}
        onClose={() => setOpenNone(false)}
        onFinish={() => setOpenNone(false)}
        tip='none'
        steps={steps}
      />
    </div>
  )
}
