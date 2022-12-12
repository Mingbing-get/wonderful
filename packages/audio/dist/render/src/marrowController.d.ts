import { StartStyle } from '@marrow/global';
import { AudioController } from '@marrow/audio';
import { AnimeInstance } from 'animejs';
export declare type OnceEventType = 'play' | 'pause' | 'restart' | 'end';
export declare type OnceListener = () => void;
export declare type ChangeCurrentTimeEventType = 'changeCurrentTime';
export declare type ChangeCurrentTimeListener = (currentTime: number) => void;
export declare type EventType = OnceEventType | ChangeCurrentTimeEventType;
export declare type Listener = OnceListener | ChangeCurrentTimeListener;
export declare type ListenerMap = Record<OnceEventType, OnceListener[]> & Record<ChangeCurrentTimeEventType, ChangeCurrentTimeListener[]>;
declare type Info = {
    startStyle?: StartStyle;
    target?: HTMLElement;
    parent?: HTMLElement;
    isRemove?: boolean;
    appearTime?: number;
    completeIsDestroy?: boolean;
};
export default class MarrowController {
    private audioController;
    private animeInstances;
    private infoMap;
    private totalTime;
    private currentTime;
    private autoplay;
    private isPlay;
    private isEnd;
    private isSetAutoPlay;
    private startPlayTime?;
    private playingTimer?;
    private listenerMap;
    private lastStartTime;
    constructor(totalTime?: number, currentTime?: number);
    play(): void;
    pause(): void;
    seek(time: number): void;
    restart(): void;
    addOrReplace(id: string, instance: AnimeInstance, info: Info): void;
    setAutoplay(autoplay: boolean): void;
    getAutoPlay(): boolean;
    getTotalTime(): number;
    getCurrentTime(): number;
    getIsPlay(): boolean;
    getAudioController(): AudioController;
    addListener(eventType: ChangeCurrentTimeEventType, listener: ChangeCurrentTimeListener): void;
    addListener(eventType: OnceEventType, listener: OnceListener): void;
    triggerOnce(eventType: OnceEventType): void;
    triggerChangeCurrentTime(): void;
    private isComplete;
    private watchPlaying;
    private destroyPlayingTimer;
}
export {};