import React from 'react';
import './index.scss';
declare type Props = {
    defaultValue?: number;
    value?: number;
    step?: number;
    min?: number;
    max?: number;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (value: number) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
export default function InputNumber({ defaultValue, value, step, min, max, prefix, suffix, className, style, onChange, onBlur }: Props): JSX.Element;
export {};
