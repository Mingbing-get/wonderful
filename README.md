### wonderful

1. 自定义组件库: 支持微信小程序，移动端，pc 端，响应式布局
2. 基本动画组件

---

#### Install

```bash

npm install wonderful-marrow
```

---

#### 组件库使用

```js

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Button, responseRegister } from 'wonderful-marrow/rabbit'

import 'wonderful-marrow/rabbit/index.css'

responseRegister() // 设置为响应式(rem 布局)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div>
    <Button type='primary'>按钮</Button>
  </div>
)
```

#### 支持的组件

```js
const componentList = [
  {
    value: 'currency',
    label: '通用',
    children: [
      {
        value: 'Button',
        label: '按钮',
      },
      {
        value: 'Icon',
        label: '图标',
      },
      {
        value: 'Boundary',
        label: '可变边界',
      },
    ],
  },
  {
    value: 'nav',
    label: '导航',
    children: [
      {
        value: 'Menu',
        label: '导航菜单',
      },
      {
        value: 'Pagination',
        label: '分页',
      },
      {
        value: 'Steps',
        label: '步骤条',
      },
    ],
  },
  {
    value: 'data-input',
    label: '数据录入',
    children: [
      {
        value: 'Cascader',
        label: '级联选择',
      },
      {
        value: 'Checkbox',
        label: '多选框',
      },
      {
        value: 'Input',
        label: '输入框',
      },
      {
        value: 'InputNumber',
        label: '数字输入框',
      },
      {
        value: 'Radio',
        label: '单选框',
      },
      {
        value: 'Rate',
        label: '评分',
      },
      {
        value: 'Select',
        label: '选择器',
      },
      {
        value: 'SelectPanel',
        label: '选择器(自定义触发器)',
      },
      {
        value: 'Slider',
        label: '滑动输入条',
      },
      {
        value: 'Switch',
        label: '开关',
      },
      {
        value: 'Upload',
        label: '上传',
      },
      {
        value: 'Calendar',
        label: '日历',
      },
      {
        value: 'TimePicker',
        label: '时间选择器',
      },
      {
        value: 'DatePicker',
        label: '日期选择器',
      },
      {
        value: 'Transfer',
        label: '穿梭框',
      },
      {
        value: 'TreeSelect',
        label: '树形选择器',
      },
      {
        value: 'ColorPicker',
        label: '颜色选择器',
      },
    ],
  },
  {
    value: 'data-display',
    label: '数据展示',
    children: [
      {
        value: 'Badge',
        label: '徽章',
      },
      {
        value: 'Carousel',
        label: '轮播',
      },
      {
        value: 'Collapse',
        label: '折叠面板',
      },
      {
        value: 'Popover',
        label: '气泡卡片',
      },
      {
        value: 'PopoverHandle',
        label: '气泡卡片(自定义触发器)',
      },
      {
        value: 'Tab',
        label: '标签页',
      },
      {
        value: 'Tag',
        label: '标签',
      },
      {
        value: 'Tree',
        label: '树形控件',
      },
      {
        value: 'Timeline',
        label: '时间线',
      },
      {
        value: 'List',
        label: '列表',
      },
      {
        value: 'Tour',
        label: '导游',
      },
      {
        value: 'Table',
        label: '表格',
      },
    ],
  },
  {
    value: 'feedback',
    label: '反馈',
    children: [
      {
        value: 'Message',
        label: '全局提示',
      },
      {
        value: 'Modal',
        label: '对话框',
      },
      {
        value: 'Loading',
        label: '加载中',
      },
      {
        value: 'Progress',
        label: '进度条',
      },
    ],
  },
]
```

#### 动画库使用

```js
import { Marrow, Build, Render } from 'wonderful-marrow/marrow'

import 'wonderful-marrow/marrow/index.css'

function handleChange(data: Marrow[]) {
  console.log(data)
}

function handleSave(data: Marrow[]) {
  console.log(data)
}

const data: Marrow[] = []

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <div style={{ width: '50%', height: '100%', borderRight: '1px solid #ccc' }}>
        <Build
          marrows={data}
          onChange={handleChange}
          onSave={handleSave}
        />
      </div>
      <div style={{ width: '50%', height: '100%' }}>
        <Render marrows={data} />
      </div>
    </div>
  )
}
```
