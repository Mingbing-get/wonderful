import React, { useState } from 'react'
import { TreeSelect, TreeNode, MultipleTreeSelect } from '../../../rabbit/src'

const baseData: TreeNode[] = [
  {
    label: '0-0',
    value: '0-0',
    children: [
      {
        label: '0-0-0',
        value: '0-0-0',
        children: [
          { label: '0-0-0-0', value: '0-0-0-0' },
          { label: '0-0-0-1', value: '0-0-0-1' },
          { label: '0-0-0-2', value: '0-0-0-2' },
        ],
      },
      {
        label: '0-0-1',
        value: '0-0-1',
        disabled: true,
        children: [
          { label: '0-0-1-0', value: '0-0-1-0' },
          { label: '0-0-1-1', value: '0-0-1-1' },
          { label: '0-0-1-2', value: '0-0-1-2' },
        ],
      },
      {
        label: '0-0-2',
        value: '0-0-2',
      },
    ],
  },
  {
    label: '0-1',
    value: '0-1',
    children: [
      { label: '0-1-0-0', value: '0-1-0-0', disabled: true, },
      { label: '0-1-0-1', value: '0-1-0-1' },
      { label: '0-1-0-2', value: '0-1-0-2' },
    ],
  },
  {
    label: '0-2',
    value: '0-2',
  },
]

function createTreeNode(levelCount: number, dep: number, pre: string = ''): TreeNode[] {
  return new Array(levelCount).fill(0).map((_, index) => ({
    value: `${pre}-${index}`,
    label: `${pre}-${index}`,
    children: dep === 0 ? undefined : createTreeNode(levelCount, dep - 1, `${pre}-${index}`)
  }))
}

const virtualData = createTreeNode(50, 2, '0')

export default function ExampleTreeSelect() {
  const [data, setData] = useState(baseData)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 24%)', justifyContent: 'space-between', gridRowGap: 20 }}>
      <TreeSelect
        allowClear
        data={data}
        onChecked={(checkedPath, node, isChecked) => { console.log(checkedPath, node, isChecked) }}
        onExpand={(expandPath, node, isExpand) => { console.log(expandPath, node, isExpand) }}
        onChange={(checkedPath) => {console.log(checkedPath)}}
      />
      <TreeSelect
        allowClear
        data={data}
        showLine
      />
      <TreeSelect
        placeholder='请选择'
        displayRender={(_, checkedDataPath) => {
          return checkedDataPath.map(data => data.label || data.value).join('->')
        }}
        data={data}
      />
      <TreeSelect
        placeholder='请选择'
        displayRender={(_, checkedDataPath) => {
          return checkedDataPath.map(data => data.label || data.value).join('->')
        }}
        data={virtualData}
        virtualScroll={{
          height: 260,
          itemHeight: 26
        }}
        draggable
      />
      <MultipleTreeSelect
        allowClear
        data={data}
        onChecked={(checkedPath, node, isChecked) => { console.log(checkedPath, node, isChecked) }}
        onExpand={(expandPath, node, isExpand) => { console.log(expandPath, node, isExpand) }}
        onChange={(checkedPath) => { console.log(checkedPath) }}
      />
      <MultipleTreeSelect
        allowClear
        data={data}
        showLine
      />
      <MultipleTreeSelect
        placeholder='请选择'
        displayRender={(_, checkedDataPath) => {
          return checkedDataPath.map(data => data[0].label || data[0].value).join('->')
        }}
        data={data}
      />
      <MultipleTreeSelect
        placeholder='请选择'
        data={virtualData}
        virtualScroll={{
          height: 260,
          itemHeight: 26
        }}
        draggable
      />
    </div>
  )
}
