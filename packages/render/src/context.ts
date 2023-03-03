import React, { useContext } from 'react'

import MarrowController from './marrowController'

export type RenderContext = {
  marrowController: MarrowController
}

const buildContext: RenderContext = {
  marrowController: new MarrowController()
}

const ConfigContext = React.createContext(buildContext)

export const useRenderMarrow = () => useContext(ConfigContext)

export const RenderMarrowProvider = ConfigContext.Provider
