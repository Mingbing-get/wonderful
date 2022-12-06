import React, { useContext } from 'react'

import { Marrow, ElementType } from '@marrow/global'

export type OperationType = '' | 'move' | 'add'

export type BuildContext = {
  data: Marrow[]; // 渲染所有的数据
  selectedId?: string; // 当前选择的marrow的id
  currentLocationIds: string[]; // 当前点击处的所有marrow的id
  showStore: boolean; // 是否显示marrow仓库（新加marrow元素）
  operationType: OperationType; // 当前操作的类型
  willAddElementType?: ElementType; // 将要添加的元素类型
  willMoveId?: string; // 将要移动的元素的id
  editingId?: string; // 正在编辑的元素
  setSelectedId?: (id: string) => void;
  setData?: (data: Marrow[]) => void;
  setShowStore?: (visible: boolean) => void;
  setOperationType?: (value: OperationType) => void;
  setWillAddElementType?: (value?: ElementType) => void;
  setWillMoveId?: (value?: string) => void;
  setEditingId?: (value?: string) => void;
}

const buildContext: BuildContext = {
  data: [],
  currentLocationIds: [],
  showStore: false,
  operationType: ''
}

const ConfigContext = React.createContext(buildContext)

export const useBuildMarrow = () => useContext(ConfigContext)

export const BuildMarrowProvider = ConfigContext.Provider
