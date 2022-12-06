import React from 'react';
import AudioController from '../../audioController';
export declare type TimeDuration = {
    start: number;
    end: number;
};
export declare type AudioEditContext = {
    audioController: AudioController;
    selectDuration?: TimeDuration;
    timeDuration: TimeDuration;
    isExpand: boolean;
    showControl: boolean;
    clickClientX?: number;
    wrapper?: HTMLDivElement | null;
    setSelectDuration?: (value?: TimeDuration) => void;
    setTimeDuration?: (value: TimeDuration) => void;
    setIsExpand?: (value: boolean) => void;
    setShowControl?: (value: boolean) => void;
    reDraw?: (start?: number, end?: number) => void;
};
export declare const useAudioEdit: () => AudioEditContext;
export declare const AudioEditProvider: React.Provider<AudioEditContext>;
