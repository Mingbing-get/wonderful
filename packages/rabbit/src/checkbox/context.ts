import React, { useContext } from 'react'

import { ValueType } from './group'

export type CheckboxContext = {
  value?: ValueType[],
  triggerChange?: (key: ValueType, val: boolean) => void,
  addValue?: (value: ValueType) => void
}

const checkboxContext: CheckboxContext = {}

const ConfigContext = React.createContext(checkboxContext)

export const useCheckbox = () => useContext(ConfigContext)

export const CheckboxProvider = ConfigContext.Provider
