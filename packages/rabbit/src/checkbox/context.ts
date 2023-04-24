import React, { useContext } from 'react'

import { CheckboxValueType } from '../types/checkbox'

export type CheckboxContext = {
  value?: CheckboxValueType[],
  triggerChange?: (key: CheckboxValueType, val: boolean) => void,
  addValue?: (value: CheckboxValueType) => void
}

const checkboxContext: CheckboxContext = {}

const ConfigContext = React.createContext(checkboxContext)

export const useCheckbox = () => useContext(ConfigContext)

export const CheckboxProvider = ConfigContext.Provider
