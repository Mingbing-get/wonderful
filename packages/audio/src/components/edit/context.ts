import React, { useContext } from 'react'

import AudioController from '../../audioController'

export type TimeDuration = {
  start: number,
  end: number
}

export type AudioEditContext = {
  audioController: AudioController,
  selectDuration?: TimeDuration,
  timeDuration: TimeDuration,
  isExpand: boolean,
  showControl: boolean,
  clickClientX?: number,
  wrapper?: HTMLDivElement | null,
  setSelectDuration?: (value?: TimeDuration) => void,
  setTimeDuration?: (value: TimeDuration) => void,
  setIsExpand?: (value: boolean) => void,
  setShowControl?: (value: boolean) => void,
  reDraw?: (start?: number, end?: number) => void,
}

const audioEditContext: AudioEditContext = {
  audioController: new AudioController(),
  timeDuration: { start: 0, end: 0 },
  isExpand: false,
  showControl: false,
}

const ConfigContext = React.createContext(audioEditContext)

export const useAudioEdit = () => useContext(ConfigContext)

export const AudioEditProvider = ConfigContext.Provider
