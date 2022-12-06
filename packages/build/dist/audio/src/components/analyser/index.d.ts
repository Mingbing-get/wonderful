import React from 'react';
import AudioController from '../../audioController';
import './index.scss';
declare type Props = {
    audioController: AudioController;
    style?: React.CSSProperties;
    className?: string;
};
export default function AudioAnalyser({ audioController, style, className }: Props): JSX.Element;
export {};
