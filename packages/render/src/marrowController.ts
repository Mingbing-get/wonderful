import { StartStyle } from '../../types/global'
import { AudioController } from '../../audio/src'
import { AnimeInstance } from 'animejs'

export type OnceEventType = 'play' | 'pause' | 'restart' | 'end'
export type OnceListener = () => void
export type ChangeCurrentTimeEventType = 'changeCurrentTime'
export type ChangeCurrentTimeListener = (currentTime: number) => void
export type EventType = OnceEventType | ChangeCurrentTimeEventType
export type Listener = OnceListener | ChangeCurrentTimeListener
export type ListenerMap = Record<OnceEventType, OnceListener[]> & Record<ChangeCurrentTimeEventType, ChangeCurrentTimeListener[]>

type Info = {
  startStyle?: StartStyle
  target?: HTMLElement
  parent?: HTMLElement
  isRemove?: boolean
  appearTime?: number
  completeIsDestroy?: boolean
}

export default class MarrowController {
  private audioController: AudioController
  private animeInstances: Record<string, AnimeInstance>
  private infoMap: Record<string, Info>
  private totalTime: number
  private currentTime: number
  private autoplay: boolean
  private isPlay: boolean
  private isEnd: boolean

  private isSetAutoPlay: boolean
  private startPlayTime?: Date
  private playingTimer?: number
  private listenerMap: ListenerMap
  private lastStartTime: number
  
  constructor(totalTime?: number, currentTime?: number) {
    this.audioController = new AudioController()
    this.audioController.addListener('changeStatus', (preStatus, status) => {
      if (preStatus === 'loading' && this.isPlay) {
        this.audioController.seek(this.currentTime)
        this.audioController.start()
      }
    })
    // this.audioController.setLoop(true)
    this.animeInstances = {}
    this.infoMap = {}
    this.totalTime = totalTime || 0
    this.currentTime = currentTime || 0
    this.autoplay = false
    this.isPlay = false
    this.isEnd = false
    this.isSetAutoPlay = false
    this.listenerMap = {} as ListenerMap
    this.lastStartTime = currentTime || 0
  }

  play() {
    if (this.isEnd) {
      this.restart()
      return
    }
    for (const key in this.animeInstances) {
      if (!this.isComplete(this.animeInstances[key])) {
        this.animeInstances[key].play()
      }
    }
    
    if (this.audioController.getStatus() === 'running') {
      this.audioController.pause()
    }
    if (this.audioController.getStatus() !== 'loading') {
      this.audioController.seek(this.currentTime)
      this.audioController.start()
    }

    this.lastStartTime = this.currentTime
    this.startPlayTime = new Date()
    this.isPlay = true
    this.triggerOnce('play')
    this.watchPlaying()
  }

  pause() {
    for (const key in this.animeInstances) {
      this.animeInstances[key].pause()
    }
    this.audioController.pause()
    
    if (this.startPlayTime) {
      this.currentTime = this.lastStartTime + new Date().getTime() - this.startPlayTime.getTime()
      if (this.currentTime > this.totalTime) {
        this.currentTime = this.totalTime
      }
      this.startPlayTime = undefined
    }
    this.isPlay = false
    this.triggerOnce('pause')
    this.destroyPlayingTimer()
  }

  seek(time: number) {
    if (time > this.totalTime) time = this.totalTime
    if (time < 0) time = 0

    for (const key in this.animeInstances) {
      this.animeInstances[key].seek(time)
    }
    this.currentTime = time
    this.triggerChangeCurrentTime()
  }

  restart() {
    this.isEnd = false
    for (const key in this.animeInstances) {
      this.animeInstances[key].restart()
    }
    this.audioController.restart()
    
    this.startPlayTime = new Date()
    this.isPlay = true
    this.currentTime = 0
    this.lastStartTime = 0
    this.triggerOnce('restart')
    this.watchPlaying()
  }

  addOrReplace(id: string, instance: AnimeInstance, info: Info) {
    instance.seek(this.currentTime)
    this.animeInstances[id] = instance
    const parent = info.target?.parentNode as HTMLElement
    this.infoMap[id] = {
      ...info,
      parent
    }

    this.totalTime = 0
    for (const key in this.animeInstances) {
      const instance = this.animeInstances[key]
      let curInstanceTime = instance.duration
      if (Object.prototype.toString.call(instance.loop) === '[object Number]') {
        curInstanceTime *= (instance.loop as number)
      }

      if (curInstanceTime > this.totalTime) {
        this.totalTime = curInstanceTime
      }
    }
    if (this.currentTime > this.totalTime) {
      this.currentTime = this.totalTime
      this.triggerChangeCurrentTime()
    }
  }

  setAutoplay(autoplay: boolean) {
    if (this.isSetAutoPlay) return
    this.isSetAutoPlay = true

    this.autoplay = autoplay
  }

  getAutoPlay(): boolean {
    return this.autoplay
  }

  getTotalTime(): number {
    return this.totalTime
  }

  getCurrentTime(): number {
    return this.currentTime
  }

  getIsPlay(): boolean {
    return this.isPlay
  }

  getAudioController(): AudioController {
    return this.audioController
  }

  addListener(eventType: ChangeCurrentTimeEventType, listener: ChangeCurrentTimeListener): void
  addListener(eventType: OnceEventType, listener: OnceListener): void
  addListener(eventType: EventType, listener: Listener) {
    if (!this.listenerMap[eventType]) {
      this.listenerMap[eventType] = [listener as any]
    } else {
      this.listenerMap[eventType].push(listener as any)
    }
  }

  triggerOnce(eventType: OnceEventType) {
    this.listenerMap[eventType]?.forEach(fn => fn())
  }

  triggerChangeCurrentTime() {
    for (const key in this.animeInstances) {
      if (this.isComplete(this.animeInstances[key]) || (this.infoMap[key].appearTime || 0) > this.currentTime) {
        if (!this.infoMap[key].isRemove && this.infoMap[key].completeIsDestroy) {
          this.infoMap[key].parent?.removeChild(this.infoMap[key].target as Node)
          this.infoMap[key].isRemove = true
        }
      } else {
        if (this.infoMap[key].isRemove) {
          this.infoMap[key].parent?.appendChild(this.infoMap[key].target as Node)
          this.infoMap[key].isRemove = false
        }
      }
    }

    this.listenerMap['changeCurrentTime']?.forEach(fn => fn(this.currentTime))
  }

  private isComplete(animate: AnimeInstance): boolean {
    if (animate.loop === true) return false

    const loopTime = animate.loop || 1
    return animate.duration * loopTime < this.currentTime
  }

  private watchPlaying() {
    this.playingTimer = setInterval(() => {
      this.currentTime = this.lastStartTime + new Date().getTime() - (this.startPlayTime?.getTime() || 0)
      if (this.currentTime > this.totalTime) {
        this.currentTime = this.totalTime
        this.pause()
        this.triggerOnce('end')
        this.isEnd = true
      }
      this.triggerChangeCurrentTime()
    }, 60)
  }
  
  private destroyPlayingTimer() {
    clearInterval(this.playingTimer)
    this.playingTimer = 0
  }
}
