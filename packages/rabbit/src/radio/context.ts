import React, { useContext } from 'react'

import { RadioValueType } from '../types/radio'

export type RadioContext = {
  value?: RadioValueType,
  triggerChange?: (key: RadioValueType, val: boolean) => void,
  addValue?: (value: RadioValueType) => void
}

const radioContext: RadioContext = {}

const ConfigContext = React.createContext(radioContext)

export const useRadio = () => useContext(ConfigContext)

export const RadioProvider = ConfigContext.Provider
