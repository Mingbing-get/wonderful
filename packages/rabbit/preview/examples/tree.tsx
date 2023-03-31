import React, { useState, useEffect } from 'react'
import { Tree, MultipleTree, Icon, TreeNode } from '../../../rabbit/src'

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

export default function ExampleTree() {
  const [data, setData] = useState(baseData)
  const [expandPath, setExpandPath] = useState<string[][]>([['0-0']])

  useEffect(() => {
    setTimeout(() => {
      setExpandPath([['0-0', '0-0-0']])
    }, 5000)
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 19%)', justifyContent: 'space-between' }}>
      <Tree
        data={data}
        expandPath={expandPath}
        onChecked={(checkedPath, node, isChecked) => { console.log(checkedPath, node, isChecked)}}
        onExpand={(expandPath, node, isExpand) => { console.log(expandPath, node, isExpand)}}
      />
      <Tree
        data={data}
        showLine
        renderLabelIcon={(_, isExpand, isLeaf) => {
          if (isLeaf) return <Icon type='file' />
          if (isExpand) return <Icon type='folderOpen' />
          return <Icon type='folder' />
        }}
      />
      <Tree
        data={data}
        loadData={node => {
          setTimeout(() => {
            node.children = [{
              value: node.value + '-1',
              label: node.label + '-1',
              isLeft: true
            }]

            setData([...data])
          }, 2000);
        }}
      />
      <Tree
        data={data}
        draggable
        showLine
        onMove={(data, node, target, location) => {
          console.log(data, node, target, location)
        }}
      />
      <Tree
        data={virtualData}
        virtualScroll={{
          height: 400,
          itemHeight: 30
        }}
      />
      <MultipleTree
        data={data}
      />
      <MultipleTree
        data={data}
        draggable
      />
      <MultipleTree
        data={virtualData}
        virtualScroll={{
          height: 400,
          itemHeight: 30
        }}
      />
    </div>
  )
}
