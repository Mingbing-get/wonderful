import React from 'react';
import './index.scss';
declare type Props = {
    min?: number;
    max?: number;
    value?: number;
    step?: number;
    showLabel?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (val: number) => void;
};
export default function Slider({ min, max, step, value, showLabel, className, style, onChange }: Props): JSX.Element;
export {};
