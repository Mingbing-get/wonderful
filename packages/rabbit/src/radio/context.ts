import React, { useContext } from 'react'

import { ValueType } from './group'

export type RadioContext = {
  value?: ValueType,
  triggerChange?: (key: ValueType, val: boolean) => void,
  addValue?: (value: ValueType) => void
}

const radioContext: RadioContext = {}

const ConfigContext = React.createContext(radioContext)

export const useRadio = () => useContext(ConfigContext)

export const RadioProvider = ConfigContext.Provider
