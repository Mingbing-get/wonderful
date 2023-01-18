import React from 'react'
import { Checkbox, CheckboxGroup } from '@marrow/rabbit'

export default function ExampleCheckbox() {
  const style = { marginRight: '0.5rem' }
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox style={style}>
          默认
        </Checkbox>
        <Checkbox halfChecked style={style}>
          半选
        </Checkbox>
        <Checkbox checked style={style}>
          选中
        </Checkbox>
        <Checkbox disabled style={style}>
          禁止
        </Checkbox>
      </div>
      <CheckboxGroup
        defaultValue={['B']}
        options={[
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B' },
          { value: 'C', label: 'C' }
        ]}
        onChange={val => console.log(val)}
      />
      <CheckboxGroup onChange={val => console.log(val)} >
        <div>
          <Checkbox defaultChecked>
            A
          </Checkbox>
        </div>
        <div>
          <Checkbox checked>
            B
          </Checkbox>
        </div>
        <Checkbox>
          C
        </Checkbox>
        <div>
          other element
        </div>
      </CheckboxGroup>
    </div>
  )
}