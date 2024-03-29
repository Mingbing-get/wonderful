import React, { useState, useEffect, useCallback } from 'react'
import {
  Tree,
  MultipleTree,
  Icon,
  TreeNode,
  Input,
  Button,
  AddNodePanelRenderProps,
  UpdateNodePanelRenderProps,
  RemoveNodePanelRenderProps,
} from '../../../rabbit/src'

type TestNode = TreeNode<{
  test?: boolean
}>

const baseData: TestNode[] = [
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

function createTreeNode(levelCount: number, dep: number, pre: string = ''): TreeNode[] {
  return new Array(levelCount).fill(0).map((_, index) => ({
    value: `${pre}-${index}`,
    label: `${pre}-${index}`,
    children: dep === 0 ? undefined : createTreeNode(levelCount, dep - 1, `${pre}-${index}`),
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

  const addNodePanel = useCallback((props: AddNodePanelRenderProps<{}>) => {
    return <AddNode {...props} />
  }, [])

  const updateNodePanel = useCallback((props: UpdateNodePanelRenderProps<{}>) => {
    return <UpdateNode {...props} />
  }, [])

  const removeNodePanel = useCallback((props: RemoveNodePanelRenderProps<{}>) => {
    return <RemoveNode {...props} />
  }, [])

  const handleUpdateTree = useCallback((data: TestNode[]) => {
    console.log(data)
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 14%)', justifyContent: 'space-between' }}>
      <Tree
        data={data}
        expandPath={expandPath}
        onChecked={(checkedPath, node, isChecked) => {
          console.log(checkedPath, node, isChecked)
        }}
        onExpand={(expandPath, node, isExpand) => {
          console.log(expandPath, node, isExpand)
        }}
      />
      <Tree
        data={data}
        showLine
        renderLabelIcon={(_, isExpand, isLeaf) => {
          if (isLeaf) return <Icon type="file" />
          if (isExpand) return <Icon type="folderOpen" />
          return <Icon type="folder" />
        }}
      />
      <Tree
        data={data}
        loadData={(node) => {
          setTimeout(() => {
            node.children = [
              {
                value: node.value + '-1',
                label: node.label + '-1',
                isLeft: true,
              },
            ]

            setData([...data])
          }, 2000)
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
        disableSelect
        virtualScroll={{
          height: 400,
          itemHeight: 30,
        }}
      />
      <Tree
        data={data}
        renderExtra={(path, parentNode) => <Input />}
      />
      <Tree
        data={data}
        addNodePanelRender={addNodePanel}
        updateNodePanelRender={updateNodePanel}
        removeNodePanelRender={removeNodePanel}
        onUpdateTree={handleUpdateTree}
      />
      <MultipleTree data={data} />
      <MultipleTree
        data={data}
        draggable
      />
      <MultipleTree
        data={virtualData}
        virtualScroll={{
          height: 400,
          itemHeight: 30,
        }}
      />
      <MultipleTree
        data={data}
        draggable
        renderExtra={(path, parentNode) => (parentNode?.value === '0-0' ? false : <Input />)}
      />
      <MultipleTree
        data={data}
        addNodePanelRender={addNodePanel}
        updateNodePanelRender={updateNodePanel}
        removeNodePanelRender
      />
    </div>
  )
}

function AddNode({ addChild, addNextSibling }: AddNodePanelRenderProps<{}>) {
  const [value, setValue] = useState('')

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button onClick={() => addNextSibling({ value, label: `label-${value}` })}>添加下一个节点</Button>
        <Button onClick={() => addChild({ value, label: `label-${value}` })}>添加子节点</Button>
      </div>
    </div>
  )
}

function UpdateNode({ refNode, updateNode }: UpdateNodePanelRenderProps<{}>) {
  const [value, setValue] = useState(refNode.label)

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={() => updateNode({ value: refNode.value, label: `label-${value}` })}>确定</Button>
    </div>
  )
}

function RemoveNode({ refNode, removeNode }: RemoveNodePanelRenderProps<{}>) {
  return (
    <div>
      <p>确认删除节点：{refNode.label}</p>
      <Button
        type="danger"
        onClick={removeNode}>
        确定
      </Button>
    </div>
  )
}
