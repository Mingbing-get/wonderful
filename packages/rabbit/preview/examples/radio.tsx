import React from 'react'
import { Radio, RadioGroup } from '@marrow/rabbit'

export default function ExampleRadio() {
  const style = { marginRight: '0.5rem' }
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Radio style={style}>
          默认
        </Radio>
        <Radio checked style={style}>
          选中
        </Radio>
        <Radio disabled style={style}>
          禁止
        </Radio>
      </div>
      <RadioGroup
        defaultValue={'B'}
        options={[
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B' },
          { value: 'C', label: 'C' }
        ]}
        onChange={val => console.log(val)}
      />
      <RadioGroup onChange={val => console.log(val)} >
        <div>
          <span>其他节点</span>
          <Radio defaultChecked>
            A
          </Radio>
        </div>
        <div>
          <Radio>
            B
          </Radio>
        </div>
        <Radio>
          C
        </Radio>
        <div>
          other element
        </div>
      </RadioGroup>
    </div>
  )
}