import React, { useState } from 'react'
import { TreeSelect, TreeNode, MultipleTreeSelect, Input } from '../../../rabbit/src'

type TestNode = TreeNode<{
  test?: boolean
}>

const baseData: TestNode[] = [
  {
    label: '自定义label',
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
      { label: '0-1-0-0', value: '0-1-0-0', disabled: true },
      { label: '0-1-0-1', value: '0-1-0-1' },
      { label: '0-1-0-2', value: '0-1-0-2' },
    ],
  },
  {
    label: '0-2',
    value: '0-2',
  },
]

function createTreeNode(levelCount: number, dep: number, pre: string = ''): TestNode[] {
  return new Array(levelCount).fill(0).map((_, index) => ({
    value: `${pre}-${index}`,
    label: `${pre}-${index}`,
    children: dep === 0 ? undefined : createTreeNode(levelCount, dep - 1, `${pre}-${index}`),
  }))
}

const virtualData = createTreeNode(50, 2, '0')

export default function ExampleTreeSelect() {
  const [data, setData] = useState(baseData)

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 19%)', justifyContent: 'space-between', gridRowGap: 20 }}
      onClick={(e) => e.stopPropagation()}>
      <TreeSelect
        allowClear
        data={data}
        defaultCheckedPath={['0-0', '0-0-0', '0-0-0-1']}
        onChecked={(checkedPath, node, isChecked) => {
          console.log(checkedPath, node, isChecked)
        }}
        onExpand={(expandPath, node, isExpand) => {
          console.log(expandPath, node, isExpand)
        }}
        onChange={(checkedPath) => {
          console.log(checkedPath)
        }}
      />
      <TreeSelect
        allowClear
        showSearch
        data={data}
        showLine
        onChecked={(checkedPath, node, isChecked) => {
          console.log(checkedPath, node, isChecked)
        }}
        onChange={(checkedPath) => {
          console.log(checkedPath)
        }}
      />
      <TreeSelect
        placeholder="请选择"
        displayRender={(_, checkedDataPath) => {
          return checkedDataPath.map((data) => data.label || data.value).join('->')
        }}
        data={data}
      />
      <TreeSelect
        placeholder="请选择"
        displayRender={(_, checkedDataPath) => {
          return checkedDataPath.map((data) => data.label || data.value).join('->')
        }}
        data={virtualData}
        virtualScroll={{
          height: 260,
          itemHeight: 26,
        }}
        draggable
      />
      <TreeSelect
        allowClear
        data={data}
        showLine
        renderExtra={(path, parentNode) => <Input />}
      />
      <MultipleTreeSelect
        allowClear
        data={data}
        onChecked={(checkedPath, node, isChecked) => {
          console.log(checkedPath, node, isChecked)
        }}
        onExpand={(expandPath, node, isExpand) => {
          console.log(expandPath, node, isExpand)
        }}
        onChange={(checkedPath) => {
          console.log(checkedPath)
        }}
      />
      <MultipleTreeSelect
        allowClear
        showSearch
        data={data}
        showLine
        onChecked={(checkedPath, node, isChecked) => {
          console.log(checkedPath, node, isChecked)
        }}
        onChange={(checkedPath) => {
          console.log(checkedPath)
        }}
      />
      <MultipleTreeSelect
        placeholder="请选择"
        displayRender={(_, checkedDataPath) => {
          return checkedDataPath.map((data) => data[0].label || data[0].value).join('->')
        }}
        data={data}
      />
      <MultipleTreeSelect
        placeholder="请选择"
        data={virtualData}
        virtualScroll={{
          height: 260,
          itemHeight: 26,
        }}
        draggable
      />
      <MultipleTreeSelect
        allowClear
        data={data}
        showLine
        renderExtra={(path, parentNode) => <Input />}
      />
    </div>
  )
}
