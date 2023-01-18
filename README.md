### wonderful
自定义组件库和基本动画组件
***

#### Install
```bash

npm install wonderful-marrow
```
***

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
    <div style={{width: '100vw', height: '100vh', display: 'flex'}}>
      <div style={{ width: '50%', height: '100%', borderRight: '1px solid #ccc' }}>
        <Build marrows={data} onChange={handleChange} onSave={handleSave} />
      </div>
      <div style={{ width: '50%', height: '100%' }}>
        <Render marrows={data} />
      </div>
    </div>
  )
}
```
