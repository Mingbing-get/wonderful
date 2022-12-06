import React from 'react';
import AudioController from '../../audioController';
declare type Props = {
    audioController: AudioController;
};
export declare type DrawAudioRef = {
    reDraw: (start?: number, end?: number) => void;
};
declare const DrawAudio: React.MemoExoticComponent<React.ForwardRefExoticComponent<Props & React.RefAttributes<DrawAudioRef | undefined>>>;
export default DrawAudio;
