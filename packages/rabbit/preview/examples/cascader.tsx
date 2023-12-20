import React, { useEffect, useState } from 'react'
import { Cascader, MultipleCascader, CascaderOption, TreeValue } from '../../../rabbit/src'

type TestCascaderOption = CascaderOption<{
  test?: boolean
}>

const _options: TestCascaderOption[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
      {
        value: 'xinjiang',
        label: 'Xinjiang',
        isLeft: true,
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        disabled: true,
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
      {
        value: 'chengdu',
        label: 'Chengdu',
      },
    ],
  },
]

export default function ExampleCascader() {
  const [value, setValue] = useState<TreeValue[]>([])
  const [options, setOptions] = useState<TestCascaderOption[]>(_options)

  useEffect(() => {
    setInterval(() => {
      setValue(['jiangsu', 'chengdu'])
    }, 10000)
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 23%)', justifyContent: 'space-between', gridRowGap: '1rem' }}>
      <Cascader
        options={options}
        placeholder="请选择"
        allowClear={false}
      />
      <Cascader
        options={options}
        showSearch
        displayRender={(labels, _) => labels.join('->')}
        expandTrigger="hover"
      />
      <Cascader
        options={options}
        showSearch
        mode="canCheckedParent"
        displayRender={(labels, _) => labels.join('->')}
      />
      <span></span>
      <Cascader
        options={options}
        mode="canCheckedParent"
      />
      <Cascader
        options={options}
        placeholder="请选择"
        disabled
        defaultValue={['zhejiang']}
      />
      <Cascader
        options={[]}
        placeholder="请选择"
      />
      <span></span>
      <Cascader
        value={value}
        onChange={setValue}
        options={options}
        placeholder="请选择"
      />
      <Cascader
        options={options}
        placeholder="请选择"
        dropdownRender={(menu, _) => (
          <div>
            {menu}
            <div style={{ borderTop: '1px solid #ccc' }}>
              <p>custom data</p>
            </div>
          </div>
        )}
      />

      <MultipleCascader options={options} />
      <span></span>
      <MultipleCascader
        options={options}
        mode="canCheckedParent"
      />
      <MultipleCascader
        options={options}
        mode="unlink"
      />
      <MultipleCascader
        options={options}
        showSearch
      />
      <span></span>
      <MultipleCascader
        options={options}
        showSearch
        loadData={(option) => {
          setTimeout(() => {
            option.children = [
              {
                value: option.value + '1',
                label: option.label + '1',
                isLeft: true,
              },
            ]
            setOptions([...options])
          }, 2000)
        }}
      />
      <MultipleCascader
        options={options}
        expandTrigger="hover"
      />
    </div>
  )
}
