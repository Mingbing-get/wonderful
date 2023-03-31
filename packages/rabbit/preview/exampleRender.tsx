import React, { useState, useCallback } from 'react'
import { Tree, TreeNode, Icon } from '../../rabbit/src'

import ExampleIcon from './examples/icon'
import ExampleLoading from './examples/loading'
import ExampleButton from './examples/button'
import ExampleInput from './examples/input'
import ExampleInputNumber from './examples/inputNumber'
import ExampleSelect from './examples/select'
import ExampleTab from './examples/tab'
import ExamplePopover from './examples/popover'
import ExampleModal from './examples/modal'
import ExampleUpload from './examples/upload'
import ExampleSwitch from './examples/switch'
import ExampleSlider from './examples/slider'
import ExampleCollapse from './examples/collapse'
import ExampleMessage from './examples/message'
import ExampleCheckbox from './examples/checkbox'
import ExampleRadio from './examples/radio'
import ExampleMenu from './examples/menu'
import ExamplePagination from './examples/pagination'
import ExampleTag from './examples/tag'
import ExampleBadge from './examples/badge'
import ExampleRate from './examples/rate'
import ExampleCarousel from './examples/carousel'
import ExampleTable from './examples/table'
import ExampleCascader from './examples/cascader'
import ExampleTree from './examples/tree'
import ExampleTreeSelect from './examples/treeSelect'
import ExampleProgress from './examples/progress'
import ExampleTimeline from './examples/timeline'
import ExampleList from './examples/list'
import ExampleTour from './examples/tour'
import ExampleCalendar from './examples/calendar'
import ExampleTimePicker from './examples/timePicker'
import ExampleDatePicker from './examples/datePicker'
import ExampleTransfer from './examples/transfer'
import ExampleSteps from './examples/steps'

type ComponentTreeNode = TreeNode<{
  component?: React.ReactNode
}>

const treeData: ComponentTreeNode[] = [
  {
    value: 'currency',
    label: '通用',
    children: [
      {
        value: 'icon',
        label: '图标',
        component: <ExampleIcon />
      },
      {
        value: 'button',
        label: '按钮',
        component: <ExampleButton />
      }
    ]
  },
  {
    value: 'nav',
    label: '导航',
    children: [
      {
        value: 'menu',
        label: '导航菜单',
        component: <ExampleMenu />
      },
      {
        value: 'pagination',
        label: '分页',
        component: <ExamplePagination />
      },
      {
        value: 'steps',
        label: '步骤条',
        component: <ExampleSteps />
      }
    ]
  },
  {
    value: 'data-input',
    label: '数据录入',
    children: [
      {
        value: 'cascader',
        label: '级联选择',
        component: <ExampleCascader />
      },
      {
        value: 'checkbox',
        label: '多选框',
        component: <ExampleCheckbox />
      },
      {
        value: 'input',
        label: '输入框',
        component: <ExampleInput />
      },
      {
        value: 'inputNumber',
        label: '数字输入框',
        component: <ExampleInputNumber />
      },
      {
        value: 'radio',
        label: '单选框',
        component: <ExampleRadio />
      },
      {
        value: 'rate',
        label: '评分',
        component: <ExampleRate />
      },
      {
        value: 'select',
        label: '选择器',
        component: <ExampleSelect />
      },
      {
        value: 'slider',
        label: '滑动输入条',
        component: <ExampleSlider />
      },
      {
        value: 'switch',
        label: '开关',
        component: <ExampleSwitch />
      },
      {
        value: 'upload',
        label: '上传',
        component: <ExampleUpload />
      },
      {
        value: 'calendar',
        label: '日历',
        component: <ExampleCalendar />
      },
      {
        value: 'timePicker',
        label: '时间选择器',
        component: <ExampleTimePicker />
      },
      {
        value: 'datePicker',
        label: '日期选择器',
        component: <ExampleDatePicker />
      },
      {
        value: 'transfer',
        label: '穿梭框',
        component: <ExampleTransfer />
      },
      {
        value: 'treeSelect',
        label: '树形选择器',
        component: <ExampleTreeSelect />
      }
    ]
  },
  {
    value: 'data-display',
    label: '数据展示',
    children: [
      {
        value: 'badge',
        label: '徽章',
        component: <ExampleBadge />
      },
      {
        value: 'carousel',
        label: '轮播',
        component: <ExampleCarousel />
      },
      {
        value: 'collapse',
        label: '折叠面板',
        component: <ExampleCollapse />
      },
      {
        value: 'popover',
        label: '气泡卡片',
        component: <ExamplePopover />
      },
      {
        value: 'tab',
        label: '标签页',
        component: <ExampleTab />
      },
      {
        value: 'tag',
        label: '标签',
        component: <ExampleTag />
      },
      {
        value: 'tree',
        label: '树形控件',
        component: <ExampleTree />
      },
      {
        value: 'timeline',
        label: '时间线',
        component: <ExampleTimeline />
      },
      {
        value: 'list',
        label: '列表',
        component: <ExampleList />
      },
      {
        value: 'tour',
        label: '导游',
        component: <ExampleTour />
      },
      {
        value: 'table',
        label: '表格',
        component: <ExampleTable />
      }
    ]
  },
  {
    value: 'feedback',
    label: '反馈',
    children: [
      {
        value: 'message',
        label: '全局提示',
        component: <ExampleMessage />
      },
      {
        value: 'modal',
        label: '对话框',
        component: <ExampleModal />
      },
      {
        value: 'loading',
        label: '加载中',
        component: <ExampleLoading />
      },
      {
        value: 'progress',
        label: '进度条',
        component: <ExampleProgress />
      }
    ]
  },
]

function mergeValueAndLabel(baseData: ComponentTreeNode[]) {
  baseData.forEach(node => {
    if (!node.children) {
      node.label = `${node.value} ${node.label}`
    } else {
      mergeValueAndLabel(node.children)
    }
  })
}

mergeValueAndLabel(treeData)

export default function ExampleRender() {
  const [currentShow, setCurrentShow] = useState<React.ReactNode>(<ExampleIcon />)

  const handleChecked = useCallback((_: any, node: ComponentTreeNode) => {
    setCurrentShow(node.component)
  }, [])

  return (
    <div className='rabbit-preview-wrapper'>
      <div className='nav'>
        <Tree
          defaultCheckedPath={['currency', 'icon']}
          defaultExpandPath={[['currency']]}
          data={treeData}
          onChecked={handleChecked}
          renderLabelIcon={(_, isExpand, isLeaf) => {
            if (isLeaf) return <Icon type='component' />
            if (isExpand) return <Icon type='folderOpen' />
            return <Icon type='folder' />
          }}
        />
      </div>
      <div className='preview'>
        {currentShow}
      </div>
    </div>
  )
}