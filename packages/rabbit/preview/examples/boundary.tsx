import React from 'react'
import { Boundary } from '../../../rabbit/src'

export default function ExampleBoundary() {
  return (
    <div>
      <Boundary
        minSpan={5}
        style={{ width: '100%', height: '80vh', border: '1px solid gray', borderRadius: 5 }}
        splitLineColor="gray">
        <Boundary.Container
          name="c1"
          span={15}>
          11111
        </Boundary.Container>
        <Boundary.Container name="c2">
          <Boundary
            minSpan={3}
            splitLineColor="gray"
            direction="column"
            style={{ width: '100%', height: '100%' }}>
            <Boundary.Container
              name="c21"
              span={5}>
              00000
            </Boundary.Container>
            <Boundary.Container name="c22">11111</Boundary.Container>
            <Boundary.Container
              name="c23"
              span={20}>
              2222
            </Boundary.Container>
          </Boundary>
        </Boundary.Container>
        <Boundary.Container
          name="c3"
          span={10}>
          4444
        </Boundary.Container>
      </Boundary>
    </div>
  )
}
